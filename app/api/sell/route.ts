import connectMongoDB from "@/lib/dbConnect";
import Current from "@/models/currentModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const data = await req.json();
    console.log(data);
    console.log(
      data?.name,
      +data.basePrice,
      data.description,
      data?.academic,
      data?.email.split("@")[0],
      +Date.now(),
      data?.time
    );
    const current = await Current.create({
      name: data?.name,
      description: data?.description,
      basePrice: +data?.basePrice,
      category: data?.academic ? "Academic" : "Non Academic",
      $push: {
        seller: { userId: data?.email.split("@")[0], randomId: +Date.now() },
        duration: { startTime: Date.now(), expirationTime: data?.time },
      },
    });
    if (!current) {
      throw new Error("Unable to create");
    }
    return NextResponse.json({ status: "success", data: current });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
