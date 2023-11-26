import mongoose from "mongoose";
type prevBidders = {
  person: {
    userId: string;
    randomId: string;
    bidPrice: number;
  };
};
interface Current extends mongoose.Document {
  description: string;
  basePrice: number;
  category: string | any;
  picture: string;
  name: string;
  duration: Array<object>;
  seller: Array<Object>;
  bidders: Array<Object>;
  currentBid: number;
  currentBidder: string;
}
const durationSchema = new mongoose.Schema({
  startTime: { type: Date, default: Date.now() },
  expirationTime: { type: Number, default: 2 },
});

const sellerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  randomId: { type: String, required: true },
});

const currentBidderSchema = new mongoose.Schema({
  userId: { type: String, default: "" },
  randomId: { type: String, default: "" },
  bidPrice: { type: Number, default: 0 },
});

const bidderSchema = new mongoose.Schema({
  currentBidder: { type: [currentBidderSchema], default: [] },
  prevBidders: { type: Array<prevBidders> },
});

const currentSchema = new mongoose.Schema<Current>({
  name: { type: String, required: [true, "You have to provide a name"] },
  description: { type: String, maxLength: 500 },
  basePrice: {
    type: Number,
    required: [true, "You have to provide a base price"],
  },
  category: {
    type: String,
    enum: ["Academic", "Non Academic"],
    default: [],
    required: [true, "You have to specify a category"],
  },
  picture: { type: String, default: "Default Image Goes here" },
  duration: { type: [durationSchema], default: [] },
  seller: { type: [sellerSchema], default: [] },
  bidders: { type: [bidderSchema], default: [] },
  currentBid: { type: Number, default: 0 },
  currentBidder: { type: String, default: "" },
});

const Current =
  mongoose.models.Current || mongoose.model("Current", currentSchema);

export default Current;
