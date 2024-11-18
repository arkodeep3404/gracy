"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [blog, setBlog] = useState([]);

  async function fetchData() {
    const response = await axios.get("/api/blog");

    setBlog(response.data.userBlogs);
  }

  async function createNew() {
    const response: any = await axios.post("/api/new");
    const url = `/dashboard/edit/${response.data.blogId}`;

    router.push(url);
  }

  async function logout() {
    const response = await axios.post("/api/logout");
    toast(response.data.message);
    router.replace("/signin");
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="p-10">
        <div className="w-full flex gap-5 justify-end items-center">
          <Button onClick={createNew}> Create New </Button>
          <Button onClick={logout}> Logout </Button>
        </div>
        <div className="p-5">
          {blog.map((item: any) => (
            <div key={item.id} className="h-36 w-36">
              <Link href={`/dashboard/edit/${item.id}`} key={item.id}>
                <div
                  className="h-36 w-36 border border-black rounded-lg"
                  key={item.id}
                >
                  {item.content.slice(0, 50)}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
