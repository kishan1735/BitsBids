"use client";

import { signIn, useSession } from "next-auth/react";
import NavBar from "./NavBar";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  console.log(process.env.URL);
  const { data: session, status } = useSession();
  if (status == "authenticated") {
    return <>{children}</>;
  }
  // else if (status == "loading") {
  //     return (
  //       <div className="flex flex-col font-sora items-center pt-10 pb-10 gap-8 w-screen h-full min-h-screen bg-black">
  //         <NavBar />
  //         <h1 className="text-primary text-4xl ">Loading...</h1>
  //       </div>
  //     );
  //   }
  else {
    return (
      <div className="flex flex-col font-sora justify-center items-center pt-10 pb-10 gap-8 w-screen h-full min-h-screen bg-black">
        <h1 className="text-primary text-6xl text-white">Login for access</h1>
        <button
          className="bg-primary border-2 border-primary  py-[4vh] px-[5vh] hover:bg-black hover:border-2 hover:border-primary hover:text-primary text-4xl text-white"
          onClick={() =>
            signIn(
              "google",
              { callbackUrl: `${process.env.URL}` },
              { prompt: "login" }
            )
          }
        >
          Sign In
        </button>
      </div>
    );
  }
}
