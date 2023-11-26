import connectMongoDB from "@/lib/dbConnect";
import Current from "@/models/currentModel";
import { NextResponse } from "next/server";
import { uniqueNamesGenerator, Config, names } from "unique-names-generator";

const config: Config = {
  dictionaries: [names],
};

export async function POST(req: Request) {
  const characterName: string = uniqueNamesGenerator(config);
  try {
    await connectMongoDB();
    const data = await req.json();
    let current = await Current.create({
      name: data?.name,
      description: data?.description,
      basePrice: +data?.basePrice,
      category: data?.academic ? "Academic" : "Non Academic",
    });
    current = await Current.findByIdAndUpdate(current._id, {
      $push: {
        seller: {
          userId: data?.email.split("@")[0],
          randomId: characterName + `${+Date.now()}`,
        },
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
