const changeVisibility =
  `try {
    var notDisplayed = document.getElementsByClassName('toolbar')[0].style.visibility === "hidden";
    document.getElementsByClassName("toolbar")[0].style.visibility = notDisplayed ? "visible" : "hidden";
    notDisplayed;
  } catch {
    true;
  }`

browser.runtime.onStartup.addListener(function () {
  browser.browserAction.setBadgeText({
    text: "on"
  });
  browser.browserAction.setBadgeBackgroundColor({
    color: "#71C91F"
  });
});

browser.runtime.onInstalled.addListener(function () {
  browser.browserAction.setBadgeText({
    text: "on"
  });
  browser.browserAction.setBadgeBackgroundColor({
    color: "#71C91F"
  });
});

browser.browserAction.onClicked.addListener((tab) => {
  const currentURL = tab.url;
  if (currentURL.includes('live.browserstack.com') || currentURL.includes('app-live.browserstack.com')) {
    const executing = browser.tabs.executeScript({
      code: changeVisibility
    });
    executing.then(
      (result) => {
        var notDisplayed = !result[0];
        browser.browserAction.setBadgeText({
          text: notDisplayed ? "off" : "on",
          tabId: tab.id
        });
        browser.browserAction.setBadgeBackgroundColor({
          color: notDisplayed ? "#BC0102" : "#71C91F",
          tabId: tab.id
        });
      }
    );
  }
});
