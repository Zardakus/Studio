import { useCallback, useState, useRef } from 'react';
import ReactFlow, { Background, Controls, NodeMouseHandler } from 'reactflow';
import 'reactflow/dist/style.css';

import { useBoardStore } from '../store/useBoardStore';
import { CustomNode } from './CustomNode';
import { ImageNode } from './ImageNode';
import { RichTextEditor } from './RichTextEditor';
import { BoardViewsPanel } from './BoardViewsPanel';
import { BoardSettingsPanel } from './BoardSettingsPanel';

const nodeTypes = {
  customNode: CustomNode,
  imageNode: ImageNode,
};

export function Board() {
  const { nodes, edges, settings, onNodesChange, onEdgesChange, onConnect, addNode } = useBoardStore();
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onNodeDoubleClick: NodeMouseHandler = useCallback((_, node) => {
    setActiveNodeId(node.id);
  }, []);

  const onPaneContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!reactFlowWrapper.current) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      // Handle image file drop
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        return;
      }

      const newNodeId = Date.now().toString();
      let pos = { x, y };
      if (settings.snapToGrid) {
        pos = { x: Math.round(x / 24) * 24, y: Math.round(y / 24) * 24 };
      }

      addNode({
        id: newNodeId,
        type: 'customNode',
        position: pos,
        data: { title: 'New Note', content: '' },
      });
      
      setActiveNodeId(newNodeId);
    },
    [addNode, settings.snapToGrid]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!reactFlowWrapper.current) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      let x = e.clientX - bounds.left;
      let y = e.clientY - bounds.top;

      if (settings.snapToGrid) {
        x = Math.round(x / 24) * 24;
        y = Math.round(y / 24) * 24;
      }

      // Handle image file drop
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const base64Url = event.target?.result as string;
            addNode({
              id: Date.now().toString(),
              type: 'imageNode',
              position: { x, y },
              data: { title: file.name, content: '', imageUrl: base64Url },
            });
          };
          reader.readAsDataURL(file);
        }
        return;
      }

      // Handle sidebar tree drop
      const rawData = e.dataTransfer.getData('application/reactflow-node');
      if (!rawData) return;
      
      const fileNode = JSON.parse(rawData);

      addNode({
        id: Date.now().toString(),
        type: 'customNode',
        position: { x, y },
        data: fileNode.data || { title: fileNode.name, content: '' },
      });
    },
    [addNode, settings.snapToGrid]
  );

  return (
    <div className="w-full h-full flex bg-zinc-50 dark:bg-zinc-950" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        onPaneContextMenu={onPaneContextMenu}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        snapToGrid={settings.snapToGrid}
        snapGrid={[24, 24]}
        fitView
      >
        <Background 
          className="bg-zinc-100 dark:bg-zinc-900" 
          color={settings.gridColor} 
          variant={settings.gridType as any}
          gap={24} 
          size={2} 
        />
        <Controls className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 shadow-md" />
        <BoardViewsPanel />
        <BoardSettingsPanel />
      </ReactFlow>

      {/* Rich Editor Modal */}
      {activeNodeId && (
        <RichTextEditor
          nodeId={activeNodeId}
          onClose={() => setActiveNodeId(null)}
        />
      )}
      
      {/* Help Overlay */}
      <div className="absolute top-4 left-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 pointer-events-none">
        <h1 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">Alkemion Studio MVP</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Right-click on canvas to add a node.</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Double-click a node to edit.</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Drag connections between nodes.</p>
      </div>
    </div>
  );
}
