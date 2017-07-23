import "reflect-metadata";

import { Config, getConfig, setConfig } from "./config";
import { getDisruptions, getWebPage } from "./input";
import { createSlackMessage, postToSlack, printError } from "./output";
import { PersistedData, readPersistedData, writePersistedData } from "./persist";

async function processMetroDisruptions(): Promise<void> {
  try {
    setConfig();
    const config: Config = getConfig();

    const metroPage: string = await getWebPage("https://www.nexus.org.uk/metro/updates");
    const disruptions: Cheerio = getDisruptions(metroPage);

    const persistedData: PersistedData = await readPersistedData();
    if (!persistedData.lastWasDisruption && disruptions.length) {
      const message = createSlackMessage(disruptions);
      await postToSlack(config.slackWebhookUrl, message);
    }

    await writePersistedData({
      lastWasDisruption: Boolean(disruptions.length),
    });

  } catch (err) {
    printError(err);
  }
}

processMetroDisruptions();
