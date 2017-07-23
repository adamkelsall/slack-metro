import "reflect-metadata";

import { Config, getConfig, setConfig } from "./config";
import { formatDisruption, getDisruptions, getWebPage } from "./input";
import { printError } from "./output";

async function processMetroDisruptions(): Promise<void> {
  try {
    setConfig();
    const config: Config = getConfig();

    const metroPage: string = await getWebPage("https://www.nexus.org.uk/metro/updates");
    const disruptions: Cheerio = getDisruptions(metroPage);

    console.log(disruptions.length);

  } catch (err) {
    printError(err);
  }
}

processMetroDisruptions();
