import Link from "next/link";

const columns = [
  { title: "Worlds", links: ["Vocabulary Forest", "Grammar Castle", "Speaking Ocean", "Games"] },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-t-[48px] md:rounded-t-[64px] bg-[#0F2A8A] text-white pt-16 pb-10 px-6 mt-16">
      <div className="absolute -top-10 right-10 text-[180px] opacity-10 pointer-events-none select-none">📚</div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">🦁</span>
              <span className="text-3xl font-black">Leo<span className="text-[#F5B21B]">Land</span></span>
            </div>
            <p className="text-blue-200 font-semibold text-sm max-w-[20rem]">
              Making language learning the greatest adventure for children everywhere.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-black text-lg mb-4">{col.title}</h4>
              <ul className="space-y-3 text-blue-200 font-semibold text-sm">
                {col.links.map((l) => (
                  <li key={l}><Link href="#" className="hover:text-[#F5B21B] transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-black text-lg mb-4">Say Hi</h4>
            <div className="flex gap-3 mb-4">
              {["📘", "📸", "▶️"].map((s, i) => (
                <span key={i} className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-xl hover:bg-[#F5B21B] transition-colors cursor-pointer">{s}</span>
              ))}
            </div>
            <p className="text-blue-200 font-semibold text-sm">hello@leoland.com</p>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-blue-300 font-semibold text-sm">
          <p>© {new Date().getFullYear()} LeoLand Education. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">Terms of Adventure</Link>
            <Link href="#" className="hover:text-white">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
