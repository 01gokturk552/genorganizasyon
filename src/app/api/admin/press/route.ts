export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  return NextResponse.json(await prisma.pressIdentity.findMany());
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await req.json();
  const item = await prisma.pressIdentity.create({
    data: { title: data.title, description: data.description || "", fileUrl: data.fileUrl || "", category: data.category || "logo" },
  });
  return NextResponse.json(item);
}

export async function PUT(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await req.json();
  const item = await prisma.pressIdentity.update({ where: { id: data.id }, data: { title: data.title, description: data.description, fileUrl: data.fileUrl, category: data.category } });
  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await req.json();
  await prisma.pressIdentity.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
