import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin kullanıcısı
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@genorganizasyon.com" },
    update: {},
    create: {
      email: "admin@genorganizasyon.com",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  });

  // Hakkımızda
  const about = await prisma.about.findFirst();
  if (!about) {
    await prisma.about.create({
      data: {
        vision: "Türkiye'nin her köşesinde gençlerin liderlik becerilerini geliştiren, onları organizasyon dünyasına hazırlayan ve geleceğin liderlerini yetiştiren öncü bir platform olmak.",
        mission: "Lise ve üniversite öğrencilerine organizasyon deneyimi kazandırarak, ekip çalışması, liderlik ve proje yönetimi becerilerini geliştirmek; onları iş hayatına ve sosyal sorumluluğa hazırlamak.",
        history: "Gen Organizasyon, 2020 yılında bir grup genç lider tarafından kurulmuştur. Kuruluşundan bu yana yüzlerce öğrenciye dokunmuş, onlarca başarılı organizasyon gerçekleştirmiştir.",
      },
    });
  }

  // İletişim
  const contact = await prisma.contact.findFirst();
  if (!contact) {
    await prisma.contact.create({
      data: {
        email: "info@genorganizasyon.com",
        phone: "+90 (212) 000 00 00",
        address: "İstanbul, Türkiye",
        instagram: "https://instagram.com/genorganizasyon",
        twitter: "https://twitter.com/genorganizasyon",
        linkedin: "https://linkedin.com/company/genorganizasyon",
      },
    });
  }

  // İstatistikler
  const stats = [
    { key: "team_count", value: "50+", label: "Ekip Arkadaşı", icon: "users" },
    { key: "event_count", value: "30+", label: "Organizasyon", icon: "calendar" },
    { key: "participant_count", value: "5000+", label: "Katılımcı", icon: "trophy" },
    { key: "experience_years", value: "4+", label: "Yıllık Deneyim", icon: "star" },
  ];

  for (const stat of stats) {
    await prisma.stat.upsert({
      where: { key: stat.key },
      update: {},
      create: stat,
    });
  }

  // Direktörlükler
  const directorates = [
    { name: "Kurumsal İlişkiler Direktörlüğü", slug: "kurumsal-iliskiler", description: "Şirketler, kurumlar ve sivil toplum kuruluşları ile ilişkileri yönetir. Sponsorluk ve ortaklık süreçlerini koordine eder.", goals: "Yeni kurumsal ortaklıklar oluşturmak\nMevcut ilişkileri güçlendirmek\nSponsorluk gelirlerini artırmak", order: 1 },
    { name: "Operasyon Direktörlüğü", slug: "operasyon", description: "Tüm etkinlik ve organizasyonların planlama, uygulama ve değerlendirme süreçlerini yönetir.", goals: "Etkinliklerin sorunsuz yürütülmesi\nLojistik süreçlerin optimizasyonu\nKalite standartlarının oluşturulması", order: 2 },
    { name: "İdari ve Mali İşler Direktörlüğü", slug: "idari-mali", description: "Organizasyonun finansal yönetimi, bütçe planlaması ve idari süreçlerini koordine eder.", goals: "Finansal sürdürülebilirlik\nŞeffaf bütçe yönetimi\nİdari süreçlerin dijitalleştirilmesi", order: 3 },
    { name: "Eğitim ve Kampüs İlişkileri Direktörlüğü", slug: "egitim-kampus", description: "Üniversite ve lise kampüsleri ile ilişkileri yönetir. Eğitim programları geliştirir ve uygular.", goals: "Yeni kampüs ortaklıkları\nEğitim programları geliştirmek\nÖğrenci topluluklarıyla iş birliği", order: 4 },
  ];

  for (const d of directorates) {
    const existing = await prisma.directorate.findUnique({ where: { slug: d.slug } });
    if (!existing) {
      await prisma.directorate.create({ data: d });
    }
  }

  // Site Ayarları
  const settings = [
    { key: "hero_title", value: "Gençlerin Gücünü\nOrganizasyona Dönüştürüyoruz" },
    { key: "hero_subtitle", value: "Lise ve üniversite öğrencilerini bir araya getirerek liderlik, organizasyon ve ekip çalışması becerilerini geliştiriyoruz." },
    { key: "site_title", value: "Gen Organizasyon" },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({ where: { key: s.key }, update: {}, create: s });
  }

  console.log("✅ Seed tamamlandı!");
  console.log("📧 Admin e-posta: admin@genorganizasyon.com");
  console.log("🔑 Admin şifre: admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
