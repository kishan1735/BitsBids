import Image from "next/image";
import Link from "next/link";

import React from "react";

const TextComponent = ({
  text,
  minWidth,
  marginLeft,
}: {
  text: string;
  minWidth: string;
  marginLeft: string;
}) => (
  <div
    className={`font-sora text-xl whitespace-nowrap text-white text-opacity-100 leading-none font-normal ${minWidth} ${marginLeft}`}
  >
    {text}
  </div>
);

const Component2 = ({
  prop11,
  prop12,
  prop14,
}: {
  prop11: string;
  prop12: string;
  prop14: any;
}) => <div className={`bg-zinc-300 ${prop11} ${prop12} ${prop14}`}></div>;

const data1 = [
  {
    textContent: "sell",
    minWidthClass: "min-w-[42px]",
    marginLeftClass: "ml-48",
  },
  {
    textContent: "profile ",
    minWidthClass: "min-w-[80px]",
    marginLeftClass: "ml-[75px]",
  },
  {
    textContent: "my wallet",
    minWidthClass: "min-w-[115px]",
    marginLeftClass: "ml-[75px]",
  },
  {
    textContent: "login",
    minWidthClass: "min-w-[63px]",
    marginLeftClass: "ml-16",
  },
];

const data2 = [
  { width: "w-48", height: "h-4" },
  { width: "w-2.5", height: "h-3", marginLeft: "ml-[75px]" },
  { width: "w-3", height: "h-2", marginLeft: "ml-[72px]" },
  { width: "w-2.5", height: "h-2", marginLeft: "ml-[75px]" },
  { width: "w-2.5", height: "h-2", marginLeft: "ml-[75px]" },
];

const GeneratedComponent = () => (
  <div className="flex flex-col justify-between items-center pt-[6vh] pb-[12vh] gap-6 w-screen h-[1024px] bg-black">
    <div className="flex justify-start items-center h-[10vh]">
      <div className="font-sora text-4xl min-w-[215px] whitespace-nowrap text-white text-opacity-100 leading-none font-normal hover:text-blue-300">
        <Link href="/">BITSbids</Link>
      </div>
      <div className="ml-48 font-sora text-xl min-w-[42px] whitespace-nowrap text-white text-opacity-100 leading-none font-normal hover:text-yellow-300 hover:scale-105">
        <Link href="/sell">Sell</Link>
      </div>
      <div className="ml-16 font-sora text-xl min-w-[63px] whitespace-nowrap text-white text-opacity-100 leading-none font-normal hover:text-yellow-300 hover:scale-105">
        <Link href="/bids">Bids</Link>
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
    <div className="flex justify-start items-center pl-20 rounded-[40px] w-screen h-[912px] bg-white scale-95">
      <div className="relative w-[636px] h-[582px]">
        <div className="absolute top-[496px] left-[578px] z-30 w-14 h-14 bg-gray-500"></div>
        <div className="absolute top-[153px] z-20 w-20 h-60 bg-gray-500"></div>
        <div className="absolute left-6 z-10 flex justify-between items-start pt-[76px] pr-[197px] pl-[71px] gap-9 w-[582px] h-[582px] shadow-md bg-ImageAsset2">
          <div className="w-[84px] h-[83px] bg-zinc-300"></div>
          <div className="mt-9 flex flex-col justify-between items-start gap-[72px] w-48 h-[343px]">
            {data2.map(({ width, height, marginLeft }) => (
              <Component2
                prop11={width}
                prop12={height}
                prop14={marginLeft}
                key={width}
              />
            ))}
          </div>
        </div>
      </div>
      <img
        className="ml-[75px] z-40"
        src="../assets/SvgAsset1.svg"
        alt="Svg Asset 1"
      />
      <div className="ml-9 flex flex-col justify-start items-start w-[451px] h-72">
        <div className="ml-12 font-sora text-[50px] min-w-[400px] whitespace-nowrap text-black text-opacity-100 leading-none font-normal">
          Bid or Sell
        </div>
        <div className="mt-11 font-sora text-lg w-[389px] text-black text-opacity-100 leading-2 tracking-wide font-normal">
          Use Bitsbids as an anonymous bidder or seller. Explore second hand
          goods, participate in live biddings and sell items of your own.
          <br />
        </div>
        <div className="ml-20 font-sora text-xl min-w-[45px] whitespace-nowrap text-white text-opacity-100 leading-none font-normal">
          Sell&nbsp;
        </div>
      </div>
    </div>
  </div>
);
export default function Home() {
  return <GeneratedComponent />;
}
