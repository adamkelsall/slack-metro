import * as mongoose from "mongoose";

import { Disruption } from ".";

interface DisruptionDocument extends mongoose.Document {
  _doc: {
    _id: any;
    createdAt: Date,
    occurrences: Date[],
    text: string;
  }
}

export async function storeUniqueDisruption(text: string): Promise<void> {
  await setupMongoose();

  const existingDisruption = (await getDisruptionByText(text) as DisruptionDocument);

  if (existingDisruption) {
    await updateDisruption(existingDisruption);
  } else {
    await createDisruption(text);
  }
}

async function setupMongoose(): Promise<void> {
  (<any>mongoose).Promise = Promise;
  await mongoose.connect("localhost:27017/slack-metro");
}

async function getDisruptionByText(text: string): Promise<mongoose.Document> {
  return await Disruption.findOne({ text });
}

async function createDisruption(text: string): Promise<void> {
  const now = new Date();
  const disruption = new Disruption({
    createdAt: now,
    occurrences: [now],
    text,
  });

  await disruption.save();
}

async function updateDisruption(disruption: DisruptionDocument): Promise<void> {
  disruption._doc.occurrences.push(new Date());
  await disruption.save();
}
