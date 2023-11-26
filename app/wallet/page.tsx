"use client";
import getStripe from "@/utils/stripe";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

function Page() {
  const { data: session, status } = useSession();
  const [bitscoins, setBitscoins] = useState<any>();
  const [amount, setAmount] = useState<any>();
  const [error, setError] = useState("");
  const [transaction, setTransaction] = useState([]);
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
        console.log(data);
        if (data.status == "success") {
          setBitscoins(data.user.bitscoins);
          setTransaction(data.user.transactionHistory);
        }
      }
      getUser();
    },
    [session]
  );
  async function handlePay() {
    const requestBody = { email: session?.user?.email, amount };
    const res = await fetch("/api/checkout_session", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();
    const stripe = await getStripe();
    const { error }: { error: any } = await stripe!.redirectToCheckout({
      sessionId: data?.session.id,
    });
    if (error) {
      setError(error);
    }
  }
  return (
    <>
      <div className="flex flex-col justify-between items-center pt-8 pb-12 gap-8 w-screen h-full min-h-screen bg-black">
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
        <div className="flex justify-start items-start pt-[75px] pl-24 pr-24 rounded-[40px] w-[95vw] min-h-content bg-white">
          <div className="mt-3 flex flex-col space-y-[4vh] justify-start items-start w-[543px] ">
            <div className="ml-4 font-sora text-3xl min-w-[182px] whitespace-nowrap text-black text-opacity-100 leading-none font-semibold">
              My Wallet
            </div>
            <div className="mt-2 ml-4 font-sora text-2xl min-w-[195px] whitespace-nowrap text-black text-opacity-100 leading-none font-normal">
              Current Balance&nbsp;
            </div>
            <div className="mt-7 flex flex-col justify-center items-center rounded-[20px] w-[401px] h-[231px] shadow-md bg-black">
              <div className="font-sora text-[46px] whitespace-nowrap text-white text-opacity-100 leading-none font-normal">
                {bitscoins} BitsCoins
              </div>
            </div>
            <div className="flex items-center space-x-4 mx-auto">
              <div className="text-2xl">Amount</div>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border-black py-2 border-2 text-center text-xl rounded-xl"
              />
            </div>
            <button
              className="mt-[8vh] ml-6 flex justify-center items-center rounded-[20px] w-[332px] h-16 bg-white border-[3px] border-black hover:bg-black hover:text-white cursor-pointer"
              onClick={handlePay}
            >
              <div className="font-sora text-2xl  min-w-[175px] whitespace-nowrap text-opacity-100 leading-none font-medium ">
                Add BitsCoins
              </div>
            </button>
          </div>
          <div className="ml-[311px] relative w-11 h-[580px]">
            <div className="absolute left-2 z-20 -rotate-90"></div>
            <div className="absolute top-[464px] z-10 font-sora text-xl min-w-[45px] whitespace-nowrap text-white text-opacity-100 leading-none font-normal">
              Sell&nbsp;
            </div>
          </div>
          <div className="ml-2 flex flex-col justify-start items-center w-96 min-h-content">
            <div className="font-sora text-3xl whitespace-nowrap text-black text-opacity-100 leading-none font-semibold">
              Activity
            </div>
            {transaction?.map((el: any, i) => {
              return (
                <div
                  key={i}
                  className="mt-8 flex flex-col space-y-2 justify-start items-start pt-2 pl-3.5 rounded-[20px] w-[381px] h-24 shadow-md bg-black"
                >
                  <div className="font-sora text-xs min-w-[61px] whitespace-nowrap text-white text-opacity-100 leading-none font-semibold">
                    {Date(el.time).split("GMT")[0]}
                  </div>
                  <div className="mt-2 ml-12 font-sora text-lg min-w-[251px] whitespace-nowrap text-white text-opacity-100 leading-none font-semibold text-center">
                    {el.for == "wallet" ? "Wallet" : el.for}
                  </div>
                  <div className="mt-1 ml-24 font-sora text-lg min-w-[156px] whitespace-nowrap text-white text-opacity-100 leading-none font-semibold text-center">
                    {el?.amount} BitsCoins
                  </div>
                </div>
              );
            })}
            {/* <div className="mt-10 flex flex-col justify-start items-start pt-2 pl-3.5 rounded-[20px] w-[381px] h-24 shadow-md bg-black">
              <div className="font-sora text-xs min-w-[61px] whitespace-nowrap text-white text-opacity-100 leading-none font-semibold">
                01/08/23
              </div>
              <div className="mt-2 ml-12 font-sora text-lg min-w-[251px] whitespace-nowrap text-white text-opacity-100 leading-none font-semibold">
                Java Programming Book
              </div>
              <div className="mt-1 ml-24 font-sora text-lg min-w-[156px] whitespace-nowrap text-white text-opacity-100 leading-none font-semibold">
                1200 BitsCoins
              </div>
            </div>
            <div className="mt-8 flex flex-col justify-between items-start pt-3 pb-4 pl-4 rounded-[20px] w-[381px] h-24 shadow-md bg-black">
              <div className="font-sora text-xs min-w-[61px] whitespace-nowrap text-white text-opacity-100 leading-none font-semibold">
                23/07/23
              </div>
              <div className="ml-24 flex flex-col justify-between items-center w-36 h-[52px]">
                <div className="font-sora text-lg whitespace-nowrap text-white text-opacity-100 leading-none font-semibold">
                  Lamp
                </div>
                <div className="font-sora text-lg whitespace-nowrap text-white text-opacity-100 leading-none font-semibold">
                  650 BitsCoins
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-col justify-between items-start pt-3.5 pb-4 pl-3.5 rounded-[20px] w-[381px] h-24 bg-black shadow-md">
              <div className="font-sora text-xs min-w-[61px] whitespace-nowrap text-white text-opacity-100 leading-none font-semibold">
                12/04/23
              </div>
              <div className="ml-24 flex flex-col justify-between items-center gap-1 w-[147px] h-14">
                <div className="font-sora text-lg whitespace-nowrap text-white text-opacity-100 leading-none font-semibold">
                  Curtains
                </div>
                <div className="font-sora text-lg whitespace-nowrap text-white text-opacity-100 leading-none font-semibold">
                  300 BitsCoins
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
