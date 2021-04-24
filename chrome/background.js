function changeVisibility() {
  try {
    var notDisplayed = document.getElementsByClassName('toolbar')[0].style.visibility === "hidden";
    document.getElementsByClassName("toolbar")[0].style.visibility = notDisplayed ? "visible" : "hidden";
    return notDisplayed;
  } catch {
    return true;
  }
}

chrome.runtime.onStartup.addListener(function () {
  chrome.action.setBadgeText({
    text: "on"
  });
  chrome.action.setBadgeBackgroundColor({
    color: "#71C91F"
  });
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.action.setBadgeText({
    text: "on"
  });
  chrome.action.setBadgeBackgroundColor({
    color: "#71C91F"
  });
});

chrome.action.onClicked.addListener((tab) => {
  const currentURL = tab.url;
  if (currentURL.includes('live.browserstack.com') || currentURL.includes('app-live.browserstack.com')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: changeVisibility
    },
      (injectionResults) => {
        var notDisplayed = !injectionResults[0].result;
        chrome.action.setBadgeText({
          text: notDisplayed ? "off" : "on",
          tabId: tab.id
        });
        chrome.action.setBadgeBackgroundColor({
          color: notDisplayed ? "#BC0102" : "#71C91F",
          tabId: tab.id
        });
      }
    );
  }
});
