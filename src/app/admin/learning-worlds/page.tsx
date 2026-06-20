import { getWorlds } from "../services/admin-services";
import CreateWorldModal from "./CreateWorldModal";

export default async function LearningWorldsPage() {
  const worlds = await getWorlds();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Learning Worlds</h2>
          <p className="text-slate-500 mt-2">Manage interactive environments and virtual learning spaces.</p>
        </div>
        <CreateWorldModal />
      </div>
      
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-zinc-800/50">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Icon</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Title</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Description</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Order Index</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
            {worlds.length > 0 ? worlds.map((world) => (
              <tr key={world.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/30">
                <td className="p-4">
                  <span className="material-symbols-outlined text-blue-500">{world.icon || 'public'}</span>
                </td>
                <td className="p-4 font-medium text-slate-900 dark:text-white">{world.title}</td>
                <td className="p-4 text-sm text-slate-500">{world.description || "No description"}</td>
                <td className="p-4"><span className="px-2 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg text-sm font-mono">{world.order_index}</span></td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
                  <button className="text-red-600 hover:text-red-800 font-medium text-sm">Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">No learning worlds found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
