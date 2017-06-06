const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request");

const url = {
  metro: "https://www.nexus.org.uk/metro/updates",
};
let lastWasDisruption;

try {
  url.slack = fs.readFileSync("./url.txt").toString().trim();
} catch (err) {
  console.error("Couldn't read Slack API URL from url.txt");
  process.exit(1);
}

try {
  lastWasDisruption = fs.existsSync("./disruption.txt");
} catch (err) {
  console.error("Couldn't determine if disruptions.txt exists");
}

request(url.metro, (err, response, html) => {
  if (err) {
    console.error("Couldn't read Metro updates webpage");
    process.exit(1);
  }

  const $ = cheerio.load(html);
  const disruptions = $("#t_disruptions .views-row");

  if (lastWasDisruption && !disruptions.length) {
    try {
      fs.unlinkSync("./disruption.txt")
    } catch (err) {
      console.error("Couldn't delete disruptions.txt");
      process.exit(1);
    }

  } else if (!lastWasDisruption && disruptions.length) {

    const payload = {
      attachments: [],
      text: "One or more Metro disruptions has been detected following a period where there were none :frowning:",
    }

    disruptions.each((index, element) => {
      const lines = $(element)
        .text()
        .trim()
        .split("\n")
        .map(line => line.trim().replace(/\s+/g, " "))
        .filter(line => line);
      
      payload.attachments.push({
        title: `Disruption ${index + 1}`,
        text: lines.join("\n"),
      });
      
    });

    try {
      fs.writeFileSync("./disruption.txt", new Date().toISOString());
    } catch (err) {
      console.error("Couldn't write to disruption.txt");
    }

    const postOptions = {
      method: "POST",
      url: url.slack,
      json: true,
      body: payload,
    };

    request.post(postOptions, (err, res, body) => {
      if (err || body !== "ok") {
        console.error(`Couldn't post a message to Slack: ${body}`);
        process.exit(1);
      }
    });

  }
});
