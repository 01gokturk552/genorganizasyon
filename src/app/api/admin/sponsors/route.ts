export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const items = await prisma.sponsor.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
    return NextResponse.json(items);
  } catch (e) { console.error("[sponsors GET]", e); return NextResponse.json([], { status: 200 }); }
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const data = await req.json();
    const item = await prisma.sponsor.create({
      data: { name: data.name, logoUrl: data.logoUrl || "", websiteUrl: data.websiteUrl || "", category: data.category || "genel", order: data.order ?? 0, isActive: data.isActive ?? true },
    });
    return NextResponse.json(item);
  } catch (e) { console.error("[sponsors POST]", e); return NextResponse.json({ error: "Kayıt hatası" }, { status: 500 }); }
}

export async function PUT(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const data = await req.json();
    const item = await prisma.sponsor.update({
      where: { id: data.id },
      data: { name: data.name, logoUrl: data.logoUrl, websiteUrl: data.websiteUrl, category: data.category, order: data.order, isActive: data.isActive },
    });
    return NextResponse.json(item);
  } catch (e) { console.error("[sponsors PUT]", e); return NextResponse.json({ error: "Güncelleme hatası" }, { status: 500 }); }
}

export async function DELETE(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const { id } = await req.json();
    await prisma.sponsor.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) { console.error("[sponsors DELETE]", e); return NextResponse.json({ error: "Silme hatası" }, { status: 500 }); }
}
