Browser Extension – Auto Form Prefill

📌 Project Overview
Custom Structure (Not using default Plasmo structure)

package.json also includes manifest.json configuration.

Project Folder Structure:
src/
├── background/index.js # Replaces background.js
├── components/UserPopup.tsx # Displays the popup UI
├── contents/autoFill.js # Replaces content.js (main logic)
├── hooks/useStorage.ts # Custom hook for data storage
├── popup/index.tsx # Replaces popup.js (UI)
├── utils/elementsList.js # Stores list of possible selectors

⚙️ Setup Instructions

1. Clone Repository:
   git clone (https://github.com/kanikas24/form-autofill-extension.git)
   cd form-autofill-extension/

2. Install Plasmo (if not installed)
   npm i -g plasmo

3. Build / Run in Dev Mode
   npm run build # For production build  
   npm run dev # For development mode  
   This will generate the /build/chrome-mv3 folder.

🚀 Load Extension in Chrome
Open chrome://extensions in your browser.
Enable Developer Mode (toggle in top-right).
Click Load Unpacked → Select the /build/chrome-mv3 folder.

🧪 Testing
Open any webpage with a form field containing an email input.
Type one of the emails from the sample database (background script).
A popup will slide in → Click Prefill Data.
Other fields will auto-fill and briefly glow green.

Acknowledgment

I would like to thank you for this opportunity. I truly enjoyed working on this assignment. Interestingly, the part I initially thought would be the easiest—Google Forms—turned out to be the most challenging! It was a great learning experience exploring query selectors and analyzing the DOM object structure to identify common patterns.

The extension may not work perfectly on every form (especially Google Forms), but I have tried my best to deliver as much as I could within the given time.

This project reminded me of my early career days in data scraping, which made it even more fun to work on!

For testing, I have used 10 dummy data records containing the following fields: firstname, lastname, email, mobile, and age. Also for personalisation if you search for your email "sudhanshu@mantys.io" or "kriti@mantys.io" you should be able to find some data.

Thanks
