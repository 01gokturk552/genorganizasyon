export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    return NextResponse.json(await prisma.stat.findMany());
  } catch (e) { console.error("[stats GET]", e); return NextResponse.json([], { status: 200 }); }
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const data = await req.json();
    const item = await prisma.stat.upsert({
      where: { key: data.key },
      update: { value: data.value, label: data.label, icon: data.icon || "" },
      create: { key: data.key, value: data.value, label: data.label, icon: data.icon || "" },
    });
    return NextResponse.json(item);
  } catch (e) { console.error("[stats POST]", e); return NextResponse.json({ error: "Kayıt hatası" }, { status: 500 }); }
}

export async function DELETE(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const { id } = await req.json();
    await prisma.stat.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) { console.error("[stats DELETE]", e); return NextResponse.json({ error: "Silme hatası" }, { status: 500 }); }
}
