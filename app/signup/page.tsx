import Image from "next/image";
import Link from "next/link";

function page() {
  return (
    <>
      <div className="flex justify-between pr-[108px] gap-[92px] w-screen h-full bg-white">
        <img
          src="/images/ImageAsset2.png"
          alt="Image Asset 2"
          className="min-h-screen h-screen w-[50vw]"
        />

        <div className="flex flex-col items-center justify-center w-[50vw] py-12 space-y-4">
          <div className="text-3xl font-bold pb-6">Sign Up</div>
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
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default page;
