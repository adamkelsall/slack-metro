import * as moment from "moment-timezone";
import { Moment } from "moment-timezone";

import { SlackMessage, SlackMessageAttachment } from ".";
import { Disruption, formatDisruption } from "../input";

export function createSlackMessage(disruptions: Cheerio): SlackMessage {
  const formattedDisruptions: Disruption[] = [];

  disruptions.each((index, disruption) => {
    formattedDisruptions.push(formatDisruption(disruption));
  });

  const message: SlackMessage = {
    attachments: formattedDisruptions.map((disruption, index) => {
      const lines = disruption.lines.join("\n");
      const updated: Moment = moment(disruption.updated);
      const time: string = updated.format("H:mma");
      const date: string = updated.format("dddd Do MMMM");

      const attachment: SlackMessageAttachment = {
        mrkdwn_in: ["text"],
        text: `${lines}\n_Updated at ${time} on ${date}_`,
        title: `Disruption ${index + 1}`,
      };

      return attachment;
    }),
    text: "One or more disruptions have been detected following a period where there were none :frowning:",
  };

  return message;
}
