document.getElementById("downloadButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (chrome.runtime.lastError) {
      // If currentWindow fails, try with current_window
      chrome.tabs.query(
        { active: true, current_window: true },
        function (tabs) {
          if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "downloadLogos" });
          }
        }
      );
    } else if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "downloadLogos" });
    }
  });
});
