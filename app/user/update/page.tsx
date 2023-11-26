"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

function Page() {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [hostel, setHostel] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [disabled, setDisabled] = useState(true);
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

          setHostel(data.user.hostel);
          setPhoneNumber(data.user.phoneNumber);
        }
      }
      getUser();
    },
    [session?.user?.email]
  );
  async function handleUpdate() {
    const requestBody = {
      email: session?.user?.email,
      name,
      hostel,
      phoneNumber,
    };
    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();
    if (data.status == "success") {
      setDisabled(true);
    }
  }
  return (
    <div>
      <div className="flex flex-col items-center pt-8 pb-5 gap-6 w-screen h-full bg-black min-h-screen">
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
            <Link href="/sell">My Wallet</Link>
          </div>
          <div className="ml-16 font-sora text-xl min-w-[63px] whitespace-nowrap text-white text-opacity-100 leading-none font-normal hover:text-yellow-300 hover:scale-105">
            <Link href="/login">Login</Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start py-14 px-24 rounded-[40px] h-full bg-white">
          <h1 className="text-2xl font-bold">Update Profile</h1>
          <div className="flex items-center mt-8">
            {" "}
            <div className=" ml-4 font-sora text-xl min-w-[173px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium ">
              Name
            </div>
            <input
              type="text"
              className="border-2 border-black py-1 rounded-xl px-4"
              value={name}
              disabled={disabled}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center mt-6">
            {" "}
            <div className=" ml-4 font-sora text-xl min-w-[173px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium ">
              Phone Number
            </div>
            <input
              type="text"
              className="border-2 border-black py-1 rounded-xl px-4"
              value={phoneNumber}
              disabled={disabled}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="flex items-center mt-6">
            {" "}
            <div className=" ml-4 font-sora text-xl min-w-[173px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium ">
              Hostel
            </div>
            <input
              type="text"
              className="border-2 border-black py-1 rounded-xl px-4"
              value={hostel}
              disabled={disabled}
              onChange={(e) => setHostel(e.target.value)}
            />
          </div>
          <button
            className="bg-black text-white mt-8 text-2xl px-[6vw] py-2 rounded-xl hover:scale-105"
            onClick={() => {
              setDisabled((is) => !is);
              if (!disabled) {
                handleUpdate();
              }
            }}
          >
            {disabled ? "Click to Start Updating" : "Click to Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
