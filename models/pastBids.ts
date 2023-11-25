import mongoose from "mongoose";

interface Past extends mongoose.Document {
  product: {
    name: string;
    soldPrice: number;
    category: string;
    picture: string;
    duration: Array<Object>;
    seller: string;
    buyer: string;
  };
}
const durationSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

const pastSchema = new mongoose.Schema<Past>({
  product: {
    name: { type: String, required: true },
    soldPrice: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Electronics", "Books", "Sports", "Other"],
      required: true,
    },
    picture: { type: String, default: "Default Image Goes here" },
    duration: { type: [durationSchema], default: [] },
    seller: { type: String, required: true },
    buyer: { type: String, required: true },
  },
});

const PastBids =
  mongoose.models.PastBids || mongoose.model("PastBids", pastSchema);

export default PastBids;
