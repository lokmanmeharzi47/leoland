"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";

export default function TeacherAnalyticsClient({ analytics }: { analytics: any }) {
  if (!analytics) return <div className="p-8 text-center font-bold text-[#0F2A8A]/50">Loading Analytics...</div>;

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 space-y-8 pb-32">
      <div>
        <h1 className="text-3xl font-black text-[#0F2A8A]">Classroom Analytics</h1>
        <p className="text-[#0F2A8A]/60 font-bold mt-2">Deep dive into student engagement and performance trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* XP Growth Chart */}
        <div className="bg-white rounded-[32px] p-8 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
          <h2 className="text-xl font-black text-[#0F2A8A] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#F5B21B]">trending_up</span>
            Class XP Growth (Last 7 Days)
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.xpGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorClassXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5B21B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F5B21B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#0F2A8A', opacity: 0.5, fontSize: 12, fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#0F2A8A', opacity: 0.5, fontSize: 12, fontWeight: 'bold'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(15,42,138,0.1)', fontWeight: 'bold', color: '#0F2A8A' }}
                  itemStyle={{ color: '#F5B21B', fontWeight: '900' }}
                />
                <Area type="monotone" dataKey="xp" stroke="#F5B21B" strokeWidth={4} fillOpacity={1} fill="url(#colorClassXp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Story Completions */}
        <div className="bg-white rounded-[32px] p-8 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
          <h2 className="text-xl font-black text-[#0F2A8A] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-500">menu_book</span>
            Most Completed Stories
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.stories} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#0F2A8A" strokeOpacity={0.05} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#0F2A8A', opacity: 0.5, fontSize: 12, fontWeight: 'bold'}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#0F2A8A', fontWeight: 'bold'}} width={100} />
                <Tooltip 
                  cursor={{fill: '#F4F6FF'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(15,42,138,0.1)', fontWeight: 'bold', color: '#0F2A8A' }}
                />
                <Bar dataKey="completions" fill="#a855f7" radius={[0, 8, 8, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Game Engagement */}
        <div className="bg-white rounded-[32px] p-8 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
          <h2 className="text-xl font-black text-[#0F2A8A] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500">sports_esports</span>
            Game Engagement (Plays)
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.games} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0F2A8A" strokeOpacity={0.05} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#0F2A8A', opacity: 0.5, fontSize: 12, fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#0F2A8A', opacity: 0.5, fontSize: 12, fontWeight: 'bold'}} />
                <Tooltip 
                  cursor={{fill: '#F4F6FF'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(15,42,138,0.1)', fontWeight: 'bold', color: '#0F2A8A' }}
                />
                <Bar dataKey="plays" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Learning World Progress */}
        <div className="bg-white rounded-[32px] p-8 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
          <h2 className="text-xl font-black text-[#0F2A8A] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500">public</span>
            Learning World Completion %
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.worlds} layout="vertical" margin={{ top: 10, right: 10, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#0F2A8A" strokeOpacity={0.05} />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#0F2A8A', opacity: 0.5, fontSize: 12, fontWeight: 'bold'}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#0F2A8A', fontWeight: 'bold'}} width={120} />
                <Tooltip 
                  cursor={{fill: '#F4F6FF'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(15,42,138,0.1)', fontWeight: 'bold', color: '#0F2A8A' }}
                />
                <Bar dataKey="completed" fill="#10b981" radius={[0, 8, 8, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
