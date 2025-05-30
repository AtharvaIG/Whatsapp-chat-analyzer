const analyzeBtn = document.getElementById("analyzeBtn");
const resultDiv = document.getElementById("result");

// Insert your OpenRouter API key here (keep it secret!)
const OPENROUTER_API_KEY = "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";

// OpenRouter endpoint for chat completions
const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

analyzeBtn.addEventListener("click", () => {
  resultDiv.textContent = "Extracting messages...";

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]?.id) {
      resultDiv.textContent = "No active tab found.";
      return;
    }
    const tabId = tabs[0].id;

    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["content.js"],
      },
      () => {
        if (chrome.runtime.lastError) {
          resultDiv.textContent =
            "Script injection failed: " + chrome.runtime.lastError.message;
          return;
        }

        chrome.tabs.sendMessage(tabId, { action: "extractChat" }, async (response) => {
          if (chrome.runtime.lastError) {
            resultDiv.textContent =
              "Message error: " + chrome.runtime.lastError.message;
            return;
          }
          if (!response || !response.messages || response.messages.length === 0) {
            resultDiv.textContent = "No messages extracted.";
            return;
          }

          resultDiv.textContent = "Analyzing messages with OpenRouter.ai...";

          try {
            const analysis = await analyzeWithOpenRouter(response.messages);
            resultDiv.textContent = "Analysis result:\n\n" + analysis;
          } catch (err) {
            resultDiv.textContent = "OpenRouter API error: " + err.message;
          }
        });
      }
    );
  });
});

/**
 * Calls OpenRouter.ai API to analyze the chat messages.
 * @param {string[]} messages - Array of chat messages
 * @returns {Promise<string>} - The analysis text from OpenRouter.ai
 */
async function analyzeWithOpenRouter(messages) {
  // Prepare prompt with messages joined
  const prompt = `Summarize the following WhatsApp chat messages:\n\n${messages.join(
    "\n"
  )}`;

  const response = await fetch(OPENROUTER_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // or your preferred model supported by OpenRouter
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "OpenRouter API request failed");
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
