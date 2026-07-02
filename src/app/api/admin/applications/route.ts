export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const items = await prisma.application.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(items);
  } catch (e) { console.error("[applications GET]", e); return NextResponse.json([], { status: 200 }); }
}

export async function PUT(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const data = await req.json();
    const item = await prisma.application.update({ where: { id: data.id }, data: { status: data.status } });
    return NextResponse.json(item);
  } catch (e) { console.error("[applications PUT]", e); return NextResponse.json({ error: "Güncelleme hatası" }, { status: 500 }); }
}

export async function DELETE(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const { id } = await req.json();
    await prisma.application.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) { console.error("[applications DELETE]", e); return NextResponse.json({ error: "Silme hatası" }, { status: 500 }); }
}
