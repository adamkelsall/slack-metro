import { model, Schema } from "mongoose";

export const Disruption = model("disruption", new Schema({
  createdAt: Date,
  occurrences: [Date],
  text: String,
}));
