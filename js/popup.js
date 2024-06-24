import extractYoutubeUrls from "./extractYoutubeUrls.js";
import copyUrl from "./copyUrl.js";

let urlsContainer = document.getElementById('urlsContainer');

async function extractAndDisplayUrls() {
  try {
    let [tab] = await browser.tabs.query({ active: true, currentWindow: true });

    // Execute content script using executeScript
    let results = await browser.tabs.executeScript(tab.id, {
      code: `(${extractYoutubeUrls})()`
    });

    const extractedUrls = results && results[0];

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
  } catch (error) {
    console.error('Error extracting URLs:', error);
    urlsContainer.innerHTML = '<p>Error extracting YouTube URLs. Please try again.</p>';
  }
}

extractAndDisplayUrls();

urlsContainer.addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('copyBtn')) {
    copyUrl(event.target);
  }
});
