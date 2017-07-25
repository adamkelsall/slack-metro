import * as mongoose from "mongoose";

import { Disruption } from ".";

(<any>mongoose).Promise = Promise;

// export async function storeUniqueDisruption() {
  
// }

export async function getDisruptionByText(text: string) {
  return await Disruption.findOne({ text })
}
