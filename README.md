# WhatsApp Chat Analyzer Chrome Extension

Analyze WhatsApp Web chat messages using AI directly from your browser!

---

## Features

- Extracts the loaded messages from the active WhatsApp Web chat.
- Sends messages to OpenAI (or OpenRouter.ai) API for AI-powered analysis (e.g., summarization).
- Displays the AI-generated analysis in the extension popup.
- Lightweight and easy to use.

---

## Demo

![Demo Screenshot](demo-screenshot.png)  
![image](https://github.com/user-attachments/assets/4e13d665-74e5-4662-951a-3586a7e71591)


---

## Installation

### Manual install (for developers and testers)

1. Download or clone this repository:

   ```bash
   git clone https://github.com/yourusername/whatsapp-chat-analyzer.git
   ```

2. Open Chrome and go to `chrome://extensions/`.

3. Enable **Developer mode** (toggle in the top right).

4. Click **Load unpacked** and select the cloned folder.

5. Open [https://web.whatsapp.com/](https://web.whatsapp.com/) and open a chat.

6. Click the extension icon and then click **Analyze Messages**.

---

## Usage

- Click **Analyze Messages** in the popup to extract and analyze the current chat.
- The AI analysis (e.g., summary) will appear in the popup.

---

## Configuration

### OpenAI / OpenRouter API Key

- The extension requires an API key to call the AI service.
- Open `popup.js` and replace the placeholder with your API key:

  ```js
  const OPENAI_API_KEY = "YOUR_API_KEY_HERE";
  ```

- **Keep your API key private!** Do not share it publicly.

---

## Development

- `manifest.json` — Extension manifest file.
- `popup.html` — Popup UI.
- `popup.js` — Popup logic and API calls.
- `content.js` — Content script extracting WhatsApp messages.

---

## Notes

- This extension works only on [https://web.whatsapp.com/](https://web.whatsapp.com/).
- WhatsApp Web UI changes may require updating selectors in `content.js`.
- The extension 
