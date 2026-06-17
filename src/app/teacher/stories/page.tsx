import { getContentLibrary } from "../services/teacher-services";

export default async function TeacherStoriesPage() {
  const { stories } = await getContentLibrary();

  // If DB stories table is empty, provide some dummy data to showcase the design
  const displayStories = stories.length > 0 ? stories : [
    { id: '1', title: 'The Lost Lion', level: 2, xp_reward: 30, theme: 'Animals', completion_rate: 85 },
    { id: '2', title: 'Ocean Friends', level: 1, xp_reward: 20, theme: 'Nature', completion_rate: 92 },
    { id: '3', title: 'The Magic Treehouse', level: 4, xp_reward: 60, theme: 'Adventure', completion_rate: 45 },
    { id: '4', title: 'Space Explorers', level: 5, xp_reward: 80, theme: 'Sci-Fi', completion_rate: 20 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 space-y-8 pb-32">
      <div>
        <h1 className="text-3xl font-black text-[#0F2A8A]">Stories Library</h1>
        <p className="text-[#0F2A8A]/60 font-bold mt-2">Assign reading materials to improve comprehension.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayStories.map((story: any) => (
          <div key={story.id} className="bg-white rounded-[24px] overflow-hidden border border-[#0F2A8A]/5 shadow-md flex flex-col">
            <div className="h-32 bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white relative">
               <span className="material-symbols-outlined text-[48px] opacity-50 absolute">menu_book</span>
               <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider absolute top-4 right-4 backdrop-blur-sm">
                  Lvl {story.level || 1}
               </span>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
               <h3 className="text-xl font-black text-[#0F2A8A] mb-1">{story.title}</h3>
               <p className="text-sm font-bold text-[#0F2A8A]/50 mb-4">{story.theme || 'Story'}</p>
               
               <div className="mb-6">
                  <div className="flex justify-between text-xs font-bold mb-1">
                     <span className="text-[#0F2A8A]/60">Completion Rate</span>
                     <span className="text-emerald-500">{story.completion_rate || 0}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#F4F6FF] rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${story.completion_rate || 0}%` }}></div>
                  </div>
               </div>

               <div className="mt-auto grid grid-cols-2 gap-3">
                  <button className="bg-purple-50 text-purple-600 py-2 rounded-xl font-black text-sm hover:bg-purple-100 transition-colors border border-purple-100">
                     Read
                  </button>
                  <button className="bg-[#0F2A8A] text-white py-2 rounded-xl font-black text-sm hover:bg-[#0F2A8A]/90 transition-colors">
                     Assign
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
