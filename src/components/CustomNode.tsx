import { Handle, Position } from 'reactflow';
import { AppNodeData } from '../store/useBoardStore';

interface CustomNodeProps {
  data: AppNodeData;
  isConnectable: boolean;
  selected: boolean;
}

export function CustomNode({ data, isConnectable, selected }: CustomNodeProps) {
  return (
    <div
      className={`bg-white dark:bg-zinc-900 border-2 rounded-xl shadow-lg w-64 p-4 transition-all ${
        selected ? 'border-blue-500 shadow-blue-500/20' : 'border-zinc-200 dark:border-zinc-800'
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-zinc-300 border-2 border-white dark:border-zinc-900"
      />
      
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100 truncate">
          {data.title || 'Untitled Node'}
        </h3>
        <div 
          className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 prose prose-sm dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: data.content || '<em>Empty...</em>' }}
        />
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-zinc-300 border-2 border-white dark:border-zinc-900"
      />
    </div>
  );
}
