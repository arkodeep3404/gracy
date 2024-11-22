"use client";

import "katex/dist/katex.min.css";
import katex from "katex";

import axios from "axios";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewBlog() {
  const [blog, setBlog] = useState("");
  const params = useParams();

  async function getBlog() {
    const response = await axios.get("/api/view", {
      headers: { blogId: params.blogId },
    });

    const latexRegex = /\$(.+?)\$/g;

    const processedContent = response.data.userBlog.content.replace(
      latexRegex,
      (_: any, latex: any) => {
        try {
          return katex.renderToString(latex, { throwOnError: false });
        } catch (error) {
          console.log(error);
          return latex;
        }
      }
    );

    setBlog(processedContent);
  }

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div>
      <div className="prose max-w-none flex items-center justify-center">
        <div dangerouslySetInnerHTML={{ __html: blog }} />
      </div>
    </div>
  );
}
