import { Handle, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { AppNodeData } from '../store/useBoardStore';

interface ImageNodeProps {
  data: AppNodeData;
  isConnectable: boolean;
  selected: boolean;
}

export function ImageNode({ data, isConnectable, selected }: ImageNodeProps) {
  return (
    <div className={`relative flex items-center justify-center p-1 rounded-md transition-all ${
      selected ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:ring-1 hover:ring-zinc-400'
    }`}>
      <NodeResizer 
        color="#3b82f6" 
        isVisible={selected} 
        minWidth={100} 
        minHeight={100} 
      />
      
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <img 
        src={data.imageUrl} 
        alt={data.title || 'Board Image'} 
        className="w-full h-full object-cover rounded pointer-events-none" 
      />

      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
