import Cors from "micro-cors";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectMongoDB from "@/lib/dbConnect";
import User from "@/models/userModel";

const cors = Cors({
  allowMethods: ["POST", "GET", "HEAD"],
});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const user = await User.findOne({ email: data?.email });
    if (!user) {
      throw new Error("User not found");
    }
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            product_data: {
              name: "Wallet Payment",
            },
            currency: "inr",
            unit_amount: data.amount * 100,
          },
          quantity: 1,
        },
      ],
      client_reference_id: user?._id,
      currency: "inr",
      success_url: `${process.env.URL}/api/wallet/${data.amount.toString()}`,
      cancel_url: `${process.env.URL}/wallet`,
    };
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    return NextResponse.json({ status: "success", session: checkoutSession });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
