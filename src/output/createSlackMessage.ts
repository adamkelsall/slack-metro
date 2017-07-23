import * as moment from "moment-timezone";
import { Moment } from "moment-timezone";
import * as pluralize from "pluralize";

import { SlackMessage, SlackMessageAttachment } from ".";
import { Disruption, formatDisruption } from "../input";

export function createSlackMessage(previousCount: number, disruptions: Cheerio): SlackMessage {
  const message: SlackMessage = {
    channel: "@adamkelsall", // TODO remove
    text: textForCount(previousCount, disruptions.length),
  };

  if (disruptions.length) {
    const formattedDisruptions: Disruption[] = [];

    disruptions.each((index, disruption) => {
      formattedDisruptions.push(formatDisruption(disruption));
    });

    message.attachments = formattedDisruptions.map((disruption, index) => {
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
    });
  };

  return message;
}

function textForCount(previousCount: number, count: number): string {
  if (!count) {
    return `There are no longer any disruptions! ${emojiForCount(count)}`;
  }

  const pluralAre = pluralize("is", count);
  const pluralDisruption = pluralize("disruption", count);
  const direction = previousCount < count ? "up" : "down";
  const emoji = emojiForCount(count);

  return `There ${pluralAre} now ${count} ${pluralDisruption}, ${direction} from ${previousCount} ${emoji}`;
}

function emojiForCount(count: number): string {
  const emojis = [
    ":smile: :tada:",
    ":worried:",
    ":anguished:",
    ":persevere:",
    ":cold_sweat:",
    ":scream:",
    ":upside_down_face:",
  ];

  return count > 5 ? emojis[6] : emojis[count];
}
