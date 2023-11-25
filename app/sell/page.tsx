"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

function Page() {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<any>(null);
  const [description, setDescription] = useState("");
  const [academic, setAcademic] = useState(false);
  const [time, setTime] = useState<any>(2);

  async function handleSell() {
    const requestBody = {
      name,
      description,
      basePrice: price,
      userName: session?.user?.name,
      email: session?.user?.email,
      time,
      academic,
    };
    const res = await fetch("/api/sell", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();
  }

  return (
    <>
      <div className="flex flex-col justify-between items-center pt-10 pb-10 gap-8 w-screen h-full min-h-screen bg-black">
        <div className="flex justify-start items-center h-[10vh]">
          <div className="font-sora text-4xl min-w-[215px] whitespace-nowrap text-white text-opacity-100 leading-none font-normal hover:text-blue-300">
            <Link href="/">BITSbids</Link>
          </div>
          <div className="ml-48 font-sora text-xl min-w-[42px] whitespace-nowrap text-white text-opacity-100 leading-none font-normal hover:text-yellow-300 hover:scale-105">
            <Link href="/sell">Sell</Link>
          </div>
          <div className="ml-[75px] font-sora text-xl min-w-[80px] whitespace-nowrap text-white text-opacity-100 leading-none font-normal hover:text-yellow-300 hover:scale-105">
            <Link href="/user/profile">Profile&nbsp;</Link>
          </div>
          <div className="ml-[75px] font-sora text-xl min-w-[115px] whitespace-nowrap text-white text-opacity-100 leading-none font-normal  hover:text-yellow-300 hover:scale-105">
            <Link href="/wallet">My Wallet</Link>
          </div>
          <div className="ml-16 font-sora text-xl min-w-[63px] whitespace-nowrap text-white text-opacity-100 leading-none font-normal hover:text-yellow-300 hover:scale-105">
            <Link href="/login">Login</Link>
          </div>
        </div>
        <div className="absolute top-3.5 left-[378px] z-10 font-sora text-xl whitespace-nowrap text-white text-opacity-100 leading-none font-normal">
          &nbsp;
        </div>

        <div className="flex justify-between items-start pt-14 pr-10 pl-[132px] gap-16 rounded-[40px] w-[99vw] h-full bg-white">
          <div className="mt-14 flex flex-col justify-between items-center gap-8 w-[407px] h-[516px]">
            <button className="flex flex-col justify-center items-center rounded-[20px] w-[35vw] h-[55vh] shadow-md bg-white">
              <div className="font-sora text-xl whitespace-nowrap text-black text-opacity-100 leading-none font-normal">
                Insert Images&nbsp;&nbsp;
              </div>
            </button>
          </div>
          <div className="flex flex-col justify-start items-center w-[50vw]">
            <div className="font-sora text-3xl whitespace-nowrap text-black text-opacity-100 leading-none font-semibold">
              Sell Product
            </div>

            <div className="mt-[58px] flex items-center justify-center space-x-4">
              <div className=" font-sora text-3xl whitespace-nowrap text-black text-opacity-100 leading-none font-normal pr-6">
                Enter Product Name:
              </div>
              <input
                type="text"
                className="border-2 border-black text-center py-1 px-4 rounded-xl "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex items-center mt-5 font-sora space-x-4 justify-between">
              <div className="text-2xl whitespace-nowrap text-black text-opacity-100 leading-none font-normal pr-28">
                Enter Asking Price:
              </div>
              <input
                type="text"
                className="border-2 border-black text-center  px-4 py-1 rounded-xl "
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="flex items-center font-sora space-x-4 justify-between mt-5">
              <div className="text-2xl whitespace-nowrap text-black text-opacity-100 leading-none font-normal pr-4">
                Enter Product Description:
              </div>
              <input
                type="text"
                className="border-2 border-black text-center  px-4 py-1 rounded-xl "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mt-8 flex items-center space-x-4">
              <div className="text-2xl">Time</div>
              <select
                className="px-4 py-1 border-black border-2 rounded-xl text-xl"
                onChange={(e) => setTime(+e.target.value)}
              >
                <option value={2}>2hrs</option>
                <option value={4}>4hrs</option>
                <option value={8}>8hrs</option>
                <option value={12}>12hrs</option>
                <option value={24}>24hrs</option>
                <option value={48}>48hrs</option>
              </select>
            </div>

            <div className="mt-[6vh] rotate-0"></div>
            <div className="flex items-center justify-between space-x-4">
              <button
                className={`${
                  academic
                    ? "bg-black border-slate-200 text-slate-200"
                    : "bg-white text-black border-black"
                } border-2  px-6 py-2 rounded-lg text-xl`}
                onClick={() => {
                  setAcademic((is) => !is);
                }}
              >
                Acacdemic
              </button>
              <button
                className={`${
                  !academic
                    ? "bg-black border-slate-200 text-slate-200"
                    : "bg-white text-black border-black"
                } border-2  px-6 py-2 rounded-lg text-xl`}
                onClick={() => {
                  setAcademic((is) => !is);
                }}
              >
                Non Acacdemic
              </button>
            </div>

            <button
              className="mt-8 flex justify-center items-center rounded-[20px] w-[413px] h-[74px] bg-stone-900"
              onClick={handleSell}
            >
              <div className="font-sora text-xl min-w-[45px] whitespace-nowrap text-white text-opacity-100 leading-none font-normal">
                Sell&nbsp;
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
