export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const members = await prisma.teamMember.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
    return NextResponse.json(members);
  } catch (e) { console.error("[team GET]", e); return NextResponse.json([], { status: 200 }); }
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const data = await req.json();
    const item = await prisma.teamMember.create({
      data: { name: data.name, position: data.position, category: data.category, bio: data.bio || "", imageUrl: data.imageUrl || "", email: data.email || "", order: data.order ?? 0, isActive: data.isActive ?? true },
    });
    return NextResponse.json(item);
  } catch (e) { console.error("[team POST]", e); return NextResponse.json({ error: "Kayıt hatası" }, { status: 500 }); }
}

export async function PUT(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const data = await req.json();
    const item = await prisma.teamMember.update({
      where: { id: data.id },
      data: { name: data.name, position: data.position, category: data.category, bio: data.bio, imageUrl: data.imageUrl, email: data.email, order: data.order, isActive: data.isActive },
    });
    return NextResponse.json(item);
  } catch (e) { console.error("[team PUT]", e); return NextResponse.json({ error: "Güncelleme hatası" }, { status: 500 }); }
}

export async function DELETE(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const { id } = await req.json();
    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) { console.error("[team DELETE]", e); return NextResponse.json({ error: "Silme hatası" }, { status: 500 }); }
}
