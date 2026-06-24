import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const contact = await prisma.contact.findFirst();
  return NextResponse.json(contact || {});
}
