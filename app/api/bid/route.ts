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
    let bidder;
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
    if (data?.bid > current.currentBid && data?.bid > current.basePrice) {
      try {
        old = await User.findById(current.currentBidder[0].userId);
        coins = old.bitscoins + current.currentBid;
        const older = await User.findByIdAndUpdate(old._id, {
          bitscoins: coins,
        });
      } catch (err: any) {}
      try {
        bidder = current?.bidders?.filter((el: any) => {
          el.userId == user._id.toString();
        })[0];
        console.log(bidder);
        current = await Current.findByIdAndUpdate(data?.product, {
          $pull: { currentBidder: { userId: old._id } },
        });
      } catch (err: any) {}
      current = await Current.findByIdAndUpdate(data?.product, {
        currentBid: +data?.bid,

        $push: {
          currentBidder: {
            userId: user._id,
            randomId: bidder
              ? bidder.randomId
              : `${characterName}` + `${Date.now()}`,
            bidPrice: +data?.bid,
          },
        },
      });
      current = await Current.findById(data?.product);
      if (!bidder) {
        console.log(
          current.currentBidder[0].randomId,
          data?.product,
          user._id.toString()
        );
        const current1 = await Current.findById(data?.product);
        // console.log(current1);
        const current2 = await Current.findByIdAndUpdate(data?.product, {
          $push: {
            bidders: {
              userId: user._id.toString(),
              randomId: current1.currentBidder[0].randomId.toString(),
            },
          },
        });
        console.log(current2);
      }

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
