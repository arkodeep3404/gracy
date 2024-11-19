"use client";

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

    setBlog(response.data.userBlog.content);
  }

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div>
      <div className="p-10">
        <div dangerouslySetInnerHTML={{ __html: blog }}></div>
      </div>
    </div>
  );
}
