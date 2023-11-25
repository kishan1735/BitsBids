import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/models/userModel";
import Pay from "@/models/paySchema";
import connectMongoDB from "@/lib/dbConnect";

export async function GET(req: Request, { params }: { params: any }) {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    let user = await User.findOne({ email: session?.user?.email });
    const pay = await Pay.create({
      amount: +params.amount,
      buyerId: user._id.toString(),
      time: Date.now(),
    });
    if (!user) {
      throw new Error("User not found");
    }
    user = await User.findByIdAndUpdate(user._id, {
      bitscoins: user.bitscoins + Number(params.amount),
      $push: {
        transactionHistory: {
          for: "wallet",
          amount: +params.amount,
          time: Date.now(),
        },
      },
    });
    return NextResponse.redirect(`${process.env.URL}/wallet`);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
