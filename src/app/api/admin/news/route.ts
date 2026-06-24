import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { slugify } from "@/lib/utils";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  const news = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(news);
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await req.json();
  const slug = slugify(data.title) + "-" + Date.now();
  const item = await prisma.news.create({
    data: {
      title: data.title,
      slug,
      summary: data.summary || "",
      content: data.content || "",
      imageUrl: data.imageUrl || "",
      category: data.category || "genel",
      isPublished: data.isPublished ?? false,
      publishedAt: data.isPublished ? new Date() : null,
    },
  });
  return NextResponse.json(item);
}

export async function PUT(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await req.json();
  const item = await prisma.news.update({
    where: { id: data.id },
    data: {
      title: data.title,
      summary: data.summary,
      content: data.content,
      imageUrl: data.imageUrl,
      category: data.category,
      isPublished: data.isPublished,
      publishedAt: data.isPublished ? (data.publishedAt ? new Date(data.publishedAt) : new Date()) : null,
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await req.json();
  await prisma.news.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
