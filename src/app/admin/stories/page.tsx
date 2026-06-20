import { getStories } from "../services/admin-services";

import CreateStoryModal from "./CreateStoryModal";

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Stories Management</h2>
          <p className="text-slate-500 mt-2">Manage interactive reading content, reading levels, and languages.</p>
        </div>
        <CreateStoryModal />
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-zinc-800/50">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Title</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Level</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Language</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Published</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
            {stories.length > 0 ? stories.map((story) => (
              <tr key={story.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/30">
                <td className="p-4 font-medium">{story.title}</td>
                <td className="p-4"><span className="px-2 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg text-sm">{story.level}</span></td>
                <td className="p-4 uppercase text-sm font-bold text-slate-500">{story.language}</td>
                <td className="p-4">
                  {story.published ? (
                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                  ) : (
                    <span className="material-symbols-outlined text-slate-300">radio_button_unchecked</span>
                  )}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
                  <button className="text-emerald-600 hover:text-emerald-800 font-medium text-sm">Publish</button>
                  <button className="text-orange-600 hover:text-orange-800 font-medium text-sm">Archive</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">No stories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
