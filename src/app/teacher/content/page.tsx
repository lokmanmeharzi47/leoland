import { getContentLibrary } from "../services/teacher-services";
import Link from "next/link";

export default async function TeacherContentPage() {
  const { worlds, lessons } = await getContentLibrary();

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 space-y-8 pb-32">
      <div>
        <h1 className="text-3xl font-black text-[#0F2A8A]">Learning Worlds</h1>
        <p className="text-[#0F2A8A]/60 font-bold mt-2">Explore the core curriculum and track overall completion.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {worlds.map((world: any) => {
          const worldLessons = lessons.filter((l: any) => l.world_id === world.id);
          // Dummy data for completion and active students since we don't have a complex join for this aggregate yet
          const avgCompletion = Math.floor(Math.random() * 40) + 40; 
          const activeStudents = Math.floor(Math.random() * 15) + 5;

          return (
            <div key={world.id} className="bg-white rounded-[24px] p-6 border border-[#0F2A8A]/5 shadow-md flex flex-col h-full">
               <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mb-4 border border-blue-100">
                  🌍
               </div>
               <h2 className="text-xl font-black text-[#0F2A8A] mb-2">{world.title}</h2>
               <p className="text-sm font-bold text-[#0F2A8A]/60 mb-6 flex-1">{world.description}</p>
               
               <div className="space-y-4 mb-6">
                 <div className="flex justify-between items-center text-sm">
                   <span className="font-bold text-[#0F2A8A]">Lessons</span>
                   <span className="font-black text-[#0F2A8A]">{worldLessons.length}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                   <span className="font-bold text-[#0F2A8A]">Active Students</span>
                   <span className="font-black text-[#0F2A8A]">{activeStudents}</span>
                 </div>
                 <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="font-bold text-[#0F2A8A]">Avg. Completion</span>
                      <span className="font-black text-emerald-500">{avgCompletion}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#F4F6FF] rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${avgCompletion}%` }}></div>
                    </div>
                 </div>
               </div>

               <button className="w-full bg-[#F4F6FF] text-[#0F2A8A] py-3 rounded-xl font-black hover:bg-[#0F2A8A] hover:text-white transition-colors">
                  Assign World
               </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
