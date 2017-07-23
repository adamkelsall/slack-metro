import * as request from "request";

export interface SlackMessage {
  attachments?: SlackMessageAttachment[];
  channel?: string;
  icon_emoji?: string;
  icon_url?: string;
  mrkdwn?: boolean;
  text: string;
  username?: string;
}

export interface SlackMessageAttachment {
  color?: string;
  mrkdwn_in?: SlackMarkdownIn[];
  pretext?: string;
  text: string;
  title?: string;
  title_link?: string;
}

type SlackMarkdownIn = "pretext" | "text";

export function postToSlack(hookUrl: string, message: SlackMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      body: message,
      json: true,
      url: hookUrl,
    };

    request.post(requestOptions, (err, response, body) => {
      if (err) {
        reject(err);
      } else if (body !== "ok") {
        reject(new Error(`Post to Slack: ${body}`));
      } else {
        resolve(body);
      }
    });
  });
}
