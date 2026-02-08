import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "author"], default: "user" },
    testsCreated: { type: [Schema.Types.ObjectId], ref: "Test" },
    testsTaken: { type: [Schema.Types.ObjectId], ref: "TestStats" },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
