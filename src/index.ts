import "reflect-metadata";

import { postToSlack } from "./output";

postToSlack(
  "https://hooks.slack.com/services/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",
  {
    channel: "@adamkelsall",
    text: "TypeScript Slack message text",
  }
);
