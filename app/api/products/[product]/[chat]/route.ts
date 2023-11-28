import connectMongoDB from "@/lib/dbConnect";
import Chat from "@/models/chatModel";
import Current from "@/models/currentModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: any }) {
  try {
    await connectMongoDB();
    const chat = await Chat.findOne({
      productId: params.product,
      buyer: params.chat,
    });
    if (!chat) {
      throw new Error("Chat not found");
    }
    return NextResponse.json({
      status: "success",
      buyRandomId: chat.buyRandomId,
      sellRandomId: chat.sellRandomId,
      messages: chat.messages,
    });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}

export async function POST(req: Request, { params }: { params: any }) {
  try {
    const data = await req.json();
    const user = await User.findOne({ email: data?.email });
    console.log(params.product, `${params.chat}/hello`);
    let chatRoom = await Chat.findOne({
      productId: params.product,
      buyer: params.chat,
    });

    const current = await Current.findById(params.product);

    const buyer = current.bidders.filter(
      (el: any) => el.userId == params?.chat?.toString()
    )[0].randomId;

    if (!chatRoom) {
      chatRoom = await Chat.create({
        productId: data?.product,
        buyer: params.chat.toString(),
        seller: current?.seller[0].userId,
        sellRandomId: current?.seller[0].randomId,
        buyRandomId: buyer,
      });
      if (!chatRoom) {
        throw new Error("Chat can't be created or found");
      }
    }

    return NextResponse.json({ status: "success", chatRoom });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}

export async function PATCH(req: Request, { params }: { params: any }) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const chat = await Chat.findOne({
      productId: params?.product,
      buyer: params?.chat,
    });
    const sender = data?.from == chat.buyRandomId ? chat.buyer : chat.seller;
    const receiver = data?.to == chat.buyRandomId ? chat.buyer : chat.seller;
    const chatRoom = await Chat.findOneAndUpdate(
      {
        productId: params?.product,
        buyer: params?.chat,
      },
      {
        $push: {
          messages: {
            to: receiver,
            from: sender,
            time: Date.now(),
            chat: data?.chat,
          },
        },
      }
    );
    if (!chatRoom) {
      throw new Error("Chat Not Updated");
    }
    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", messgae: err.message });
  }
}
