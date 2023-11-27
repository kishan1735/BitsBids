import connectMongoDB from "@/lib/dbConnect";
import Current from "@/models/currentModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { uniqueNamesGenerator, Config, names } from "unique-names-generator";

const config: Config = {
  dictionaries: [names],
};

export async function POST(req: Request) {
  try {
    let coins;
    let old;
    await connectMongoDB();
    const data = await req.json();
    let current = await Current.findById(data?.product);
    if (!current) {
      throw new Error("Product not found");
    }
    let user = await User.findOne({ email: data?.email });
    if (!user) {
      throw new Error("User not found");
    }
    const characterName: string = uniqueNamesGenerator(config);
    if (data?.bid > current.currentBid) {
      try {
        old = await User.findById(current.currentBidder[0].userId);
        coins = old.bitscoins + current.currentBid;
        const older = await User.findByIdAndUpdate(old._id, {
          bitscoins: coins,
        });
      } catch (err: any) {}
      try {
        current = await Current.findByIdAndUpdate(data?.product, {
          $pull: { currentBidder: { userId: old._id } },
        });
      } catch (err: any) {}
      current = await Current.findByIdAndUpdate(data?.product, {
        currentBid: +data?.bid,

        $push: {
          currentBidder: {
            userId: user._id,
            randomId: `${characterName}` + `${Date.now()}`,
            bidPrice: +data?.bid,
          },
          bidders: {
            userId: user._id,
            randomId: `${characterName}` + `${Date.now()}`,
          },
        },
      });

      user = await User.findByIdAndUpdate(user._id, {
        bitscoins: coins - data?.bid,
      });
      if (!current) {
        throw new Error("Product not Found");
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
