import mongoose from "mongoose";

interface Past extends mongoose.Document {
  name: string;
  soldPrice: number;
  category: string;
  picture: string;
  duration: Array<Object>;
  seller: string;
  buyer: string;
}
const durationSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

const pastSchema = new mongoose.Schema<Past>({
  name: { type: String, required: true },
  soldPrice: { type: Number, required: true },
  picture: { type: String, default: "Default Image Goes here" },
  seller: { type: String, required: true },
  buyer: { type: String, required: true },
});

const PastBids =
  mongoose.models.PastBids || mongoose.model("PastBids", pastSchema);

export default PastBids;
