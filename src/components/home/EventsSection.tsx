import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Event {
  id: string; title: string; slug: string; description: string;
  imageUrl: string; category: string; date: Date | null; location: string;
}

export default function EventsSection({ events }: { events: Event[] }) {
  const lise       = events.filter((e) => e.category === "lise");
  const universite = events.filter((e) => e.category === "universite");

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Başlık */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <span className="section-label mb-3">Etkinliklerimiz</span>
            <h2 className="text-4xl font-black text-[#0e2247] mt-2">Gen'de Neler Var?</h2>
            <p className="text-gray-400 mt-3 max-w-lg">Lise ve üniversite öğrencilerine yönelik etkinliklerimiz</p>
          </div>
          <Link href="/neler-yapiyoruz" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#1a3a6b] hover:text-[#4e8ac4] transition-colors shrink-0">
            Tüm etkinlikler
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <EventGroup title="Lise Etkinlikleri" color="#4e8ac4" events={lise} />
          <EventGroup title="Üniversite Etkinlikleri" color="#1a3a6b" events={universite} />
        </div>
      </div>
    </section>
  );
}

function EventGroup({ title, color, events }: { title: string; color: string; events: Event[] }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1 h-6 rounded-full" style={{ background: color }} />
        <h3 className="text-lg font-bold text-[#0e2247]">{title}</h3>
        <span className="ml-auto text-xs font-semibold text-gray-300 bg-gray-50 px-2 py-1 rounded-full">{events.length} etkinlik</span>
      </div>
      {events.length === 0 ? (
        <div className="bg-[#f4f6f9] rounded-2xl p-10 text-center text-gray-300 text-sm">Yakında etkinlik eklenecek</div>
      ) : (
        <div className="space-y-4">
          {events.map((ev) => (
            <div key={ev.id} className="card-hover group flex gap-4 bg-white border border-[#e8ecf2] rounded-2xl p-4 cursor-pointer">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#f4f6f9]">
                {ev.imageUrl
                  ? <Image src={ev.imageUrl} alt={ev.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  : <div className="absolute inset-0 flex items-center justify-center"><Calendar size={24} className="text-gray-200" /></div>
                }
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[#0e2247] text-sm mb-1 line-clamp-2 group-hover:text-[#1a3a6b]">{ev.title}</h4>
                <p className="text-gray-400 text-xs line-clamp-2 mb-2">{ev.description}</p>
                <div className="flex flex-wrap gap-3">
                  {ev.date && <span className="flex items-center gap-1 text-xs text-gray-400"><Calendar size={11} />{formatDate(ev.date)}</span>}
                  {ev.location && <span className="flex items-center gap-1 text-xs text-gray-400"><MapPin size={11} />{ev.location}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
