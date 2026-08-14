# Creative Portfolio — Rohit Kumar Nayak

A highly interactive, premium web portfolio designed for **Rohit Kumar Nayak** — a Software Engineer & Creative Technologist building at the intersection of technology and creativity (AI, Robotics, 3D Graphics, and Web Engineering).

## 🚀 Tech Stack & Libraries
This project is built using a lightweight, performant stack, avoiding heavy UI frameworks in favor of raw WebGL and highly customized Vanilla CSS.

- **Core:** Vanilla HTML5, CSS3, Vanilla JavaScript
- **Build Tool:** [Vite](https://vitejs.dev/) (for rapid local development, hot module replacement, and optimized production bundling)
- **3D Graphics:** [Three.js](https://threejs.org/) (for rendering the interactive WebGL wireframe sphere)
- **Typography:** Google Fonts
  - *Playfair Display* (Used for the elegant, italicized Hero Name)
  - *Inter* (Used for crisp, modern sans-serif body text and UI elements)

## 🏗️ Architecture & Sections

The portfolio is structured as a single-page application (SPA) with smooth scrolling and dynamic navigation.

### 1. The Hero Section (Home)
The crown jewel of the portfolio, engineered for maximum visual impact.
- **Blended Portrait:** Uses a high-resolution sunset profile picture (`profile.jpg`). It is seamlessly integrated into the background using complex **CSS Masking** (`mask-image: linear-gradient`) to blend the right edge of the photo smoothly into the 3D canvas, without harsh borders.
- **Custom Overlays:** A dark, warm gradient overlay (`rgba(20, 10, 5, 0.6)`) ensures perfect text readability without washing out the photo's vibrant sunset colors.
- **Glassmorphism Panels:** Floating 3D web experience and robotics panels use `backdrop-filter: blur()` and semi-transparent backgrounds to create a frosted glass effect.
- **Dynamic 3D Canvas:** A full-height `<canvas>` element sits in the background running a Three.js scene (a rotating, wireframe Icosahedron sphere with glowing vertex points).
- **Precision Layout:** The bio text and name are precisely anchored to align with the subject's shoulder/neck, while footer social links are absolutely positioned over the sand at the bottom of the photo using advanced Flexbox and Absolute Positioning.

### 2. Projects Section
- Features an infinite, horizontal auto-scrolling carousel of project cards.
- **Assets:** Uses custom thumbnail images (e.g., `robotics_thumb_alt_1.jpg`) styled with rounded corners, subtle borders, and dynamic hover effects.
- **Animations:** The carousel animation is driven by CSS `@keyframes`, pausing naturally on hover.

### 3. About Section
- A clean, typographic layout detailing Rohit's background in AI, robotics, and creative technology.
- Structured using CSS Grid/Flexbox for perfect alignment.

### 4. Contact Section
- A functional contact form and social links, styled with custom input fields and a prominent CTA button that responds with smooth color transitions on hover.

## 🎨 Advanced Styling Techniques
- **CSS Variables:** Theming is controlled via a robust set of CSS variables (`--color-primary`, `--bg-color`, `--trans`) allowing for instant, global aesthetic updates.
- **Responsive Design:** Extensive use of CSS `clamp()` functions for fluid typography, and `@media` queries to ensure the complex Hero masking and 3D canvas degrade gracefully on smaller mobile screens.
- **Micro-interactions:** Custom hover states on the navigation pills, social links (which glow with a warm gold `#fcecae`), and project cards.

## 🛠️ Running Locally

1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```