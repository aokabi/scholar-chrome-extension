$("#exportList").on("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
                  color: "black"
                },
          function(response) {
            chrome.downloads.download({url: response, filename: "reports.tsv"});
          }
          );
        });
});
