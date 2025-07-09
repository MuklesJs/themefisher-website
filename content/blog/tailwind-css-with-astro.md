---
title: Integrating Tailwind CSS with Astro (A Step-by-Step Guide)
date: 2024-10-20
meta_title: "Integrating Tailwind CSS with Astro (A Step-by-Step Guide)"
description: Learn how to integrate Tailwind CSS with Astro, featuring a standard setup and an advanced configuration using the Astroplate boilerplate for enhanced theming and design flexibility.
image: /blog-thumb/tailwind-css-with-astro.webp
author: Mehedi Sharif
last_update: 2025-03-07 #yyyy-mm-dd
sponsored: false
draft: false
categories:
  - Astro
---

<Toc level="h2 h3 h4" />

In this blog, we will explore two approaches to integrating Tailwind CSS with Astro. First, we’ll guide you through the standard setup process, and then we’ll dive into a more technical implementation using <A href="https://github.com/zeon-studio/astroplate">Astroplate</A> - our custom boilerplate for enhanced theming and configuration. Whether you prefer the straightforward integration or want to supercharge your project with a tailored solution, this guide has you covered.

## Standard Setup

To set up Tailwind CSS in your Astro project, follow these steps:

1. Install the required dependencies:

   ```
   npm install -D tailwindcss @astrojs/tailwind
   ```

2. Create a Tailwind configuration file:

   ```
   npx tailwindcss init
   ```

3. Add the Tailwind integration to your Astro configuration file (`astro.config.mjs`):

   ```javascript
   import { defineConfig } from "astro/config";
   import tailwind from "@astrojs/tailwind";

   export default defineConfig({
     integrations: [tailwind()],
   });
   ```

4. Create a CSS file (e.g., `src/styles/global.css`) with Tailwind directives:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. Import the CSS file in your Astro layout or component:

   ```astro
   ---
   import '../styles/global.css';
   ---
   ```

6. Start using Tailwind classes in your Astro components.

---

## Custom Setup with Astroplate

Supercharge Your Astro Project with Tailwind CSS: Using Astroplate

## Prerequisites

Before we begin, make sure you have the following installed:

- <A href="https://github.com/zeon-studio/astroplate">Astroplate</A>.
- Node.js (latest LTS version)

### Step 1: Setting Up Your Theme

Our boilerplate uses a `theme.json` file to define custom colors, fonts, and other design tokens. This approach allows for easy theming and consistency across your project. Here's a snippet of what your `theme.json` might look like:

```json
{
  "colors": {
    "default": {
      "theme_color": {
        "primary": "#121212",
        "body": "#fff",
        "border": "#eaeaea",
        "theme_light": "#f6f6f6"
      },
      "text_color": {
        "default": "#444444",
        "dark": "#040404",
        "light": "#717171"
      }
    },
    "darkmode": {
      // ... (dark mode colors)
    }
  },
  "fonts": {
    "font_family": {
      "primary": "Heebo:wght@400;600",
      "primary_type": "sans-serif",
      "secondary": "Signika:wght@500;700",
      "secondary_type": "sans-serif"
    },
    "font_size": {
      "base": "16",
      "scale": "1.2"
    }
  }
}
```

This file defines your color palette, typography, and other design variables that will be used throughout your project.

### Step 2: Configuring Tailwind

Next, we'll set up our `tailwind.config.js` file to use the values from our `theme.json`:

```javascript
const theme = require("./src/config/theme.json");

// ... (font calculations)

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    // ... (screen and container configurations)
    extend: {
      colors: {
        text: theme.colors.default.text_color.default,
        light: theme.colors.default.text_color.light,
        dark: theme.colors.default.text_color.dark,
        primary: theme.colors.default.theme_color.primary,
        // ... (other color configurations)
      },
      fontSize: {
        base: font_base + "px",
        "base-sm": font_base * 0.8 + "px",
        h1: h1 + "rem",
        // ... (other font size configurations)
      },
      fontFamily: {
        primary: ["var(--font-primary)", fontPrimaryType],
        secondary: ["var(--font-secondary)", fontSecondaryType],
      },
    },
  },
};
```

This configuration imports our theme values and uses them to extend Tailwind's default theme, ensuring our custom design system is available throughout our project.

### Step 3: Setting Up SCSS

To organize our styles and incorporate Tailwind, we'll create a `main.scss` file:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  @import "base";
}

@layer components {
  @import "components";
  @import "navigation";
  @import "buttons";
}

@layer utilities {
  @import "utilities";
}
```

This file includes Tailwind's base styles and allows us to organize our custom styles into separate files, which are then imported into the appropriate Tailwind layers.

### Step 4: Integrating with Astro

Finally, we need to add the Tailwind integration to our Astro configuration. In your `astro.config.mjs` file, add the following:

```javascript
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    // ... (other integrations)
  ],
});
```

This setup tells Astro to use our custom Tailwind configuration and not to apply base styles automatically, as we're handling that in our `main.scss` file.

### Step 5: Use `main.scss` in our project

Finally we'll import our `main.scss` file into our main layout which is named `Base.astro`

```js
import "@/styles/main.scss";
```

## Conclusion

With this setup, you have a powerful, customizable Tailwind CSS configuration integrated into your Astro project. The use of a `theme.json` file allows for easy theming and maintenance of your design tokens, while the SCSS setup provides flexibility for more complex styling needs.

This boilerplate gives you the best of both worlds: the utility-first approach of Tailwind CSS and the power of SCSS, all within the lightning-fast Astro framework. Happy coding!
