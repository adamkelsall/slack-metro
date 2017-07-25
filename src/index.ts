import "reflect-metadata";

import { Config, getConfig, setConfig } from "./config";
import { Disruption, formatDisruptions, getDisruptions, getWebPage } from "./input";
import { createSlackMessage, postToSlack, printError } from "./output";
import { PersistedLocalData, readPersistedLocalData, storeUniqueDisruption, writePersistedLocalData } from "./persist";

async function processMetroDisruptions(): Promise<void> {
  try {
    setConfig();
    const config: Config = getConfig();

    const metroPage: string = await getWebPage("https://www.nexus.org.uk/metro/updates");
    const disruptions: Cheerio = getDisruptions(metroPage);
    const formattedDisruptions: Disruption[] = formatDisruptions(disruptions);

    const persistedData: PersistedLocalData = await readPersistedLocalData();
    if (persistedData.disruptions !== disruptions.length) {
      for (const disruption of formattedDisruptions) {
        await storeUniqueDisruption(disruption);
      }

      const message = createSlackMessage(persistedData.disruptions, formattedDisruptions);
      // await postToSlack(config.slackWebhookUrl, message);
    }

    await writePersistedLocalData({
      disruptions: disruptions.length,
    });

  } catch (err) {
    printError(err);
  }
}

processMetroDisruptions();
