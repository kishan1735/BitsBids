"use client";
import AuthCheck from "@/components/AuthCheck";
import Loader from "@/components/Loader";
import NavBar from "@/components/NavBar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [userId, setUserId] = useState("");
  const [hostel, setHostel] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [previous, setPrevious] = useState<any>();
  const [prev, setPrev] = useState<any>();
  useEffect(
    function () {
      async function getUser() {
        const requestBody = { email: session?.user?.email };
        setLoading(true);
        const res = await fetch("/api/user/", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(requestBody),
        });
        const data = await res.json();
        setLoading(false);
        if (data.status == "success") {
          setName(data.user.name);
          setMail(data.user.email);
          setUserId(data.user.id);
          setHostel(data.user.hostel);
          setPhoneNumber(data.user.phoneNumber);
        }
      }
      getUser();
    },
    [session?.user?.email]
  );
  useEffect(
    function () {
      async function getPrevious() {
        const requestBody = { email: session?.user?.email };
        const res = await fetch("/api/previous", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(requestBody),
        });
        const data = await res.json();

        if (data.status == "success") {
          setPrevious(data?.pasts);
        }
      }
      getPrevious();
    },
    [session?.user?.email]
  );
  useEffect(
    function () {
      async function getPrevious() {
        const requestBody = { email: session?.user?.email };
        const res = await fetch("/api/previous", {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(requestBody),
        });
        const data = await res.json();

        if (data.status == "success") {
          setPrev(data?.pasts);
        }
      }
      getPrevious();
    },
    [session?.user?.email]
  );
  return (
    <>
      <AuthCheck>
        <div className="flex flex-col justify-between items-center pt-10 pb-10 gap-6 w-screen h-full min-h-screen bg-black">
          <NavBar />
          <div className="flex justify-start items-start py-10 pl-24 rounded-[40px] w-[96vw] h-full min-h-[70vh] bg-white">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="mt-[200px]"></div>
                <div className="mt-1.5 ml-3 flex flex-col justify-start items-start w-[561px] h-[615px]">
                  <div className="ml-4 font-sora text-4xl min-w-[162px] whitespace-nowrap text-black text-opacity-100 leading-none font-semibold">
                    Profile
                  </div>
                  <div className="mt-4 ml-4 font-sora text-lg min-w-[200px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium">
                    Manage your Profile
                  </div>
                  <div className="flex items-center mt-8">
                    {" "}
                    <div className=" ml-4 font-sora text-xl min-w-[173px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium">
                      Name
                    </div>
                    <div className="font-sora text-lg min-w-[335px] whitespace-nowrap text-black text-opacity-100 leading-none font-light">
                      {name}
                    </div>
                  </div>
                  <div className="flex items-center mt-8">
                    {" "}
                    <div className=" ml-4 font-sora text-xl min-w-[173px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium">
                      Email Address
                    </div>
                    <div className="font-sora text-lg min-w-[335px] whitespace-nowrap text-black text-opacity-100 leading-none font-light">
                      {mail}
                    </div>
                  </div>

                  <div className="flex items-center mt-8">
                    {" "}
                    <div className=" ml-4 font-sora text-xl min-w-[173px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium">
                      User Id
                    </div>
                    <div className="font-sora text-lg min-w-[335px] whitespace-nowrap text-black text-opacity-100 leading-none font-light">
                      {userId}
                    </div>
                  </div>
                  <div className="flex items-center mt-8">
                    {" "}
                    <div className=" ml-4 font-sora text-xl min-w-[173px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium">
                      Phone Number
                    </div>
                    <div className="font-sora text-lg min-w-[335px] whitespace-nowrap text-black text-opacity-100 leading-none font-light">
                      {phoneNumber}
                    </div>
                  </div>
                  <div className="flex items-center mt-8">
                    <div className=" ml-4 font-sora text-xl min-w-[173px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium">
                      Hostel
                    </div>
                    <div className="font-sora text-lg min-w-[335px] whitespace-nowrap text-black text-opacity-100 leading-none font-light">
                      {hostel}
                    </div>
                  </div>
                  <div className="p-6"></div>
                  <button
                    className="bg-black px-[6vw] py-3 rounded-xl text-white text-xl mx-auto hover:scale-105"
                    onClick={() => {
                      router?.push("/user/update");
                    }}
                  >
                    Update Profile
                  </button>
                </div>
                <div className="flex flex-col justify-start items-start w-[45vw] h-[25vh]">
                  <div className="mt-[136px] ml-[121px] font-sora text-xl min-w-[237px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium">
                    Previous Purchaces
                  </div>
                  <div className="mt-5"></div>
                  <div className="flex flex-col mx-auto space-y-2 py-2">
                    {prev?.map((el: any, i: any) => {
                      return (
                        <div
                          key={i}
                          className="bg-black text-white px-2 py-1 rounded-xl text-center"
                        >
                          <h1>{el.name}</h1>
                          <h1>{el.soldPrice}</h1>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-14 ml-[122px] font-sora text-xl min-w-[131px] whitespace-nowrap text-black text-opacity-100 leading-none font-medium">
                    Items Sold
                  </div>
                  <div className="mt-5"></div>
                  <div className="flex flex-col mx-auto space-y-2 py-2">
                    {previous?.map((el: any, i: any) => {
                      return (
                        <div
                          key={i}
                          className="bg-black text-white px-2 py-1 rounded-xl text-center"
                        >
                          <h1>{el.name}</h1>
                          <h1>{el.soldPrice}</h1>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </AuthCheck>
    </>
  );
}

export default Page;
