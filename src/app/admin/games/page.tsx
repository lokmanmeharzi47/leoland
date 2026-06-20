import { getGames } from "../services/admin-services";

import CreateGameModal from "./CreateGameModal";

export default async function GamesPage() {
  const games = await getGames();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Games Management</h2>
          <p className="text-slate-500 mt-2">Manage educational mini-games, difficulty levels, and XP rewards.</p>
        </div>
        <CreateGameModal />
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-zinc-800/50">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Title</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Category</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Difficulty</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">XP Reward</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Status</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
            {games.length > 0 ? games.map((game) => (
              <tr key={game.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/30">
                <td className="p-4 font-medium">{game.title}</td>
                <td className="p-4">{game.category || "General"}</td>
                <td className="p-4"><span className="px-2 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg text-sm">{game.difficulty}</span></td>
                <td className="p-4 text-blue-600 font-bold">{game.xp_reward}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    game.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {game.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
                  <button className="text-orange-600 hover:text-orange-800 font-medium text-sm">Disable</button>
                  <button className="text-red-600 hover:text-red-800 font-medium text-sm">Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">No games found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
