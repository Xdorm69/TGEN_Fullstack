import mongoose from "mongoose";
const { Schema } = mongoose;

const TestStatsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  test: { type: Schema.Types.ObjectId, ref: "Test", required: true },
  score: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  timeTaken: { type: Number, required: true },
  wrongAttempts: {
    type: [Schema.Types.ObjectId],
    ref: "Question",
    required: true,
  },
});

export const TestStats = mongoose.model("TestStats", TestStatsSchema);
