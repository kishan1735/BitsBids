import connectMongoDB from "@/lib/dbConnect";
import Chat from "@/models/chatModel";
import Current from "@/models/currentModel";
import PastBids from "@/models/pastBids";
import User from "@/models/userModel";
import { sendMail } from "@/utils/nodemailer";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: any }) {
  try {
    await connectMongoDB();
    const product = await Current.findById(params.product);
    if (!product) {
      throw new Error("Product not found");
    }
    return NextResponse.json({ status: "success", product });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}

export async function POST(req: Request, { params }: { params: any }) {
  try {
    await connectMongoDB();
    const data = await req.json();
    let product = await Current.findById(params.product);
    console.log(product);
    const past = await PastBids.create({
      name: product?.name,
      buyer: product?.currentBidder[0]?.userId,
      soldPrice: product?.currentBid,
      picture: product?.picture,
      seller: product?.seller[0]?.userId,
    });
    console.log(past);
    const buyer = await User.findByIdAndUpdate(
      product.currentBidder[0].userId,
      {
        $push: {
          transactionHistory: {
            for: product?.name,
            amount: -product?.currentBid,
            time: Date.now(),
          },
        },
      }
    );
    const seller = await User.findOneAndUpdate(
      {
        id: product?.seller[0]?.userId,
      },
      {
        $push: {
          transactionHistory: {
            for: product?.name,
            amount: +product?.currentBid,
            time: Date.now(),
          },
        },
      }
    );
    console.log(buyer?.email, seller?.email);
    let mailOptions1 = {
      email: buyer?.email,
      subject: "Successfully Purchased",
      html: `<div>
      <h1>You have successfully bought it from ${seller.email}</h1>
      <h2>Contact Details</h2>
      <p>Phone Number:${seller?.phoneNumber}</p>
      <p>Hostel:${seller?.hostel}</p>
      </div>`,
    };
    console.log(mailOptions1);
    let mailOptions2 = {
      email: seller?.email,
      subject: "Successfully Sold",
      html: `<div>
      <h1>You have successfully sold it to ${seller.email}</h1>
      <h2>Contact Details</h2>
      <p>Phone Number:${buyer?.phoneNumber}</p>
      <p>Hostel:${buyer?.hostel}</p>
      </div>`,
    };
    console.log(mailOptions2);
    await sendMail(mailOptions1);
    await sendMail(mailOptions2);
    const current = await Current.deleteOne({
      _id: params.product,
    });
    const chatRoom = await Chat.deleteMany({ productId: params.product });
    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
