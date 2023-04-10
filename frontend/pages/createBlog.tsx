import Baselayout from "@/components/baselayout";
import { Context } from "@/utils/context";
import axios from "axios";
import React, { useContext, useState } from "react";

export default function CreateBlog() {
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const [data, setData] = useState<any>({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e: any) => {
    setData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const sendToBackend = (e: any) => {
    e.preventDefault();
    console.log(user);

    async function createUserBlog() {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/blog/add",
          {
            title: data.title,
            description: data.description,
            image: data.image,
            author: user._id,
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    createUserBlog();
    // console.log(data);
  };
  return (
    <Baselayout>
      <div className="w-[800px] h-[600px] border">
        <form onSubmit={sendToBackend}>
          <div className="flex gap-10">
            <div className="">Title</div>
            <input
              type="text"
              onChange={handleChange}
              className="text-black"
              name="title"
              id=""
            />
          </div>
          <div className="flex gap-10">
            <div className="">Description</div>
            <input
              type="text"
              onChange={handleChange}
              className="text-black"
              name="description"
              id=""
            />
          </div>
          <div className="flex gap-10">
            <div className="">Image</div>
            <input
              type="text"
              onChange={handleChange}
              className="text-black"
              name="image"
              id=""
            />
          </div>
          <input type="submit" value="Create" name="" id="" />
        </form>
      </div>
    </Baselayout>
  );
}
