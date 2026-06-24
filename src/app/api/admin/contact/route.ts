import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  const item = await prisma.contact.findFirst();
  return NextResponse.json(item || {});
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await req.json();
  const existing = await prisma.contact.findFirst();
  const payload = {
    address: data.address || "", email: data.email || "", phone: data.phone || "",
    mapUrl: data.mapUrl || "", instagram: data.instagram || "", twitter: data.twitter || "",
    linkedin: data.linkedin || "", youtube: data.youtube || "",
  };
  if (existing) {
    return NextResponse.json(await prisma.contact.update({ where: { id: existing.id }, data: payload }));
  }
  return NextResponse.json(await prisma.contact.create({ data: payload }));
}
