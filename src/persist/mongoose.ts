import * as mongoose from "mongoose";

import { Disruption } from ".";

// export async function storeUniqueDisruption() {
  
// }

export async function getDisruptionByText(text: string) {
  (<any>mongoose).Promise = Promise;
  await mongoose.connect("localhost:27017/slack-metro");

  return await Disruption.findOne({ text })
}
