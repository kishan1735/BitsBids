import connectMongoDB from "@/lib/dbConnect";
import Current from "@/models/currentModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    await connectMongoDB();
    const data = await req.json();

    const user = await User.findOne({ email: data?.user });
    if (!user) {
      throw new Error("User Not Found");
    }
    const current = await Current.findById(data?.product);
    if (current.seller[0].userId == user.id) {
      return NextResponse.json({ status: "success", type: "Seller" });
    } else if (current.currentBidder == user.id) {
      return NextResponse.json({ status: "success", type: "Highest" });
    }
    if (!current) {
      throw new Error("Product not found");
    }
    return NextResponse.json({ status: "success", type: "Yet To Bid" });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
