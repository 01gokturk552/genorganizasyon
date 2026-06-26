export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { slugify } from "@/lib/utils";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  const events = await prisma.event.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await req.json();
  const slug = slugify(data.title) + "-" + Date.now();
  const item = await prisma.event.create({
    data: {
      title: data.title,
      slug,
      description: data.description || "",
      imageUrl: data.imageUrl || "",
      category: data.category,
      date: data.date ? new Date(data.date) : null,
      location: data.location || "",
      isPublished: data.isPublished ?? false,
      order: data.order ?? 0,
    },
  });
  return NextResponse.json(item);
}

export async function PUT(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await req.json();
  const item = await prisma.event.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      category: data.category,
      date: data.date ? new Date(data.date) : null,
      location: data.location,
      isPublished: data.isPublished,
      order: data.order,
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await req.json();
  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
