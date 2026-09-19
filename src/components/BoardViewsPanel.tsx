import { useReactFlow, Panel } from 'reactflow';
import { useBoardStore } from '../store/useBoardStore';
import { Camera, Trash2, Map } from 'lucide-react';

export function BoardViewsPanel() {
  const { getViewport, setViewport } = useReactFlow();
  const views = useBoardStore((state) => state.views);
  const addView = useBoardStore((state) => state.addView);
  const removeView = useBoardStore((state) => state.removeView);

  const handleSaveView = () => {
    const name = prompt('Enter a name for this view:');
    if (!name) return;

    const viewport = getViewport();
    addView({
      id: Date.now().toString(),
      name,
      viewport,
    });
  };

  const handleGoToView = (viewport: { x: number; y: number; zoom: number }) => {
    setViewport(viewport, { duration: 800 });
  };

  return (
    <Panel position="top-right" className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg w-64 flex flex-col overflow-hidden">
      <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900">
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200 font-bold text-sm">
          <Map size={16} />
          Board Views
        </div>
        <button 
          onClick={handleSaveView}
          className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          title="Save Current View"
        >
          <Camera size={14} />
        </button>
      </div>
      
      <div className="max-h-64 overflow-y-auto p-2 flex flex-col gap-1">
        {views.length === 0 ? (
          <div className="text-xs text-center text-zinc-500 py-4">No saved views.</div>
        ) : (
          views.map(view => (
            <div key={view.id} className="flex items-center justify-between group p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md cursor-pointer transition-colors" onClick={() => handleGoToView(view.viewport)}>
              <span className="text-sm text-zinc-700 dark:text-zinc-300 truncate pr-2">{view.name}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); removeView(view.id); }} 
                className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-all"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))
        )}
      </div>
    </Panel>
  );
}
