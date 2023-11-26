import connectMongoDB from "@/lib/dbConnect";
import Current from "@/models/currentModel";
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
