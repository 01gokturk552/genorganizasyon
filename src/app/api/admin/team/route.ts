export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  const members = await prisma.teamMember.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
  return NextResponse.json(members);
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await req.json();
  const item = await prisma.teamMember.create({
    data: {
      name: data.name,
      position: data.position,
      category: data.category,
      bio: data.bio || "",
      imageUrl: data.imageUrl || "",
      email: data.email || "",
      order: data.order ?? 0,
      isActive: data.isActive ?? true,
    },
  });
  return NextResponse.json(item);
}

export async function PUT(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await req.json();
  const item = await prisma.teamMember.update({
    where: { id: data.id },
    data: {
      name: data.name,
      position: data.position,
      category: data.category,
      bio: data.bio,
      imageUrl: data.imageUrl,
      email: data.email,
      order: data.order,
      isActive: data.isActive,
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await req.json();
  await prisma.teamMember.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
