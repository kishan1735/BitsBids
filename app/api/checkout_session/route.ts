import Cors from "micro-cors";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectMongoDB from "@/lib/dbConnect";

const cors = Cors({
  allowMethods: ["POST", "GET", "HEAD"],
});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const data = req.json();
    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
