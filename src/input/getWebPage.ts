import * as request from "request";

export function getWebPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    request.get(url, (err, response, html) => {
      err ? reject(err) : resolve(html);
    });
  });
}
