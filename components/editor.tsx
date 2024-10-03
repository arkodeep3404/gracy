"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = () => {
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "border border-black m-10 p-10 h-[calc(100vh-5rem)] overflow-auto",
      },
    },
    extensions: [StarterKit],
    content: "",
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
