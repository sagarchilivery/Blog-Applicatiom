import { Context } from "@/utils/context";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

export default function Navbar() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    if (user !== null) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [user]);
  const router = useRouter();

  const navRight = ["Login", "SignIn"];

  return (
    <div className="w-full flex items-center py-2 justify-between bg-[#3e3d3e] text-white">
      <div
        onClick={() => {
          router.push("/");
        }}
        className="text-3xl cursor-pointer "
      >
        BlogDiaries
      </div>
      {userLoggedIn && (
        <div className="flex gap-6 uppercase">
          <div
            onClick={() => {
              router.push("/blogs");
            }}
            className=" cursor-pointer"
          >
            All Blogs
          </div>
          <div
            onClick={() => {
              router.push("/myBlogs");
            }}
            className=" cursor-pointer"
          >
            My Blogs
          </div>
        </div>
      )}

      <div className="flex gap-6">
        {!userLoggedIn &&
          navRight.map((item, index) => {
            return (
              <div
                className="cursor-pointer"
                onClick={() => router.push("/auth")}
                key={index}
              >
                {item}
              </div>
            );
          })}

        {userLoggedIn && (
          <div
            onClick={() => {
              router.push("/auth"), dispatch({ type: "USER", payload: null });
            }}
            className="cursor-pointer"
          >
            Logout
          </div>
        )}
      </div>
    </div>
  );
}
