import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import localforage from 'localforage';

localforage.config({
  name: 'alkemion-studio-db',
  storeName: 'board-store',
});

// Custom storage engine using localforage for IndexedDB
const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await localforage.getItem(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await localforage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await localforage.removeItem(name);
  },
};

export type AppNodeData = {
  title: string;
  content: string; // HTML content from TipTap
  imageUrl?: string; // Base64 data URL for images
};

export type FileNode = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  data?: AppNodeData; // For files, to store content
};

type AppNode = Node<AppNodeData>;

export type BoardView = {
  id: string;
  name: string;
  viewport: { x: number; y: number; zoom: number };
};

interface BoardState {
  nodes: AppNode[];
  edges: Edge[];
  fileSystem: FileNode[];
  views: BoardView[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: AppNode) => void;
  updateNodeData: (id: string, data: Partial<AppNodeData>) => void;
  addFileSystemNode: (parentId: string | null, newNode: FileNode) => void;
  removeFileSystemNode: (id: string) => void;
  addView: (view: BoardView) => void;
  removeView: (id: string) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      nodes: [
        {
          id: '1',
          type: 'customNode',
          position: { x: 250, y: 250 },
          data: { title: 'Welcome to Alkemion', content: '<p>Click me to edit.</p>' },
        },
      ],
      edges: [],
      fileSystem: [
        { id: 'root', name: 'Campaign Root', type: 'folder', children: [] }
      ],
      views: [],

      onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },

      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },

      onConnect: (connection: Connection) => {
        set({
          edges: addEdge(connection, get().edges),
        });
      },

      addNode: (node: AppNode) => {
        set({
          nodes: [...get().nodes, node],
        });
      },

      updateNodeData: (id: string, data: Partial<AppNodeData>) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === id) {
              return {
                ...node,
                data: { ...node.data, ...data },
              };
            }
            return node;
          }),
        });
      },

      addFileSystemNode: (parentId: string | null, newNode: FileNode) => {
        set((state) => {
          if (!parentId) {
            return { fileSystem: [...state.fileSystem, newNode] };
          }
          
          const addChild = (nodes: FileNode[]): FileNode[] => {
            return nodes.map((n) => {
              if (n.id === parentId) {
                return { ...n, children: [...(n.children || []), newNode] };
              }
              if (n.children) {
                return { ...n, children: addChild(n.children) };
              }
              return n;
            });
          };

          return { fileSystem: addChild(state.fileSystem) };
        });
      },

      removeFileSystemNode: (id: string) => {
        set((state) => {
          const removeNode = (nodes: FileNode[]): FileNode[] => {
            return nodes.filter(n => n.id !== id).map(n => {
              if (n.children) return { ...n, children: removeNode(n.children) };
              return n;
            });
          };
          return { fileSystem: removeNode(state.fileSystem) };
        });
      },

      addView: (view: BoardView) => {
        set((state) => ({ views: [...state.views, view] }));
      },

      removeView: (id: string) => {
        set((state) => ({ views: state.views.filter(v => v.id !== id) }));
      },
    }),
    {
      name: 'board-storage',
      storage: createJSONStorage(() => storage),
    }
  )
);
