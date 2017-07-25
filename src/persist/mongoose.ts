import * as mongoose from "mongoose";

import { Disruption } from ".";

interface DisruptionDocument extends mongoose.Document {
  _doc: {
    _id: any;
    occurrences: Date[],
    text: string;
  }
}

export async function storeUniqueDisruption(text: string): Promise<void> {
  await setupMongoose();

  const existingDisruption = (await getDisruptionByText(text) as DisruptionDocument);

  if (existingDisruption) {
    existingDisruption._doc.occurrences.push(new Date());
    await existingDisruption.save();
  }
}

async function setupMongoose(): Promise<void> {
  (<any>mongoose).Promise = Promise;
  await mongoose.connect("localhost:27017/slack-metro");
}

async function getDisruptionByText(text: string): Promise<mongoose.Document> {
  return await Disruption.findOne({ text });
}
