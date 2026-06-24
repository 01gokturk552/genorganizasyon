import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface NewsItem {
  id: string; title: string; slug: string; summary: string;
  imageUrl: string; publishedAt: Date | null; category: string;
}

export default function NewsSection({ news }: { news: NewsItem[] }) {
  const [featured, ...rest] = news;

  return (
    <section className="py-24 bg-[#f4f6f9]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <span className="section-label mb-3">Güncel</span>
            <h2 className="text-4xl font-black text-[#0e2247] mt-2">Gen'den Haberler</h2>
          </div>
          <Link href="/neler-yapiyoruz" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#1a3a6b] hover:text-[#4e8ac4] transition-colors shrink-0">
            Tüm haberler <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {news.length === 0 ? (
          <div className="text-center text-gray-300 py-16 bg-white rounded-2xl">Henüz haber eklenmedi.</div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Öne çıkan */}
            {featured && (
              <article className="card-hover lg:col-span-2 bg-white rounded-2xl overflow-hidden border border-[#e8ecf2] group">
                <div className="relative h-64 bg-[#e8ecf2]">
                  {featured.imageUrl
                    ? <Image src={featured.imageUrl} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    : <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a6b]/10 to-[#4e8ac4]/10" />
                  }
                  <span className="absolute top-4 left-4 bg-[#4e8ac4] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {featured.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                    <Clock size={12} />
                    {featured.publishedAt ? formatDate(featured.publishedAt) : "Tarih yok"}
                  </div>
                  <h3 className="text-xl font-bold text-[#0e2247] mb-2 group-hover:text-[#1a3a6b] transition-colors line-clamp-2">{featured.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-3">{featured.summary}</p>
                </div>
              </article>
            )}

            {/* Yan haberler */}
            <div className="space-y-4">
              {rest.map((item) => (
                <article key={item.id} className="card-hover flex gap-4 bg-white rounded-xl overflow-hidden border border-[#e8ecf2] p-4 group cursor-pointer">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#f4f6f9]">
                    {item.imageUrl
                      ? <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      : <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a6b]/10 to-[#4e8ac4]/10" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-gray-300 text-xs mb-1.5">
                      <Clock size={10} />
                      {item.publishedAt ? formatDate(item.publishedAt) : "—"}
                    </div>
                    <h3 className="font-bold text-[#0e2247] text-sm line-clamp-2 group-hover:text-[#1a3a6b] transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">{item.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
