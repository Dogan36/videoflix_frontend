# Videoflix Frontend Repository

# Frontend Repository

**Videoflix Frontend** is the client‑side React application that consumes the Videoflix Backend APIs, built as part of the Full‑Stack training at Developer Academy. It provides a modern UI for browsing, streaming, and tracking movie progress.

## Backend

You can find the Backend Repository for this project at https://github.com/Dogan36/videoflix-backend.git

## Features

- **Responsive Design**: Mobile‑friendly layout, adaptive video player controls, auto‑hide header.
- **Custom Video Player**: Play/Pause, volume slider, resolution switcher, fullscreen, progress bar with seek.
- **Dynamic Data Fetching**: Fetch wrappers for JSON and binary (video) data, with authentication tokens.
- **Infinite Scrolling**: IntersectionObserver‑based loading of additional movies per category.
- **Authentication Flows**: Login, signup, password reset, activation, and protected routes.
- **Global Toast Notifications**: Context‑based toast provider for success/error messages.
- **Code Splitting & Routing**: React Router for pages (Home, Watch, Login, Activation, Reset Password).

## Directory Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components (VideoPlayer, Toast, Header, Cards)
│   ├── pages/          # Top‑level pages (Home, Watch, Login, Activation, Reset)
│   ├── services/       # API wrappers (getData, postData) & auth helpers
│   ├── contexts/       # React Contexts (ToastProvider, Auth)
│   ├── utils/          # Helpers (form validation, column count)
│   ├── assets/         # Images, icons, styles
│   ├── App.jsx         # App component with routes
│   └── index.jsx       # App bootstrap (ToastProvider, ReactDOM.render)
├── public/             # Static files (favicon)
├── package.json        # NPM scripts and dependencies
└── README.md           # This file
```

## Setup & Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Dogan36/videoflix-frontend.git
   cd videoflix-frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the dev server:**
   ```bash
   npm run dev
   ```



📄 License
MIT License
Copyright (c) 2025 Dogan Celik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
---

*This project was developed as part of the Full‑Stack training program at Developer Academy.*

