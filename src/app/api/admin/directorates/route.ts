export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { slugify } from "@/lib/utils";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    return NextResponse.json(await prisma.directorate.findMany({ orderBy: { order: "asc" } }));
  } catch (e) { console.error("[directorates GET]", e); return NextResponse.json([], { status: 200 }); }
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const data = await req.json();
    const item = await prisma.directorate.create({
      data: { name: data.name, slug: slugify(data.name) + "-" + Date.now(), description: data.description || "", goals: data.goals || "", imageUrl: data.imageUrl || "", order: data.order ?? 0 },
    });
    return NextResponse.json(item);
  } catch (e) { console.error("[directorates POST]", e); return NextResponse.json({ error: "Kayıt hatası" }, { status: 500 }); }
}

export async function PUT(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const data = await req.json();
    const item = await prisma.directorate.update({
      where: { id: data.id },
      data: { name: data.name, description: data.description, goals: data.goals, imageUrl: data.imageUrl, order: data.order },
    });
    return NextResponse.json(item);
  } catch (e) { console.error("[directorates PUT]", e); return NextResponse.json({ error: "Güncelleme hatası" }, { status: 500 }); }
}

export async function DELETE(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const { id } = await req.json();
    await prisma.directorate.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) { console.error("[directorates DELETE]", e); return NextResponse.json({ error: "Silme hatası" }, { status: 500 }); }
}
