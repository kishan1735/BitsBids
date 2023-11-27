import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  producId: {
    type: String,
  },
  file: {
    type: String,
    default: [],
  },
  fileName: {
    type: String,
    default: [],
  },
});

const File = mongoose.models.File || mongoose.model("File", fileSchema);

export default File;
