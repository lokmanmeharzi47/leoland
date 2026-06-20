import { getContentLibrary } from "../services/teacher-services";

export default async function TeacherGamesPage() {
  const { games } = await getContentLibrary();



  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 space-y-8 pb-32">
      <div>
        <h1 className="text-3xl font-black text-[#0F2A8A]">Games Directory</h1>
        <p className="text-[#0F2A8A]/60 font-bold mt-2">Assign educational mini-games to reinforce learning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game: any) => (
          <div key={game.id} className="bg-white rounded-[24px] p-6 border border-[#0F2A8A]/5 shadow-md flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                {game.category || 'Game'}
              </span>
              <span className="font-black text-[#F5B21B] flex items-center gap-1">
                 +{game.xp_reward || 50} <span className="material-symbols-outlined text-[18px]">star</span>
              </span>
            </div>
            
            <h3 className="text-xl font-black text-[#0F2A8A] mb-2">{game.title}</h3>
            
            <div className="flex items-center gap-1 mb-6">
               {[...Array(5)].map((_, i) => (
                  <span key={i} className={`material-symbols-outlined text-[18px] ${i < (game.difficulty || 3) ? 'text-blue-500' : 'text-blue-100'}`}>
                     star
                  </span>
               ))}
               <span className="ml-2 text-xs font-bold text-[#0F2A8A]/50">Difficulty</span>
            </div>

            <div className="mt-auto space-y-3">
               <div className="flex justify-between text-sm">
                  <span className="font-bold text-[#0F2A8A]/60">Times Played by Class</span>
                  <span className="font-black text-[#0F2A8A]">{game.times_played || 0}</span>
               </div>
               <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#0F2A8A]/5">
                  <button className="bg-blue-50 text-blue-600 py-2 rounded-xl font-black text-sm hover:bg-blue-100 transition-colors">
                     Recommend
                  </button>
                  <button className="bg-[#0F2A8A] text-white py-2 rounded-xl font-black text-sm hover:bg-[#0F2A8A]/90 transition-colors">
                     Assign
                  </button>
               </div>
            </div>
          </div>
        ))}
        {games.length === 0 && (
          <p className="text-[#0F2A8A]/50 font-bold col-span-3 text-center py-8">No games found in the database.</p>
        )}
      </div>
    </div>
  );
}
