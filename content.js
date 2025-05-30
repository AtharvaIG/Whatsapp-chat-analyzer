console.log("WhatsApp Chat Analyzer content script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractChat") {
    const messageEls = document.querySelectorAll(".message-in, .message-out");
    const messages = Array.from(messageEls)
      .map((el) => el.innerText.trim())
      .filter(Boolean)
      .slice(-170); // last 170 messages

    console.log("Extracted messages count:", messages.length);

    sendResponse({ messages });
    return true; // keep message channel open
  }
});
