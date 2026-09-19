import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Image from '@tiptap/extension-image';
import { useBoardStore } from '../store/useBoardStore';
import { useEffect, useState } from 'react';
import { X, Bold, Italic, Heading2, List, Table as TableIcon, Image as ImageIcon } from 'lucide-react';

interface RichTextEditorProps {
  nodeId: string | null;
  onClose: () => void;
}

export function RichTextEditor({ nodeId, onClose }: RichTextEditorProps) {
  const node = useBoardStore((state) => state.nodes.find((n) => n.id === nodeId));
  const updateNodeData = useBoardStore((state) => state.updateNodeData);

  const [title, setTitle] = useState(node?.data.title || '');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write your campaign notes here...',
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
    ],
    content: node?.data.content || '',
    onUpdate: ({ editor }) => {
      if (nodeId) {
        updateNodeData(nodeId, { content: editor.getHTML() });
      }
    },
  });

  // Re-sync if nodeId changes
  useEffect(() => {
    if (node) {
      setTitle(node.data.title);
      editor?.commands.setContent(node.data.content);
    }
  }, [nodeId, editor]);

  if (!nodeId || !node) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-3xl h-[80vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              updateNodeData(nodeId, { title: e.target.value });
            }}
            placeholder="Node Title"
            className="text-2xl font-bold bg-transparent outline-none w-full text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
          />
          <button 
            onClick={onClose}
            className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Toolbar */}
        {editor && (
          <div className="flex items-center gap-2 p-2 px-4 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50">
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded-md ${editor.isActive('bold') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}><Bold size={16} /></button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded-md ${editor.isActive('italic') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}><Italic size={16} /></button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-1.5 rounded-md ${editor.isActive('heading', { level: 2 }) ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}><Heading2 size={16} /></button>
            <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-1.5 rounded-md ${editor.isActive('bulletList') ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}><List size={16} /></button>
            <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1" />
            <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className={`p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800`}><TableIcon size={16} /></button>
            <button onClick={() => {
              const url = prompt('Enter image URL:');
              if (url) editor.chain().focus().setImage({ src: url }).run();
            }} className={`p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800`}><ImageIcon size={16} /></button>
          </div>
        )}

        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto p-6 prose prose-zinc dark:prose-invert max-w-none relative">
          {editor && (
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <div className="flex items-center gap-1 bg-zinc-900 text-white rounded-lg p-1 shadow-xl">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1 rounded ${editor.isActive('bold') ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}><Bold size={14} /></button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1 rounded ${editor.isActive('italic') ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}><Italic size={14} /></button>
              </div>
            </BubbleMenu>
          )}
          <EditorContent editor={editor} className="min-h-full outline-none" />
        </div>

      </div>
    </div>
  );
}
