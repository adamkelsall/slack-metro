import * as request from "request";

export function getWebPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // request.get(url, (err, response, html) => {
    //   err ? reject(err) : resolve(html);
    // });
    resolve(`<div class="tab-content">
  <div id="t_disruptions" class="tab-pane disruptions active">
    <div class="view view-mode-issues view-id-mode_issues view-display-id-block_3 view-dom-id-61a82f156f6715e422acc7424449d329">
      <div class="view-content">
        <div class="views-row views-row-1 views-row-odd views-row-first views-row-last"> 
          <p>There are no trains running between North Shields and Monkseaton in both directions until further notice. This is due to a failed train. </p>
          <p>We are currently operating a bus replacement service, the number 900, calling at or near to all stations between North Shields and Monkseaton.</p>
          <p>We are also operating a taxi shuttle service, with 4 minibuses calling at or near to all stations between North Shields and Monkseaton.</p>
          <p>Go North East are accepting Metro tickets in the affected area. Bus services 1 and 11 operate between North Shields and Monkseaton.</p>
          <p>We will update when we have more information.</p>
          <div>    Updated at    14:25, Thursday, 25 May  2017  </div>
        </div>
      </div>
    </div>
  </div>
</div>`);
  });
}
