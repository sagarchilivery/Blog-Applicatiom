import React from "react";
import Navbar from "../navbar";

export default function Baselayout({ title, children }: any) {
  return (
    <div className="bg-[#3e3d3d] flex justify-center overflow-hidden">
      <div className="bg-[#3e3d3d] flex flex-col items-center w-full max-w-[1440px]">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="min-h-screen text-white">{children}</div>
      </div>
    </div>
  );
}
