import * as request from "request";

export function getWebPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // request.get(url, (err, response, html) => {
    //   err ? reject(err) : resolve(html);
    // });
    resolve(`<div class="tab-content">
  <div id="t_disruptions" class="tab-pane disruptions active">
    <div class="view view-mode-issues view-id-mode_issues view-display-id-block_3 view-dom-id-63d9c28d500e7eadd76f4cc7a44b2e49">
      <div class="view-content">
        <div class="views-row views-row-1 views-row-odd views-row-first">
          <p>There are no trains running between North Shields and Monkseaton in both directions until further notice. This is due to a failed train. </p>
          <p>We are currently operating a bus replacement service, the number 900, calling at or near to all stations between North Shields and Monkseaton.</p>
          <p>We are also operating a taxi shuttle service, with nine 7-seater taxis calling at or near to all stations between North Shields and Monkseaton.</p>
          <p>Go North East are accepting Metro tickets in the affected area: </p>
          <p>Bus service 1 operates between Whitley Bay, Cullercoats, Tynemouth and North Shields.<br />
          Bus service 11 operates between Whitley Bay and North Shields.<br />
          Bus services W1/W1A operate between Whitley Bay, Monkseaton and West Monkseaton.</p>
          <p>We will update when we have more information.</p>
          <div>    Updated at    15:00, Thursday, 25 May  2017  </div>
        </div>
        <div class="views-row views-row-2 views-row-even views-row-last">
          <p>A train has been withdrawn from service at Gateshead Stadium. Due to this we have a gap in the service of up to 20 mins to trains running between Gateshead Stadium and South Shields. Please leave extra time for your journey if you're travelling in the area.</p>
          <div>    Updated at    15:40, Thursday, 25 May  2017  </div>
        </div>
      </div>
    </div>
  </div>
</div>`);
  });
}
