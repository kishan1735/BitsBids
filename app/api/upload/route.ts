import File from "@/models/fileModel";
import "@/utils/firebase.config";
import { uploadFile } from "@/utils/firebase.config";
// import { uploadFile, deleteFile } from "@/utils/firebase.config";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      throw new Error("File not found");
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const formattedDate = Date.now();

    await uploadFile(buffer, file.type.split("/")[1], formattedDate);
    await File.create({});
    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    return NextResponse.json({ status: "failed" });
  }
}
