export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  return NextResponse.json(await prisma.publication.findMany({ orderBy: { createdAt: "desc" } }));
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await req.json();
  const item = await prisma.publication.create({
    data: { title: data.title, description: data.description || "", fileUrl: data.fileUrl || "", imageUrl: data.imageUrl || "", category: data.category || "genel", isPublished: data.isPublished ?? true },
  });
  return NextResponse.json(item);
}

export async function PUT(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await req.json();
  const item = await prisma.publication.update({ where: { id: data.id }, data: { title: data.title, description: data.description, fileUrl: data.fileUrl, imageUrl: data.imageUrl, category: data.category, isPublished: data.isPublished } });
  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await req.json();
  await prisma.publication.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
