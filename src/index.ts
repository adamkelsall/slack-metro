import "reflect-metadata";

import { formatDisruption, getDisruptions, getWebPage } from "./input";

async function processMetroDisruptions(): Promise<void> {
  const url = "https://www.nexus.org.uk/metro/updates";
  const body = await getWebPage(url);

  const disruptions = getDisruptions(body);
  disruptions.each((index, disruption) => {
    console.log(formatDisruption(disruption));
  });
}

processMetroDisruptions();
