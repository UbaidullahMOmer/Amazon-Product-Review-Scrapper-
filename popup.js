document.getElementById('downloadButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, current: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: "downloadLogos"});
  });
});