import { model, Schema } from "mongoose";

export const Disruption = model("disruption", new Schema({
  text: String,
  occurrences: [Date],
}));
