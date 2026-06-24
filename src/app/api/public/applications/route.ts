import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const application = await prisma.application.create({
      data: {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        school: data.school || "",
        grade: data.grade || "",
        message: data.message || "",
      },
    });
    return NextResponse.json({ success: true, id: application.id });
  } catch {
    return NextResponse.json({ error: "Başvuru kaydedilemedi" }, { status: 500 });
  }
}
