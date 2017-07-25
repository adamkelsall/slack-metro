import "reflect-metadata";

import { Config, getConfig, setConfig } from "./config";
import { getDisruptions, getWebPage } from "./input";
import { createSlackMessage, postToSlack, printError } from "./output";
import { PersistedLocalData, readPersistedLocalData, writePersistedLocalData } from "./persist";

// TODO temp
import { getDisruptionByText } from "./persist";

async function processMetroDisruptions(): Promise<void> {
  try {
    // setConfig();
    // const config: Config = getConfig();

    // const metroPage: string = await getWebPage("https://www.nexus.org.uk/metro/updates");
    // const disruptions: Cheerio = getDisruptions(metroPage);

    // const persistedData: PersistedLocalData = await readPersistedLocalData();
    // if (persistedData.disruptions !== disruptions.length) {
    //   const message = createSlackMessage(persistedData.disruptions, disruptions);
    //   await postToSlack(config.slackWebhookUrl, message);
    // }

    // await writePersistedLocalData({
    //   disruptions: disruptions.length,
    // });

    const disruption = await getDisruptionByText("foo");
    console.dir(disruption);
    console.log(typeof disruption);

  } catch (err) {
    printError(err);
  }
}

processMetroDisruptions();
