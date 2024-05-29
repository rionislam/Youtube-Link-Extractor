import copyUrl from "./copyUrl.js";

let urlsContainer = document.getElementById('urlsContainer');

document.getElementById('extractBtn').addEventListener('click', async () => {
  let [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  browser.tabs.executeScript(tab.id, {
    file: "./extractYoutubeUrls.js"
  }, (results) => {
    const extractedUrls = results && results[0] && results[0].result;

    if (extractedUrls && extractedUrls.length > 0) {
      const listItems = extractedUrls.map(url => `
        <li>
          <div class="container">
            <a href="${url}">${url}</a>
            <img class="copyBtn" src="assets/copy.png"/>
          </div>
        </li>
      `).join('');

      urlsContainer.innerHTML = `<ol>${listItems}</ol>`;
    } else {
      urlsContainer.innerHTML = '<p>No YouTube videos found on this page.</p>';
    }
  });
});


urlsContainer.addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('copyBtn')) {
    copyUrl(event.target);
  }
});
