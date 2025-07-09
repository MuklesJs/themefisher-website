---
title: Image Optimization With Astrojs
date: 2024-10-13
meta_title: ""
description: Learn how to optimize images in Astro using the Astroplate open-source boilerplate. This guide provides a custom image component that simplifies image handling and boosts site performance.
image: /blog-thumb/image-optimization-with-astrojs.webp
author: Mehedi Sharif
last_update: 2025-01-12 #yyyy-mm-dd
sponsored: false
draft: false
categories:
  - Astro
---

<Toc/>

When building modern web applications, image optimization plays a crucial role in improving site performance, enhancing SEO, and providing a better user experience. Astro, with its powerful Image Integration, makes this process easier. However, handling images efficiently, especially when they are stored in the /public directory, can still be a challenge.

> To streamline this, we've created a custom image component as part of our open-source Astro boilerplate - <A href="https://github.com/zeon-studio/astroplate">Astroplate</A>.

This component simplifies image handling and offers built-in optimization features, making it easier for developers to manage images in their Astro projects.

In this guide, we’ll walk you through how to use this custom component, explore its features, and demonstrate how it can improve the efficiency and performance of your site.

## Custom Image Component

To optimize images in astro we've a custom image component built on top of Astro's built-in [Image Integration](https://docs.astro.build/en/guides/images/), which will provide us a simplified way to handle images in our Astro project, specifically for images stored in the `/public` directory. This component also automatically import images from provided location as astro need local images to be imported in order to be used. You can get the component from [here](https://github.com/zeon-studio/astroplate/blob/main/src/layouts/components/ImageMod.astro) from our [astroplate](https://github.com/zeon-studio/astroplate/) astro boilerplate.

### Features

- Auto import local images using image location
- Automatic image path validation
- Simplified props interface
- Built-in error handling with console warnings
- Support for multiple image formats
- Lazy loading options
- Automatic image optimization

## Installation

1. We've to make sure we have the Astro Image integration enabled in our `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [
    // The Image integration is included by default in Astro 3.0+
  ],
});
```

2. And Place the component file (e.g., `ImageMod.astro`) in our components directory.

## Usage

### Basic Usage

```astro
---
import ImageMod from "../components/ImageMod.astro";
---

<ImageMod
  src="/images/my-image.jpg"
  alt="My awesome image"
  width={800}
  height={600}
/>
```

### Props

| Prop       | Type                                                     | Required | Default     | Description                                                  |
| ---------- | -------------------------------------------------------- | -------- | ----------- | ------------------------------------------------------------ |
| `src`      | `string`                                                 | Yes      | -           | Path to the image relative to the `/public/images` directory |
| `alt`      | `string`                                                 | Yes      | -           | Alternative text for the image                               |
| `width`    | `number`                                                 | Yes      | -           | Width of the image in pixels                                 |
| `height`   | `number`                                                 | Yes      | -           | Height of the image in pixels                                |
| `loading`  | `"eager" \| "lazy" \| null \| undefined`                 | No       | `undefined` | Image loading behavior                                       |
| `decoding` | `"async" \| "auto" \| "sync" \| null \| undefined`       | No       | `undefined` | Image decoding behavior                                      |
| `format`   | `"auto" \| "avif" \| "jpeg" \| "png" \| "svg" \| "webp"` | No       | `undefined` | Output format for the image                                  |
| `class`    | `string`                                                 | No       | `undefined` | CSS classes to apply to the image                            |
| `style`    | `any`                                                    | No       | `undefined` | Inline styles to apply to the image                          |

### Examples

#### Basic Image with Lazy Loading

```astro
<ImageMod
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  loading="lazy"
/>
```

#### Image with Custom Format and Styling

```astro
<ImageMod
  src="/images/profile.png"
  alt="Profile picture"
  width={200}
  height={200}
  format="webp"
  class="rounded-full"
  style={{ objectFit: "cover" }}
/>
```

### File Structure

Our images should be placed in the `/public/images` directory of our Astro project:

```
our-project/
├── public/
│   └── images/
│       ├── hero.jpg
│       ├── profile.png
│       └── other-images.{jpeg,jpg,png,svg,gif}
├── src/
│   └── components/
│       └── ImageMod.astro
└── astro.config.mjs
```

### Error Handling

The component will automatically check if the image exists in the specified path. If the image is not found, it will:

1. Not render the image component
2. Display a red console error message indicating which image failed to load

### Important Notes

1. All images must be placed in the `/public/images` directory or its subdirectories
2. Supported image formats: `.jpeg`, `.jpg`, `.png`, `.svg`, `.gif`
3. The `src` prop should be relative to the `/public` directory (e.g., `/images/my-image.jpg`)
4. Width and height props are required for proper image optimization

## Related Astro Documentation

For more information about image handling in Astro, refer to:

- [Astro Image Integration](https://docs.astro.build/en/guides/images/)
- [Image Component API](https://docs.astro.build/en/guides/images/#image--astroassets)
- [Image Optimization](https://docs.astro.build/en/guides/images/#image-optimization)

### TypeScript Support

The component includes full TypeScript support with proper type definitions for all props.

#### Conclusion

Image optimization is crucial for improving the performance, SEO, and user experience of any website. By leveraging Astro's Image Integration and our custom image component in Astroplate, you can streamline your image management process while ensuring optimal load times and visual quality.

We hope this guide has helped you better understand how to optimize images in Astro.js. Feel free to explore more about Astroplate and integrate it into your projects for a smoother development experience!

If you're interested in discovering more about other useful Astro.js integrations, be sure to check out our dedicated blog post on the topic - <A href="https://themefisher.com/best-astrojs-integration">Best Astrojs Integration.</A>
