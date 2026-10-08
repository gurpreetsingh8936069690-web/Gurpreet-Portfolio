# Gurpreet Singh — Developer Portfolio

A clean, modern, and accessible personal developer portfolio built for **Gurpreet Singh**, Third-Year B.Tech Computer Science Engineering student at Sandip University.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 📄 How to Update Your Resume Link

All resume buttons across the website (Navbar, Hero, About, Mobile Menu, and Contact section) are driven by a single central configuration variable:

1. Open [`src/config/portfolioData.js`](file:///d:/Gurpreet%20Portfolio/src/config/portfolioData.js).
2. Locate the top configuration block:
   ```javascript
   // ============================================================================
   // RESUME CONFIGURATION
   // PASTE YOUR GOOGLE DRIVE RESUME LINK HERE:
   // ============================================================================
   export const RESUME_URL = "PASTE_YOUR_GOOGLE_DRIVE_RESUME_LINK_HERE";
   ```
3. Replace `"PASTE_YOUR_GOOGLE_DRIVE_RESUME_LINK_HERE"` with your shareable Google Drive link (make sure sharing permission is set to *"Anyone with the link can view"*).
4. Save the file. All resume buttons on desktop and mobile will automatically update to use your Google Drive link with `target="_blank"` and `rel="noopener noreferrer"`.

---

## 🛠️ Adding Future Projects

When you are ready to add a new project:
1. Open [`src/config/portfolioData.js`](file:///d:/Gurpreet%20Portfolio/src/config/portfolioData.js).
2. In the `PROJECTS` array, find the commented placeholder:
   ```javascript
   // Future project can be added here
   ```
3. Add your new project object following the existing structure.

---

## 🏗️ Architecture & Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React + Custom optimized SVGs
- **Typography**: Plus Jakarta Sans & JetBrains Mono
- **Responsive Breakpoints**: Tested across 1920px, 1440px, 1280px, 1024px, 768px, 430px, 390px, 375px, 360px without horizontal scroll or layout overflow.
- **Accessibility**: Semantic landmarks, keyboard skip link, ARIA drawer controls, high color contrast.
