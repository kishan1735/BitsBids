"use client";
import NavBar from "@/components/NavBar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const params = useParams();
  const [product, setProduct] = useState<any>({});
  useEffect(
    function () {
      async function getProduct() {
        const res = await fetch(`/api/products/${params.product}`);
        const data = await res.json();
        if (data.status == "success") {
          setProduct(data.product);
        }
      }
      getProduct();
    },
    [params.product]
  );
  return (
    <div>
      <div className="flex flex-col font-sora items-center pt-10 pb-10 gap-8 w-screen h-full min-h-screen bg-black">
        <NavBar />
        <div className="flex justify-between items-start pt-[116px] pr-10 pl-[5vw] gap-16 rounded-[40px] w-[96vw] min-h-[60vh] bg-white">
          <div className="flex flex-col justify-between items-center gap-8 w-[407px] h-[516px]">
            <div className="flex flex-col justify-center items-center rounded-[20px] w-[407px] h-[469px] shadow-md bg-white">
              <img
                src="/images/Product2.png"
                alt="Image Asset 2"
                width="369.7px"
                height="256.1px"
              />
            </div>
            <div className="flex justify-between items-center gap-3 w-[61px] h-3"></div>
          </div>
          <div className="mt-3 flex flex-col justify-start items-center w-[50vw] h-[462px]">
            <div className="flex flex-row justify-center items-center gap-2.5 pt-2.5 pr-2.5 pb-2.5 pl-2.5 rounded-lg h-12 min-w-[122px]">
              <div className="font-sora text-xl min-w-[102px] whitespace-nowrap text-neutral-900 text-opacity-100 leading-none font-bold">
                LIVE BID
              </div>
            </div>
            <div className="mt-5 font-sora text-3xl whitespace-nowrap text-black text-opacity-100 leading-none font-bold">
              {product?.name}
            </div>
            <div className="mt-5 font-sora text-xl whitespace-nowrap text-red-400 text-opacity-100 leading-none font-bold">
              Base Price {product?.basePrice}
            </div>
            <div className="mt-5 font-sora text-2xl whitespace-nowrap text-red-500 text-opacity-100 leading-none font-bold">
              Current Bid Rs.1200
            </div>
            <div className="mt-1 font-sora text-xl  text-black text-opacity-100 leading-none font-normal">
              <span className="font-semibold">
                &nbsp;
                <br />
              </span>
              {product?.description}
            </div>
            <div className="mt-[4vh] rotate-0"></div>
            <button className="mt-8 flex justify-center items-center rounded-[20px]  h-[74px] px-[6vw] bg-stone-900 hover:scale-105">
              <div className="font-sora text-xl  whitespace-nowrap text-white text-opacity-100 leading-none font-bold">
                Place New Bid
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
