

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({ url: 'success.html' }); 
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (sender.id === 'jhacddnljgboockopjkcigmmacgmbfhh') {
    if (message.action === 'open_extension') {
      chrome.action.openPopup();
    }
  }
});
if (chrome.alarms) {
  chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Reminder",
      message: `Time for: ${alarm.name}`,
    });
  });
} else {
  console.error("chrome.alarms API is not available");
}
