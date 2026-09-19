import { useState } from 'react';
import { useBoardStore, FileNode } from '../store/useBoardStore';
import { Folder, FileText, ChevronRight, ChevronDown, Plus, Trash2 } from 'lucide-react';

export function Sidebar() {
  const fileSystem = useBoardStore((state) => state.fileSystem);
  const addFileSystemNode = useBoardStore((state) => state.addFileSystemNode);
  const removeFileSystemNode = useBoardStore((state) => state.removeFileSystemNode);

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCreate = (parentId: string, type: 'file' | 'folder') => {
    const name = prompt(`Enter ${type} name:`);
    if (!name) return;
    
    addFileSystemNode(parentId, {
      id: Date.now().toString(),
      name,
      type,
      children: type === 'folder' ? [] : undefined,
      data: type === 'file' ? { title: name, content: '' } : undefined,
    });
    
    setExpandedFolders(prev => new Set(prev).add(parentId));
  };

  const onDragStart = (e: React.DragEvent, node: FileNode) => {
    e.dataTransfer.setData('application/reactflow-node', JSON.stringify(node));
    e.dataTransfer.effectAllowed = 'move';
  };

  const renderNode = (node: FileNode, level: number = 0) => {
    const isExpanded = expandedFolders.has(node.id);
    const isFolder = node.type === 'folder';

    return (
      <div key={node.id} className="select-none">
        <div 
          className="flex items-center gap-1.5 py-1.5 px-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md cursor-pointer group text-sm"
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => isFolder && toggleFolder(node.id)}
          draggable={!isFolder}
          onDragStart={(e) => !isFolder && onDragStart(e, node)}
        >
          {isFolder ? (
            isExpanded ? <ChevronDown size={14} className="text-zinc-500" /> : <ChevronRight size={14} className="text-zinc-500" />
          ) : (
            <span className="w-3.5" />
          )}
          
          {isFolder ? <Folder size={14} className="text-blue-500" /> : <FileText size={14} className="text-zinc-500" />}
          
          <span className="flex-1 truncate text-zinc-700 dark:text-zinc-300">{node.name}</span>
          
          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
            {isFolder && (
              <>
                <button onClick={(e) => { e.stopPropagation(); handleCreate(node.id, 'file'); }} className="p-0.5 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded text-zinc-500">
                  <FileText size={12} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleCreate(node.id, 'folder'); }} className="p-0.5 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded text-zinc-500">
                  <Folder size={12} />
                </button>
              </>
            )}
            {node.id !== 'root' && (
              <button onClick={(e) => { e.stopPropagation(); removeFileSystemNode(node.id); }} className="p-0.5 hover:bg-red-200 dark:hover:bg-red-900 rounded text-red-500">
                <Trash2 size={12} />
              </button>
            )}
          </div>
        </div>
        
        {isFolder && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 h-full bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="font-bold text-zinc-800 dark:text-zinc-100">Content Tree</h2>
        <p className="text-xs text-zinc-500 mt-1">Drag files to the canvas</p>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {fileSystem.map(node => renderNode(node))}
      </div>
    </div>
  );
}
