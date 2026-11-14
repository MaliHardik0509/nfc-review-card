# 📱 Smart NFC & QR Google Review Booster

> **Tap or Scan ➔ Pick Categories (Food, Service, Cleanliness...) ➔ Instant 5-Star Review Draft ➔ 1-Tap Copy & Post to Google!**

---

## 🌟 Overview

When customers tap your physical NFC card or scan your QR code with their phone, this web app immediately opens. Instead of staring at a blank text box wondering what to write, they simply tap what they loved (e.g., 🍕 **Delicious Food**, ⚡ **Fast Service**, 🧼 **Cleanliness**, 🧑‍🍳 **Friendly Staff**). 

The system instantly generates an authentic, natural-sounding, glowing 5-star review draft. With a single tap, it copies the review to their clipboard, explodes celebratory confetti, and opens Google's review modal directly on their screen where they just long-press to paste and tap **Post**!

### Key Features:
- ⚡ **Zero-Friction Review Generation**: Pre-built combinatorial natural language engine generates hundreds of natural, non-repetitive review variations without sounding generic or triggering Google's spam filters.
- 🛡️ **Negative Review Shield (1-3 Star Protection)**: If an unsatisfied customer selects 1, 2, or 3 stars, they are seamlessly routed to a private management feedback form (sent directly to the owner via WhatsApp or private submit), protecting your public Google Business rating!
- 🤖 **Optional Gemini AI Engine**: Business owners can plug in a free Google Gemini API key for infinite, personalized AI-generated reviews.
- 🏪 **Multi-Business / White-Label Ready**: Deploy once and use for unlimited businesses just by changing URL query parameters (`?name=MyCafe&placeId=ChIJ...&cat=restaurant&wa=14155552671`).
- 🖨️ **Built-in QR Code Generator**: Download high-res PNG QR codes ready to print on cards, tabletop stands, or counter stickers.
- 📲 **Works on Every Phone**: 100% compatible with iPhone and Android NFC chips (NTAG213, NTAG215, NTAG216) and all QR scanners.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser. To test mobile view, press `F12` and toggle the device toolbar (or open the local network link on your smartphone).

---

## 🛠️ Step-by-Step: How to Program Your NFC Card

You don't need any special hardware! Any smartphone with NFC can program cards in under 30 seconds:

1. **Get the Free App**:
   - Android: Download **NFC Tools** from Google Play Store.
   - iPhone: Download **NFC Tools** from Apple App Store.

2. **Copy Your Review Link**:
   - Open this web app, click **⚙️ Card Setup** at the bottom.
   - Go to the **Card URL & QR Generator** tab and tap **Copy URL**.
   - *(Tip: For your own business, host this site on Vercel/Netlify first, or use the query parameter format)*.

3. **Write to Card**:
   - Open the **NFC Tools** app on your phone.
   - Tap **Write** ➔ Tap **Add a record**.
   - Select **URL / URI** (Custom URL).
   - Paste your card link and tap **OK**.
   - Tap **Write / 28 Bytes** on the screen.
   - Hold your physical NFC card against the back of your phone (near the top for iPhone, near center for Android) until you hear a chime and see a green checkmark!

4. **Test It!**:
   - Lock your phone or go to the home screen, tap the card against any phone — your smart review page will open immediately!

---

## 🔍 How to Find Your Google Place ID

Google uses a unique identifier called a **Place ID** to link directly to your review dialog.

1. Go to Google's official Place ID Finder: [developers.google.com/maps/documentation/places/web-service/place-id](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Type your business name and address in the search box on the map.
3. Copy the string that starts with `ChIJ...` (e.g. `ChIJN1t_tDeuEmsRUsoyG83frY4`).
4. Paste it into **⚙️ Card Setup ➔ Google Place ID**.

*Alternatively*, if you have a Google Business shortlink (e.g., `https://g.page/r/your-id/review`), you can enter that directly in the **Alternative Custom Google Review Link** field!

---

## 🔒 Owner Security & Admin PIN (Customer Lockdown)

To prevent customers from seeing or changing card settings when tapping or scanning:
- **"Card Setup" is 100% hidden** from the customer view.
- Customers only see the clean, branded review flow with a trust badge: `● Verified Review Partner`.
- **How You or the Cafe Owner Unlock Setup**:
  1. **Secret 5-Tap Gesture (Easiest on Mobile)**: Tap the bottom footer text (`● Verified Review Partner`) **5 times in a row**. An **Owner Access PIN** prompt will pop up!
  2. **Admin URL**: Visit your link with `?admin=1` (e.g., `https://your-domain.com/?admin=1`).
  3. **Master PIN**: Enter the 4-digit PIN (default: **`1234`**). You can change this PIN to anything you want inside the Settings tab.

---

## 💼 Multi-Business / Agency Mode (Selling NFC Cards)

If you are selling NFC & QR review cards to multiple businesses, you don't need to host a separate website for each client! 

Simply deploy this app to your domain (e.g., `https://reviewcard.app`) and encode individual cards with URL query parameters:

```text
https://reviewcard.app/?name=Bella+Napoli&placeId=ChIJ...&cat=restaurant&wa=14155552671
```

Supported query parameters:
- `name` / `biz`: Business name displayed at top
- `placeId` / `pid`: Google Place ID for direct review box opening
- `cat`: Business category (`restaurant`, `salon`, `clinic`, `retail`, `hotel`, `service`)
- `wa`: WhatsApp phone number for negative review alerts
- `url`: Direct custom Google review shortlink
- `setup=1`: Opens the admin setup modal immediately

---

## ☁️ 1-Click Free Deployment

You can host this for free on:
- **Vercel**: Run `vercel` or connect your GitHub repository.
- **Netlify**: Drag and drop the `dist/` folder or connect Git.
- **Cloudflare Pages / GitHub Pages**: Deploy the `dist/` folder as a static site.

### Build Command:
```bash
npm run build
```
Output will be generated in the `dist/` directory, ready to serve anywhere!
