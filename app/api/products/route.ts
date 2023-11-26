import connectMongoDB from "@/lib/dbConnect";
import Current from "@/models/currentModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const data = await req.json();
    console.log(data);
    let products;
    if (data.search != "") {
      products = await Current.find({
        $or: [
          { name: { $regex: data.search } },
          { category: data.search },
          { description: { $regex: data.search } },
        ],
      });
    } else products = await Current.find();
    if (!products) {
      throw new Error("No Product found");
    }
    return NextResponse.json({ status: "success", products });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
