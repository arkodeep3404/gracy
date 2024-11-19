"use client";

import { useParams } from "next/navigation";

import "katex/dist/katex.min.css";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { Mathematics } from "@tiptap-pro/extension-mathematics";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import axios from "axios";
import { useEffect, useState } from "react";

const MenuBar = ({ editor }: { editor: any }) => {
  const params = useParams();

  async function saveBlog() {
    const content = editor.getHTML();

    const response = await axios.post("/api/edit", {
      content: content,
      blogId: params.blogId,
    });

    alert(response.data.message);
  }

  async function viewBlog() {
    const url = `/view/${params.blogId}`;

    window.open(url, "_blank");
  }

  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-1 flex-wrap">
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-purple-600" : ""}
      >
        Bold
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-purple-600" : ""}
      >
        Italic
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "bg-purple-600" : ""}
      >
        Underline
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "bg-purple-600" : ""}
      >
        Strike
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "bg-purple-600" : ""}
      >
        Code
      </Button>

      <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        Clear marks
      </Button>

      <Button onClick={() => editor.chain().focus().clearNodes().run()}>
        Clear nodes
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 }) ? "bg-purple-600" : ""
        }
      >
        H1
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 }) ? "bg-purple-600" : ""
        }
      >
        H2
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 }) ? "bg-purple-600" : ""
        }
      >
        H3
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 }) ? "bg-purple-600" : ""
        }
      >
        H4
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive("heading", { level: 5 }) ? "bg-purple-600" : ""
        }
      >
        H5
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive("heading", { level: 6 }) ? "bg-purple-600" : ""
        }
      >
        H6
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-purple-600" : ""}
      >
        Bullet list
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-purple-600" : ""}
      >
        Ordered list
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "bg-purple-600" : ""}
      >
        Code block
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "bg-purple-600" : ""}
      >
        Blockquote
      </Button>

      <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        Horizontal rule
      </Button>

      <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
        Hard break
      </Button>

      <Button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        Undo
      </Button>

      <Button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        Redo
      </Button>

      <Button>
        <Label>
          <Input
            className="sr-only"
            type="color"
            onInput={(e) =>
              editor
                .chain()
                .focus()
                .setColor((e.target as HTMLInputElement).value)
                .run()
            }
            value={editor.getAttributes("textStyle").color}
          />
          Color
        </Label>
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive("highlight") ? "bg-purple-600" : ""}
      >
        Highlight
      </Button>

      <Button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={
          editor.isActive({ textAlign: "left" }) ? "bg-purple-600" : ""
        }
      >
        Left
      </Button>

      <Button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive({ textAlign: "center" }) ? "bg-purple-600" : ""
        }
      >
        Center
      </Button>

      <Button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={
          editor.isActive({ textAlign: "right" }) ? "bg-purple-600" : ""
        }
      >
        Right
      </Button>

      <Button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={
          editor.isActive({ textAlign: "justify" }) ? "bg-purple-600" : ""
        }
      >
        Justify
      </Button>

      <Button onClick={saveBlog}>Save Blog</Button>
      <Button onClick={viewBlog}>View Blog</Button>
    </div>
  );
};

export const Tiptap = () => {
  const params = useParams();
  const [blogContent, setBlogContent] = useState("");

  async function getBlog() {
    const response = await axios.get("/api/existing", {
      headers: { blogId: params.blogId },
    });

    setBlogContent(response.data.userBlog.content);
  }

  useEffect(() => {
    getBlog();
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `prose max-w-none border border-black m-5 p-5 rounded-lg`,
      },
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Color,
      TextStyle,
      Typography,
      Underline,
      Mathematics,
    ],
    content: blogContent,
  });

  useEffect(() => {
    if (editor && blogContent !== "") {
      editor.commands.setContent(blogContent);
    }
  }, [blogContent, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className="sticky top-1 z-50 bg-white">
        <MenuBar editor={editor} />
      </div>
      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
