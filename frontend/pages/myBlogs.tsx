import Baselayout from "@/components/baselayout";
import { Context } from "@/utils/context";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export default function MyBlogs() {
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const [myBlogs, setMyBlogs] = useState<any>();

  useEffect(() => {
    async function userBlogs() {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/blog/user/${user._id}/`
        );
        setMyBlogs(response.data.blogs);
      } catch (error) {
        console.log(error);
      }
    }
    userBlogs();
  }, [user]);
  return (
    <Baselayout>
      <div className="w-screen max-w-[1440px]">
        {myBlogs &&
          myBlogs.map((blog: any) => {
            return <div key={blog._id}>{blog.blogs}</div>;
          })}
      </div>
    </Baselayout>
  );
}
