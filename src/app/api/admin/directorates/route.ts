export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { slugify } from "@/lib/utils";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  return NextResponse.json(await prisma.directorate.findMany({ orderBy: { order: "asc" } }));
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await req.json();
  const item = await prisma.directorate.create({
    data: { name: data.name, slug: slugify(data.name) + "-" + Date.now(), description: data.description || "", goals: data.goals || "", imageUrl: data.imageUrl || "", order: data.order ?? 0 },
  });
  return NextResponse.json(item);
}

export async function PUT(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await req.json();
  const item = await prisma.directorate.update({
    where: { id: data.id },
    data: { name: data.name, description: data.description, goals: data.goals, imageUrl: data.imageUrl, order: data.order },
  });
  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await req.json();
  await prisma.directorate.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
