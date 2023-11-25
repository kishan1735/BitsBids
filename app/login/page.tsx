"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function page() {
  return (
    <>
      <div className="flex justify-between pr-[108px] gap-[92px] w-screen h-full bg-white">
        <img
          src="/images/ImageAsset2.png"
          alt="Image Asset 2"
          className="min-h-screen h-screen w-[60vw]"
        />

        <div className="flex flex-col items-center w-[50vw] py-12 space-y-4">
          <div className="text-3xl font-bold pb-4">Login</div>
          <div
            className=" pl-4 pr-8 rounded-full flex items-center space-x-4 border-2 border-slate-900 cursor-pointer"
            onClick={() =>
              signIn(
                "google",
                { callbackUrl: `${process.env.URL}` },
                { prompt: "login" }
              )
            }
          >
            <Image
              src="/images/ImageAsset1.png"
              alt="Image Asset 1"
              width={48}
              height={46}
            />
            <button className="font-inter text-xl text-center whitespace-nowrap text-black text-opacity-100 font-normal">
              Login with Gmail
            </button>
          </div>
          <div className="text-2xl pb-4 pt-4 text-slate-800">OR</div>
          <div className=" pl-4 pr-8 rounded-full flex items-center space-x-6">
            <div className="text-2xl text-medium pr-12">Email</div>
            <input
              type="text"
              className="border-2 py-1 px-2 rounded-full border-slate-900 text-center"
            />
          </div>
          <div className=" pl-4 pr-8 pb-4 rounded-full flex items-center space-x-6">
            <div className="text-2xl text-medium">Password</div>
            <input
              type="text"
              className="border-2 py-1 px-2 rounded-full border-slate-900 text-center"
            />
          </div>
          <button className="bg-black text-white text-2xl rounded-xl px-[6vw] border-2 border-black py-2 hover:bg-white hover:text-black ">
            Login
          </button>
          <h1 className="text-xl mt-4">
            No Account -{" "}
            <Link href="/signup" className="text-orange-700">
              {" "}
              Sign Up
            </Link>
          </h1>
        </div>
      </div>
    </>
  );
}

export default page;
