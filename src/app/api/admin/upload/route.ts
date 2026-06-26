export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
    if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: "Geçersiz dosya türü. Sadece JPG, PNG, WEBP, GIF ve SVG yüklenebilir." }, { status: 400 });
    if (file.size > MAX_SIZE) return NextResponse.json({ error: "Dosya boyutu 10MB'ı aşamaz." }, { status: 400 });

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // Vercel Blob (production) veya yerel dosya sistemi (development)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(filename, file, { access: "public" });
      return NextResponse.json({ url: blob.url });
    }

    const uploadDir = join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });
    const bytes = await file.arrayBuffer();
    await writeFile(join(uploadDir, filename), Buffer.from(bytes));
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch {
    return NextResponse.json({ error: "Yükleme sırasında bir hata oluştu." }, { status: 500 });
  }
}
