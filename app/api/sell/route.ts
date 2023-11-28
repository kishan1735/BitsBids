import connectMongoDB from "@/lib/dbConnect";
import Current from "@/models/currentModel";
import File from "@/models/fileModel";
import "@/utils/firebase.config";
import { uploadFile } from "@/utils/firebase.config";
// import { uploadFile, deleteFile } from "@/utils/firebase.config";

import { NextRequest, NextResponse } from "next/server";
import { Config, names, uniqueNamesGenerator } from "unique-names-generator";

const config: Config = {
  dictionaries: [names],
};

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    const characterName: string = uniqueNamesGenerator(config);
    const data = await request.formData();
    const basePrice: any = data?.get("basePrice");
    const email: any = data?.get("email");
    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      throw new Error("File not found");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const formattedDate = Date.now();

    await uploadFile(buffer, file.type.split("/")[1], formattedDate);

    let current = await Current.create({
      name: data?.get("name"),
      description: data?.get("description"),
      basePrice,
      category: data?.get("academic") ? "Academic" : "Non Academic",
      picture: `${formattedDate}.${file.type.split("/")[1]}`,
    });
    current = await Current.findByIdAndUpdate(current._id, {
      $push: {
        seller: {
          userId: email?.split("@")[0],
          randomId: characterName + `${+Date.now()}`,
        },
        duration: { startTime: Date.now(), expirationTime: data.get("time") },
      },
    });
    if (!current) {
      throw new Error("Unable to create");
    }
    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    return NextResponse.json({ status: "failed" });
  }
}
