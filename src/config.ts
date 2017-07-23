import * as dotenv from "dotenv";

export interface Config {
  readonly debug: boolean;
  readonly slackWebhookUrl: string;
}

export function getConfig(): Config {
  return {
    debug: getEnv("DEBUG").toLowerCase() === "true",
    slackWebhookUrl: getEnv("SLACK_WEBHOOK_URL"),
  };
}

export function setConfig(): void {
  const result = dotenv.config();
  if (result.error) { throw result.error; }
}

function getEnv(key: string, defaultValue?: any): any {
  if (!(key in process.env)) {
    if (!defaultValue) {
      throw new Error(`Missing environment variable ${key}`);
    }

    return defaultValue
  }

  return process.env[key];
}
