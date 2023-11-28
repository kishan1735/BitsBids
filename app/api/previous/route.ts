import connectMongoDB from "@/lib/dbConnect";
import PastBids from "@/models/pastBids";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const user = await User.findOne({ email: data?.email });
    if (!user) {
      throw new Error("User Not Found");
    }
    const pasts = await PastBids.find({ seller: user.id });
    return NextResponse.json({ status: "success", pasts });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const user = await User.findOne({ email: data?.email });
    if (!user) {
      throw new Error("User Not Found");
    }
    const pasts = await PastBids.find({ buyer: user._id.toString() });
    return NextResponse.json({ status: "success", pasts });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
