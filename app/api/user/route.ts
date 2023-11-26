import connectMongoDB from "@/lib/dbConnect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const user = await User.findOne({ email: data?.email });
    if (!user) {
      throw new Error("User not found");
    }
    return NextResponse.json({ status: "success", user });
  } catch (err: any) {
    console.log(err);

    return NextResponse.json({ status: "failed", message: err.message });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const user = await User.findOneAndUpdate(
      { email: data?.email },
      { name: data?.name, phoneNumber: data?.phoneNumber, hostel: data?.hostel }
    );
    if (!user) {
      throw new Error("User not found");
    }
    return NextResponse.json({ status: "success", user });
  } catch (err: any) {
    console.log(err);

    return NextResponse.json({ status: "failed", message: err.message });
  }
}
