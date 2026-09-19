import { Panel } from 'reactflow';
import { useBoardStore } from '../store/useBoardStore';
import { Settings } from 'lucide-react';

export function BoardSettingsPanel() {
  const settings = useBoardStore((state) => state.settings);
  const updateSettings = useBoardStore((state) => state.updateSettings);

  return (
    <Panel position="bottom-right" className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg w-64 flex flex-col overflow-hidden mb-4 mr-4">
      <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 font-bold text-sm">
        <Settings size={16} />
        Board Settings
      </div>
      
      <div className="p-4 flex flex-col gap-4">
        {/* Grid Type */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-zinc-500">Grid Type</label>
          <select 
            value={settings.gridType}
            onChange={(e) => updateSettings({ gridType: e.target.value as 'dots' | 'lines' | 'cross' })}
            className="w-full text-sm p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200"
          >
            <option value="dots">Dots</option>
            <option value="lines">Lines</option>
            <option value="cross">Crosses</option>
          </select>
        </div>

        {/* Snap to grid */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Snap to Grid</label>
          <input 
            type="checkbox" 
            checked={settings.snapToGrid}
            onChange={(e) => updateSettings({ snapToGrid: e.target.checked })}
            className="w-4 h-4 rounded accent-blue-500"
          />
        </div>
      </div>
    </Panel>
  );
}
