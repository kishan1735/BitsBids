import connectMongoDB from "@/lib/dbConnect";
import Current from "@/models/currentModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const current = await Current.findById(data?.product);

    console.log(data);
    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
