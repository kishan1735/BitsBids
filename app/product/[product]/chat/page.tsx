"use client";
import AuthCheck from "@/components/AuthCheck";
import NavBar from "@/components/NavBar";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>({});
  const [type, setType] = useState("");
  const [user, setUser] = useState("");
  useEffect(
    function () {
      async function getProduct() {
        setLoading(true);
        const res = await fetch(`/api/products/${params.product}`, {
          headers: { "Content-type": "application/json" },
        });
        const data = await res.json();

        setLoading(false);
        if (data.status == "success") {
          setProduct(data.product);
        }
      }
      getProduct();
    },
    [params.product]
  );

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

  async function handleChatRoom(userId: any) {
    const requestBody1 = { email: session?.user?.email };

    // const res1 = await fetch("/api/user", {
    //   method: "POST",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify(requestBody1),
    // });
    // const data1 = await res1.json();
    // if (data1.status == "success") {
    //   setUser(data1?.user?._id.toString());
    // }

    const requestBody2 = {
      email: session?.user?.email,
      product: params.product,
    };

    try {
      const res2 = await fetch(`/api/products/${params.product}/${userId}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(requestBody2),
      });
      const data2 = await res2.json();
      setLoading(false);
      if (data2.status == "success") {
        if (type == "Seller") {
          router.push(`/products/${params.product}/${userId}`);
        }
      }
    } catch (err: any) {
      setLoading(false);
      console.log(err.message);
    }
  }
  return (
    <AuthCheck>
      <div className="flex flex-col items-center pt-6 pb-6 gap-8 w-screen h-full min-h-screen bg-black">
        <NavBar />
        <div className="flex flex-col justify-start items-center pb-5 pt-10 pr-10 pl-[5vw] rounded-[40px] w-[60vw] min-h-[70vh] bg-white">
          <h1 className="text-2xl text-center w-[45vw] bg-black text-white py-3 rounded-t-xl">
            Chats
          </h1>
          <div className="flex flex-col w-[45vw] text-center">
            {product?.bidders?.map((el: any, i: any) => {
              return (
                <div
                  key={i}
                  className="text-xl border-x-2 border-b-2 border-black hover:bg-black hover:text-white py-2 cursor-pointer"
                  onClick={() =>
                    // router.push(
                    //   `products/${product?._id.toString()}/${el.userId}`
                    // )
                    {
                      console.log(el.userId);
                      handleChatRoom(el.userId);
                    }
                  }
                >
                  {el.randomId}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AuthCheck>
  );
}

export default Page;
