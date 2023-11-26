import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function NavBar() {
  const { data: session, status } = useSession();
  console.log(status);
  return (
    <>
      {" "}
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
        {status != "authenticated" ? (
          <div className="ml-16 font-sora text-xl min-w-[63px] whitespace-nowrap text-white text-opacity-100 leading-none font-normal hover:text-yellow-300 hover:scale-105">
            <Link href="/login">Login</Link>
          </div>
        ) : (
          <button
            className="ml-16 text-white border-white border-2 px-4 py-1 rounded-3xl"
            onClick={() => signOut()}
          >
            Logout
          </button>
        )}
      </div>
      <div className="absolute top-3.5 left-[378px] z-10 font-sora text-xl whitespace-nowrap text-white text-opacity-100 leading-none font-normal">
        &nbsp;
      </div>
    </>
  );
}

export default NavBar;
