"use client";
import AuthCheck from "@/components/AuthCheck";
import Loader from "@/components/Loader";
import NavBar from "@/components/NavBar";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const [chat, setChat] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [buyer, setBuyer] = useState("");
  const [seller, setSeller] = useState("");
  const [messages, setMessages] = useState<any>();
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [send, setSend] = useState(false);
  const params = useParams();
  const { data: session, status } = useSession();
  useEffect(
    function () {
      async function checkType() {
        const requestBody = {
          product: params.product,
          user: session?.user?.email,
        };
        setLoading(true);
        const res = await fetch("/api/type", {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(requestBody),
        });
        const data = await res.json();
        setLoading(false);
        if (data.status == "success") {
          setType(data?.type);
        }
      }
      checkType();
    },
    [params.product, session?.user?.email]
  );
  useEffect(
    function () {
      async function getChats() {
        setLoading(true);
        const res = await fetch(
          `/api/products/${params.product}/${params.chat}`,
          { headers: { "Content-type": "application/json" } }
        );
        const data = await res.json();
        setLoading(false);

        if (data.status == "success") {
          setBuyer(data?.buyRandomId);
          setSeller(data?.sellRandomId);
          setMessages(data?.messages);
          type == "Seller" ? setTo(buyer) : setTo(seller);
          type == "Seller" ? setFrom(seller) : setFrom(buyer);
        }
      }
      getChats();
    },
    [params.chat, params.product, buyer, seller, type, send]
  );
  async function handleSend() {
    const requestBody = {
      chat,
      email: session?.user?.email,
      to: type == "Highest" || type == "Bidder" ? seller : buyer,
      from: type == "Highest" || type == "Bidder" ? buyer : seller,
    };
    console.log(requestBody);
    const res = await fetch(`/api/products/${params.product}/${params.chat}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();
    if (data.status == "success") {
    }
  }
  return (
    <AuthCheck>
      <div className="flex flex-col items-center pt-6 pb-6 gap-8 w-screen h-full min-h-screen bg-black">
        <NavBar />
        <div className="flex justify-around items-start pb-5 pt-8 pr-10 pl-[5vw] gap-16 rounded-[40px] w-[96vw] min-h-[70vh] bg-white">
          {loading ? (
            <Loader />
          ) : (
            <>
              <AuthCheck>
                <div className="w-2/3 flex flex-col space-y-4">
                  <h1 className="text-center border-2 border-slate-500 mx-8 text-2xl py-2 rounded-lg">
                    {type == "Seller" ? buyer : seller}
                  </h1>
                  <div className="min-h-[40vh] flex flex-col space-y-2 justify-end">
                    {messages?.map((el: any, i: any) => {
                      return (
                        <div
                          key={i}
                          className={`flex ${
                            params.chat == el.to
                              ? "justify-start"
                              : "justify-end"
                          } `}
                        >
                          <h1 className="bg-black text-white text-lg  px-2 py-1 rounded-xl">
                            {el.chat}
                          </h1>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex mx-8 space-x-4">
                    <input
                      type="text"
                      value={chat}
                      onChange={(e) => setChat(e.target.value)}
                      className="border-2 border-slate-200  py-2 text-center rounded-xl px-4 w-[48vw] text-xl"
                      placeholder="Send Message"
                    />
                    <button
                      className="bg-black text-white text-lg py-2 px-4 rounded-xl hover:scale-105"
                      onClick={() => {
                        handleSend();
                        setSend((is) => !is);
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </AuthCheck>
            </>
          )}
        </div>
      </div>
    </AuthCheck>
  );
}

export default Page;
