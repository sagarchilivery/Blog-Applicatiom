import Baselayout from "@/components/baselayout";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Blogs() {
  const [allBlogs, setAllBlogs] = useState<any>();
  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/blog");
        console.log(response.data);
        setAllBlogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllBlogs();
  }, []);

  return (
    <Baselayout>
      <div className="w-screen max-w-[1440px]">
        <div className="text-6xl text-center underline italic">Blogs</div>
        <div className="flex my-16  flex-col gap-10">
          {allBlogs &&
            allBlogs.map((blog: any) => {
              console.log(blog, "here");
              return (
                <div key={blog._id} className="border gap-12 flex">
                  <div className="h-[350px] w-[350px] border">
                    <div className="">{blog.image}</div>
                  </div>
                  <div className="flex flex-col py-6">
                    <div className="text-3xl">{blog.title}</div>
                    <div className="mt-2">{blog.author.name}</div>
                    <div className="text-2xl mt-6">{blog.description}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Baselayout>
  );
}
