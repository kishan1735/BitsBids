"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

function Page() {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(
    function () {
      async function getUser() {
        const requestBody = { email: session?.user?.email };
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(requestBody),
        });
        const data = await res.json();
        if (data.status == "success") {
          setName(data.user.name);
          setMail(data.user.email);
          setUserId(data.user.id);
        }
      }
      getUser();
    },
    [session?.user?.email]
  );
  return (
    <>
      <div className="flex flex-col justify-between items-center pt-10 pb-10 gap-6 w-screen h-full bg-black">
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
            <Link href="/sell">My Wallet</Link>
          </div>
          <div className="ml-16 font-sora text-xl min-w-[63px] whitespace-nowrap text-white text-opacity-100 leading-none font-normal hover:text-yellow-300 hover:scale-105">
            <Link href="/login">Login</Link>
          </div>
        </div>
        <div className="flex justify-start items-start pt-14 pl-24 rounded-[40px] w-[98vw] h-full bg-white">
          <div className="mt-[311px]"></div>
          <div className="mt-1.5 ml-3 flex flex-col justify-start items-start w-[561px] h-[615px]">
            <div className="ml-4 font-sora text-4xl min-w-[162px] whitespace-nowrap text-black text-opacity-100 leading-none font-semibold">
              Profile
            </div>
            <div className="mt-2 ml-4 font-sora text-lg min-w-[200px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium">
              Manage your Profile
            </div>
            <div className="mt-[15vh] ml-4 font-sora text-xl min-w-[86px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium">
              Name&nbsp;
            </div>
            <div className="mt-3"></div>
            <div className="mt-4 ml-4 font-sora text-lg min-w-[206px] whitespace-nowrap text-black text-opacity-100 leading-none font-light">
              {name}&nbsp;
            </div>
            <div className="mt-14 ml-4 font-sora text-xl min-w-[173px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium">
              Email Address
            </div>
            <div className="mt-4 rotate-0"></div>
            <div className="mt-4 ml-4 font-sora text-lg min-w-[335px] whitespace-nowrap text-black text-opacity-100 leading-none font-light">
              {mail}
            </div>
            <div className="mt-14 ml-4 font-sora text-xl min-w-[173px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium">
              User ID
            </div>
            <div className="mt-4 rotate-0"></div>
            <div className="mt-4 ml-4 font-sora text-lg min-w-[335px] whitespace-nowrap text-black text-opacity-100 leading-none font-light">
              {userId}
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-[45vw] h-[25vh]">
            <img
              src="/images/Profile4.png"
              alt="Image Asset 4"
              width="104px"
              height="104px"
            />
            <div className="mt-[136px] ml-[121px] font-sora text-xl min-w-[237px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium">
              Previous Purchaces
            </div>
            <div className="mt-3 ml-[91px]"></div>
            <div className="mt-4 ml-[121px] flex justify-between items-center gap-3 w-[250px] h-6">
              <div className="font-sora text-lg min-w-[220px] whitespace-nowrap text-black text-opacity-100 leading-none font-light">
                view purchace history
              </div>
              <img
                src="/images/Profile3.png"
                alt="Image Asset 3"
                width="18px"
                height="13px"
              />
            </div>
            <div className="mt-14 ml-[122px] font-sora text-xl min-w-[131px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium">
              Items Sold
            </div>
            <div className="mt-4 ml-[91px] rotate-0"></div>
            <div className="mt-4 ml-[121px] flex justify-between items-center gap-10 w-[250px] h-6">
              <div className="font-sora text-lg min-w-[191px] whitespace-nowrap text-black text-opacity-100 leading-none font-light">
                view selling history
              </div>
              <img
                src="/images/Profile2.png"
                alt="Image Asset 2"
                width="18px"
                height="13px"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
