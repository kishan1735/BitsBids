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
  useEffect(
    function () {
      async function getUser() {
        const requestBody = { email: session?.user?.email };
        setLoading(true);
        const res = await fetch("/api/user", {
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
              </>
            )}
          </div>
        </div>
      </AuthCheck>
    </>
  );
}

export default Page;
