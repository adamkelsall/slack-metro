import * as mongoose from "mongoose";

import { Disruption as DisruptionSchema } from ".";
import { Disruption as DisruptionElement } from "../input";

interface DisruptionDocument extends mongoose.Document {
  _doc: {
    _id: any;
    createdAt: Date,
    occurrences: Date[],
    text: string;
  }
}

export async function storeUniqueDisruption(disruption: DisruptionElement): Promise<void> {
  try {
    await setupMongoose();

    const text = disruption.lines.join("\n");
    const existingDisruption = (await getDisruptionByText(text) as DisruptionDocument);

    if (existingDisruption) {
      await updateDisruption(existingDisruption);
    } else {
      await createDisruption(text);
    }

  } finally {
    await mongoose.disconnect();
  }
}

async function setupMongoose(): Promise<void> {
  (<any>mongoose).Promise = Promise;
  await mongoose.connect("localhost:27017/slack-metro");
}

async function getDisruptionByText(text: string): Promise<mongoose.Document> {
  return await DisruptionSchema.findOne({ text });
}

async function createDisruption(text: string): Promise<void> {
  const now = new Date();
  const disruption = new DisruptionSchema({
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
