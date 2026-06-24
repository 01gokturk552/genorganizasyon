import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  return NextResponse.json(await prisma.stat.findMany());
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await req.json();
  const item = await prisma.stat.upsert({
    where: { key: data.key },
    update: { value: data.value, label: data.label, icon: data.icon || "" },
    create: { key: data.key, value: data.value, label: data.label, icon: data.icon || "" },
  });
  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await req.json();
  await prisma.stat.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
