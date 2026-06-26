import { Users, Calendar, Trophy, Star } from "lucide-react";

interface Stat { id: string; key: string; value: string; label: string; icon: string }

const iconMap: Record<string, React.ReactNode> = {
  users:    <Users size={22} />,
  calendar: <Calendar size={22} />,
  trophy:   <Trophy size={22} />,
  star:     <Star size={22} />,
};

export default function StatsSection({ stats }: { stats: Stat[] }) {
  if (stats.length === 0) return null;
  return (
    <section className="py-20 bg-[#0e2247] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-label justify-center mb-3">Rakamlarla Gen</span>
          <h2 className="text-4xl font-black text-white mt-2">Neler Yapıyoruz?</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((s) => (
            <div key={s.id} className="group relative glass rounded-2xl p-6 text-center hover:bg-white/10 hover:border-[#4e8ac4]/30 transition-all duration-300 cursor-default">
              {/* Parlama efekti */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4e8ac4]/0 to-[#4e8ac4]/0 group-hover:from-[#4e8ac4]/5 group-hover:to-transparent transition-all duration-300" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#4e8ac4]/15 border border-[#4e8ac4]/20 text-[#93bde0] mb-5 group-hover:scale-110 group-hover:bg-[#4e8ac4]/25 transition-all duration-300">
                  {iconMap[s.icon] ?? <Star size={22} />}
                </div>
                <p className="text-4xl font-black text-white mb-1.5 tracking-tight">{s.value}</p>
                <p className="text-white/45 text-sm font-medium">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
