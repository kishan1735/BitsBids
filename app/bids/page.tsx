"use client";
import AuthCheck from "@/components/AuthCheck";
import Loader from "@/components/Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const [products, setProducts] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(
    function () {
      async function getProducts() {
        const requestBody = { search };
        setLoading(true);
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(requestBody),
        });
        const data = await res.json();
        setLoading(false);
        if (data.status == "success") {
          setProducts(data.products);
        }
      }
      getProducts();
    },
    [search]
  );
  return (
    <AuthCheck>
      <div className="flex flex-col font-sora items-center pt-10 pb-10 gap-8 w-screen h-full min-h-screen bg-black">
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
        <div className="absolute top-3.5 left-[378px] z-10 font-sora text-xl whitespace-nowrap text-white text-opacity-100 leading-none font-normal">
          &nbsp;
        </div>
        <div className="flex flex-col justify-center items-center pt-14 pr-8 pl-8 gap-12 rounded-[40px] w-[99vw] h-full bg-white min-h-[60vh] pb-10">
          {loading ? (
            <Loader></Loader>
          ) : (
            <>
              <input
                type="text"
                className="border-2 border-black py-1 px-[8vw] text-xl text-center rounded-2xl"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                {products?.map((el: any, i: any) => {
                  return (
                    <div
                      key={i}
                      className="border-2 flex flex-col justify-center space-y-2 border-slate-100 bg-black text-white rounded-xl font-sora px-[4vw] py-[4vh] items-center cursor-pointer hover:scale-105 "
                      onClick={() =>
                        router.push(`/products/${el._id.toString()}`)
                      }
                    >
                      <div className="text-2xl text-yellow-300">{el.name}</div>
                      <div className="flex text-xl space-x-2 pb-2">
                        <div className="">Current Bid :</div>
                        <div>{el.currentBid}</div>
                      </div>
                      <div className="flex text-xl space-x-2 pb-2">
                        <div className="">Base Price :</div>
                        <div>{el.basePrice}</div>
                      </div>
                      <div className="flex text-xl space-x-2 pb-2">
                        <div className="">Time :</div>
                        <div>
                          {/* {Date(el.duration[0].startTime).split("GMT")[0]} */}
                        </div>
                      </div>
                      <div className="text-xl bg-white text-black rounded-xl px-4 py-1">
                        {el.category}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </AuthCheck>
  );
}

export default Page;
