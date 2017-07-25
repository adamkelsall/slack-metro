import * as mongoose from "mongoose";

import { Disruption } from ".";

export async function storeUniqueDisruption(text: string): Promise<void> {
  await setupMongoose();

  const existingDisruption = await getDisruptionByText(text);

  if (existingDisruption) {
    console.log(Object.keys(existingDisruption));
    console.log(existingDisruption["_doc"]);
    console.log(existingDisruption["_doc"].occurrences);
  }
}

async function setupMongoose(): Promise<void> {
  (<any>mongoose).Promise = Promise;
  await mongoose.connect("localhost:27017/slack-metro");
}

async function getDisruptionByText(text: string): Promise<mongoose.Document> {
  return await Disruption.findOne({ text });
}
