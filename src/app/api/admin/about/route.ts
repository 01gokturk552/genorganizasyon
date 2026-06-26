export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  const item = await prisma.about.findFirst();
  return NextResponse.json(item || {});
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await req.json();
  const existing = await prisma.about.findFirst();
  if (existing) {
    const item = await prisma.about.update({ where: { id: existing.id }, data: { vision: data.vision, mission: data.mission, history: data.history || "" } });
    return NextResponse.json(item);
  }
  const item = await prisma.about.create({ data: { vision: data.vision, mission: data.mission, history: data.history || "" } });
  return NextResponse.json(item);
}
