import { findUserByEmail } from '../hooks/useStorage'

chrome.runtime.onInstalled.addListener((details) => {
    console.log("Extension installed, reason:", details.reason)
  })
  
chrome.runtime.onInstalled.addListener((details) => {
    console.log("Extension installed or updated:", details.reason);
    chrome.storage.local.set({ acknowledged: false });
  });

chrome.tabs.onUpdated.addListener((tabId,changeInfo, tab)=>{
    if (changeInfo.status === "complete" && tab.url?.startsWith("http")) {
        console.log("Background: sending CHECK_FOR_EMAIL_FIELD to", tab.url)
        setTimeout(() => {
            chrome.tabs.sendMessage(tabId, {
                type: "CHECK_FOR_EMAIL_FIELD",
                tabURL: tab.url
            }).catch((err) => console.warn("Message failed:", err));
        }, 500);
      }
})
  
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CHECK_FOR_EMAIL_FIELD" && message?.email) {
      if (/\S+@\S+\.\S+/.test(message?.email)) {
      findUserByEmail(message?.email).then(foundUser => {
        sendResponse({
          match: !!foundUser,
          user: foundUser || null
        })
      })
    } else {
      sendResponse({
        match: false,
        user: null
      })
    }
}
})
