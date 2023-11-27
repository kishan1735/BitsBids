"use client";
import NavBar from "@/components/NavBar";
import { useState } from "react";

function Page() {
  const [chat, setChat] = useState("");
  return (
    <div className="flex flex-col items-center pt-6 pb-6 gap-8 w-screen h-full min-h-screen bg-black">
      <NavBar />
      <div className="flex justify-around items-start pb-5 pt-8 pr-10 pl-[5vw] gap-16 rounded-[40px] w-[96vw] min-h-[70vh] bg-white">
        <div className="w-1/3 flex flex-col border-r-2 border-slate-500">
          <h1 className="text-center border-2 border-slate-500 mx-8 text-2xl py-2">
            Chats
          </h1>
          <h2 className="text-center border-b-2  border-x-2 border-slate-200 mx-8 py-4 text-xl cursor-pointer hover:bg-black hover:text-white">
            User 1
          </h2>
          <h2 className="text-center border-b-2 border-x-2 border-slate-200 mx-8 py-4 text-xl cursor-pointer hover:bg-black hover:text-white">
            User 2
          </h2>
          <h2 className="text-center border-b-2 border-x-2 border-slate-200 mx-8 py-4 text-xl cursor-pointer hover:bg-black hover:text-white">
            User 3
          </h2>
        </div>
        <div className="w-2/3 flex flex-col space-y-4">
          <h1 className="text-center border-2 border-slate-500 mx-8 text-2xl py-2">
            User X
          </h1>
          <div className="min-h-[33vh]"></div>
          <div className="flex mx-8 space-x-4">
            <input
              type="text"
              value={chat}
              onChange={(e) => setChat(e.target.value)}
              className="border-2 border-slate-200  py-2 text-center rounded-xl px-4 w-[40vw] text-xl"
              placeholder="Send Message"
            />
            <button className="bg-black text-white text-lg py-2 px-4 rounded-xl hover:scale-105">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
