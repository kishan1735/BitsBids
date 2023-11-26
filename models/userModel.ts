import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

type transaction = {
  amount: Number;
  time: Date;
  for: String;
};
export interface Users extends mongoose.Document {
  name: string;
  email: string;
  role: string;
  password: string;
  id: string;
  phoneNumber: number;
  bitscoins: number;
  transactionHistory: Array<transaction>;
  hostel: string;
  createdAt: Date;
  passwordChangedAt: Date;
  profilePicture: string;
  chats: {
    id: String;
  };
}
const transactionSchema = new mongoose.Schema({
  amount: Number,
  time: { type: Date, default: Date.now() },
  for: String,
});
const userSchema = new mongoose.Schema<Users>({
  name: { type: String, required: [true, "You must provide a name"] },
  id: { type: String, required: [true, "You must provide an id"] },
  email: {
    type: String,
    required: [true, "You must provide an email"],
    validate: [validator.isEmail, "Provide a valid email"],
    lowercase: true,
  },
  phoneNumber: {
    type: Number,
  },
  hostel: String,
  password: {
    type: String,
    select: false,
    minLength: 8,
  },

  bitscoins: { type: Number, default: 0 },
  transactionHistory: { type: [transactionSchema], default: [] },

  createdAt: { type: Date, default: Date.now() },
  passwordChangedAt: { type: Date, default: null },
  profilePicture: { type: String, default: "Default Image Link Goes Here" },
  chats: { id: { type: String } },
});

// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (!user.isModified) return next();
//   if (!user.password) return next();
//   user.password = await bcrypt.hash(user.password, 12);
// });

// userSchema.methods.correctPassword = async function (
//   candidatePassword: string,
//   userPassword: string
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
