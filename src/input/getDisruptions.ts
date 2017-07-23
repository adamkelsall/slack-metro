import * as cheerio from "cheerio";

export function getDisruptions(html: string): Cheerio {
  const $: CheerioStatic = cheerio.load(html);
  return $("#t_disruptions .views-row");
}
