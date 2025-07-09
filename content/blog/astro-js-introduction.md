---
title: What is Astro? A Step-by-Step Tutorial for Beginners in 2025
date: 2023-02-14
meta_title: ""
description: Learn Astro.js Framework - Your starting point for building modern web applications. Grasp core concepts, best practices, and real-world projects. Start your Astro journey today!
image: /blog-thumb/astro-js-intro.webp
author: Mehedi Sharif
last_update: 2025-02-01 #yyyy-mm-dd
sponsored: false
draft: false
categories:
  - Astro
---

<Toc/>

Astro is making waves in the web development community, as evident in the recent <A href="https://www.netlify.com/resources/ebooks/the-state-of-web-development-2023/"> Netlify State of Web Development survey 2023</A>, where it surpassed established static site generators (SSGs) like 11ty, Jekyll, and Hugo. But what's behind its rapid ascent? In this post, we'll dive into the driving forces behind Astro's popularity and explore its unique features and advantages that are revolutionizing the way we build websites.

Whether you're a seasoned web developer looking to level up your skills, a technical lead evaluating new technologies, or a newcomer eager to learn about modern web development best practices, this comprehensive introduction to Astro is designed to provide actionable insights and practical knowledge that you can apply to your next project. To help you get started, we'll also include a step-by-step tutorial to guide you through your first Astro project, so you can experience the benefits firsthand.

## Astro: A brief history

In 2021, Astro burst onto the scene, born from <A href="http://fredkschott.com/about/">Fred K</A>. Schott's vision to simplify the complexities of web development. By prioritizing performance and user experience, Astro introduced its groundbreaking " **islands architecture** " which enables developers to craft fast, content-driven websites by selectively hydrating only interactive components. This innovative approach minimizes unnecessary JavaScript, keeping most of the site static HTML.

Since its launch, Astro has gained significant traction within the developer community, becoming a go-to choice for those who prioritize speed and efficiency. By 2023, it made history as the first mainstream framework to integrate selective hydration, setting it apart from traditional single-page applications (SPAs). Astro empowers developers to leverage their preferred UI libraries, such as React or Vue, while benefiting from its performance optimizations.

Astro's rapid adoption is reflected in its impressive growth rates, with a significant portion of users expressing interest in continuing with the framework. By 2023, it earned recognition as a pioneer in selective hydration, distancing itself from traditional SPAs. This flexibility allows developers to use their preferred UI libraries while taking advantage of Astro's optimizations. As Astro continues to evolve, it remains committed to improving web performance and developer experience, solidifying its position as a key player in modern web development.

## Astro's Rising Popularity in Web Development

Several recent reports and surveys paint a compelling picture of Astro's growing popularity.Some notable examples included bellow :

**1**. <A href="https://www.netlify.com/resources/ebooks/the-state-of-web-development-2023/"> The 2023 Netlify State of Web Development Report</A>, surveying over **7,000 individuals** (primarily developers), reveals some key findings:

- Astro usage among respondents stands at 18%, surpassing other popular static site generators.
- 87% of Astro users intend to continue using the framework in the future, the highest rate among all SSGs surveyed.
- Astro experienced the highest positive satisfaction changes from 2022 to 2023 compared to other SSGs, a remarkable achievement that underscores its growing appeal among developers.

<Mockup src="/blog/the-state-of-development.webp" alt="Netlify State of Web Development Repor"/>

**2**. Another survey by the <A href="https://2023.stateofhtml.com/en-US/other_tools/">State of HTML</A> revealed interesting trends in SSG usage. While Next.js leads the pack with 40% adoption, Astro is hot on its heels, outpacing Nuxt, which trails behind with 12% of respondents.
<Mockup src="/blog/html-2023-survey.webp" alt=""/>

**3**. While GitHub stars aren't definitive proof of success, they do indicate a project's popularity. Astro's GitHub star count has skyrocketed, growing from 500 in 2020 to over 40,000 in 2024, reflecting its rapid adoption among developers.<A href="https://star-history.com/">Source</A>

<Mockup src="/blog/star-history-2024811.webp" alt=""/>

**4**. <A href="https://lookerstudio.google.com/u/0/reporting/55bc8fad-44c2-4280-aa0b-5f3f0cd3d2be/page/M6ZPC?params=%7B%22df44%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580WordPress%25EE%2580%2580Next.js%25EE%2580%2580Nuxt.js%25EE%2580%2580Gatsby%25EE%2580%2580Astro%25EE%2580%2580SvelteKit%25EE%2580%2580Remix%22%7D">Core Web Vital statistics</A> reveal that Astro consistently demonstrates a high percentage of origins with good CWV scores throughout the timeframe. It maintains a strong presence in the top tier alongside Next.js and Gatsby, often surpassing them in certain periods.

<Mockup src="/blog/astro-core-web-vitals-report.webp" alt=""/>

These findings, alongside Astro's innovative features and performance-focused approach, suggest that the framework is poised for continued growth and adoption in the web development community.

## Astro Uniqueness: Key Features of Astro

### Zero JavaScript by Default

Astro adopts an HTML-first philosophy, generating pages that require no JavaScript to render initially. This results in exceptionally fast load times, making it an ideal choice for static site generation while still allowing for dynamic content when needed.

### Islands Architecture

At the heart of Astro's design is its innovative islands architecture, which allows developers to create components that can be rendered as static HTML or enhanced with JavaScript selectively. This means that the majority of your site remains lightweight, while specific interactive elements can be added seamlessly, ensuring optimal performance.

### Framework Agnostic

Astro empowers developers with the flexibility to integrate their favorite UI frameworks, such as React, Vue, or Svelte. This "Bring Your Own Framework" approach allows teams to leverage their existing expertise and tools, creating a more adaptable development environment.

### Modular Component Design

Astro promotes a component-based architecture, enabling the creation of reusable UI elements. This modularity enhances code organization, simplifies collaboration, and makes it easier to maintain and scale applications over time.

### Blazing Fast Performance

Built for speed, Astro utilizes static site generation and smart caching strategies to deliver high-performance websites. By pre-rendering pages and serving them via a Content Delivery Network (CDN), Astro ensures rapid load times and improved user experiences.

### Streamlined Data Management

Astro simplifies the process of integrating various data sources and APIs. Developers can fetch data from multiple origins and render it alongside static content, resulting in cleaner code and reduced complexity.

### Hybrid Rendering Capabilities

With Astro, developers can choose which routes to pre-render statically and which to render dynamically on the server. This hybrid approach allows for a tailored mix of static and dynamic content, accommodating diverse project needs.

### SEO Optimization

Astro's emphasis on static content and fast loading speeds naturally enhances search engine optimization (SEO). Websites built with Astro are more likely to rank higher due to their quick load times and relevant content delivery.

### Accessibility Tools

Astro is committed to creating inclusive web experiences. It includes features that help developers address accessibility concerns, ensuring that applications are usable by a wider audience. The Astro Dev Toolbar assists in identifying and resolving accessibility issues during development.

### Active Community and Continuous Improvement

The Astro framework benefits from a vibrant community of developers and regular updates that introduce new features, enhancements, and bug fixes. This ongoing development ensures that Astro remains at the forefront of modern web development practices.
These distinctive features position Astro as a powerful and flexible framework for building contemporary web applications, particularly those that prioritize performance, user experience, and content delivery.

### Comparison to Other Frameworks

Astro effectively combines the best aspects of pre-rendering, on-demand generation, and interactive components. This makes it an excellent choice for building fast and flexible websites, particularly those centered around content.

| Feature/Framework     | Astro                    | Next.js              | Nuxt.js              | Remix               |
| --------------------- | ------------------------ | -------------------- | -------------------- | ------------------- |
| Rendering Type        | Static & Dynamic         | Static & Server-Side | Static & Server-Side | Server-Side         |
| JavaScript by Default | Zero JavaScript          | JavaScript Required  | JavaScript Required  | JavaScript Required |
| Islands Architecture  | Yes                      | No                   | No                   | No                  |
| Framework Agnostic    | Yes (React, Vue, Svelte) | Primarily React      | Primarily Vue        | Primarily React     |
| Hybrid Rendering      | Yes                      | Limited              | Limited              | Yes                 |
| Data Fetching         | Unified & Simplified     | Complex              | Complex              | Simplified          |
| SEO Optimization      | High (fast load times)   | Good                 | Good                 | Good                |
| Community Support     | Growing & Vibrant        | Established & Large  | Established & Large  | Growing             |
| Performance Focus     | High                     | Moderate             | Moderate             | High                |

**Let's explore some ideal use cases for Astro.**

### Use cases

Astro's versatility makes it suitable for a wide range of projects:

- **Static Websites**: Build fast, SEO-friendly sites like blogs, portfolios, and informational pages.

- **Content-Rich Platforms**: Handle large volumes of content efficiently for news outlets, educational platforms, and documentation sites.

- **Multi-Page Applications (MPAs)**: Develop complex websites without the overhead of single-page applications.

- **Dynamic and personalized content**: Deliver engaging experiences with interactive elements without sacrificing performance.

- **Progressive Web Applications (PWAs)**: Build offline-capable and fast-loading web applications.Astro's ability to integrate with various frameworks and its emphasis on performance make it a compelling choice for many web development projects.

- **Documentation Sites**
  Astro's seamless integration with various front-end frameworks makes it perfect for documentation websites that may need interactive examples and demos embedded in the content, benefiting tech companies and open-source projects alike.

Additionally, Astro offers an official <A href="https://github.com/withastro/starlight">Starlight theme</A> specifically designed for documentation purposes. This theme enhances the user experience by providing a clean and organized layout, making it easier for users to navigate and access information.

Astro's official site features a rich collection of real-world website examples to inspire you.<A href="https://astro.build/showcase/">Have a look!</A>

**Let's dive into a practical example to see Astro in action.**

## Astro Project Setup: My Recipe Collection

### Project Overview

The "**My Recipe Collection**" is a website that displays a list of recipes, provides detailed pages for each recipe and includes an about page. We'll use TypeScript for type safety and markdown files to store recipe data.
The "My Recipe Collection" site will include the following features:

- **Home Page**: Displays a list of recipes.
- R**ecipe Detail Page**: Shows the details of each recipe.
- **About Page**: Provides information about the website.
- **Responsive Design**: Styled to be visually appealing on all devices.
- **Dynamic Content**: Uses markdown for recipe data.

### Prerequisites

Before you start, ensure you have the following installed:

- **Node.js**: Download and install Node.js if you haven't already.
- **npm**: Comes with Node.js and is required to install Astro and its dependencies.
- **Code Editor**: Choose a code editor to write your code. Popular options include VS Code, Sublime Text, and Atom.

### Step 1: Set Up a New Astro Project

#### Create a New Project

Open your Code Editor and run the following command to create a new Astro project:

```sh
npm create astro@latest
```

Here's my mini conversation with Astro CLI:

<Mockup src="/blog/my-recipie-collection.webp" alt=""/>

Navigate into your project directory:

`cd my-recipe-collection`

**Install Dependencies (if you didn’t previously in Astro CLI)**:

Run the following command to install the necessary dependencies -

`npm install`

#### Step 2: Define the Project Structure

Organize your project folders and files as follows:

```sh
my-recipe-collection/
├── src/
│   ├── components/
│   │   └── RecipeCard.astro
│   ├── content/
│   │   ├── recipes/
│   │   │   ├── recipe-1.md
│   │   │   └── recipe-1.md
│   └── config.ts
│   ├── layouts/
│   │   └── MainLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── [recipe].astro
│   └── styles/
│       └── global.css
├── package.json
└── astro.config.mjs

```

#### Step 3: Create the Main Layout

Create a layout component in `src/layouts/MainLayout.astro` to provide a consistent structure across your site:

```sh
—--
// src/layouts/MainLayout.astro
import "../styles/global.css";
---
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
  </head>
  <body>
    <header>
      <h1>My Recipe Collection</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <p>© 2025 Astro Recipe Collection</p>
    </footer>
  </body>
</html>
```

The `<slot />` element in Astro is a powerful feature used in components and layouts to define a placeholder for content that will be inserted dynamically from other parts of the site. It allows developers to create reusable templates or components that can display different content while maintaining a consistent structure. By using <slot />, you can build flexible layouts that can be used across multiple pages, with the specific content being provided by each page or component. This approach promotes reusability and clean code, as the main layout or component structure remains the same while allowing for dynamic content insertion.

#### Step 4: Create Components

**Recipe Card Component** - Create a reusable component for displaying each recipe summary in -

`src/components/RecipeCard.astro`:

```
//src/components/RecipeCard.astro:
const { recipe } = Astro.props;
const { title, description } = recipe.data;

<div class="recipe-card">
  <h2>{title}</h2>
  <p>{description}</p>
  <a href={recipe.slug}>View Recipe</a>
</div>
```

#### Step 5: Create Pages

**Home Page (`index.astro`)**

Displays a list of all recipes using the RecipeCard component:

```
// src/pages/index.astro
import { getCollection } from "astro:content";
import RecipeCard from "../components/RecipeCard.astro";
import MainLayout from "../layouts/MainLayout.astro";

const recipes = await getCollection("recipes");

<MainLayout title="Home">
  <h2>Our Recipes</h2>
  <div class="recipe-list">
    {recipes.map((recipe) => <RecipeCard recipe={recipe} />)}
  </div>
</MainLayout>
```

**Recipe Detail Page (`recipe.astro`)**

Handles dynamic routing to display detailed information about each recipe:

```
// src/pages/[recipe].astro
import { getCollection } from "astro:content";
import MainLayout from "../layouts/MainLayout.astro";

export async function getStaticPaths() {
  const recipes = await getCollection("recipes");

  const paths = recipes.map((recipe: any) => {
    return {
      params: {
        recipe: recipe.slug,
      },
      props: { recipe },
    };
  });

  return paths;
}

const { recipe } = Astro.props;
const { title, description, ingredients } = recipe.data;
const { Content } = await recipe.render();

<MainLayout title={title}>
  <article>
    <h1>{title}</h1>
    <p>{description}</p>
    <p><strong>Ingredients:</strong></p>
    <ul>
      {ingredients.map((ingredient: string) => <li>{ingredient}</li>)}
    </ul>
    <div>
      <Content />
    </div>
  </article>
</MainLayout>
```

**About Page (`about.astro`)**

Provides information about the recipe collection site:

```
// src/pages/about.astro
import MainLayout from "../layouts/MainLayout.astro";

<MainLayout title="About">
  <h2>About This Collection</h2>
  <p>
    Welcome to the Astro Recipe Collection, where you can find a variety of
    delicious recipes to try at home.
  </p>
</MainLayout>
```

#### Step 6: Create Markdown Files for Recipes

Store each recipe in a markdown file within the src/content directory.

Recipe 1
Create `src/content/recipe-1.md`:

```
title: "Spaghetti Carbonara"
description: "A classic Italian pasta dish with creamy sauce."
ingredients:
  - "200g spaghetti"
  - "100g pancetta"
  - "2 large eggs"
  - "50g grated Parmesan cheese"
  - "Salt and black pepper"

#### Instructions
1. Cook the spaghetti according to the package instructions.
2. In a separate pan, fry the pancetta until crisp.
3. Beat the eggs and mix with Parmesan cheese.
4. Drain the spaghetti and combine with the pancetta and egg mixture.
5. Serve immediately with extra cheese on top.
```

Recipe 2
Create `src/content/recipe-2.md`:

```
title: "Classic Pancakes"
description: "Fluffy pancakes perfect for breakfast."
ingredients:
  - "1 cup flour"
  - "2 tbsp sugar"
  - "1 tsp baking powder"
  - "1/2 tsp salt"
  - "1 cup milk"
  - "1 egg"
  - "2 tbsp melted butter"

#### Instructions

1. Mix dry ingredients in a bowl.
2. Add milk, egg, and butter to the dry ingredients and stir until combined.
3. Heat a non-stick pan and pour batter to form pancakes.
4. Cook until bubbles form, then flip and cook until golden brown.
5. Serve with syrup or toppings of your choice.
```

#### Step 7: Configure Content Collections

Create a content schema to validate your markdown data. Add the following code to :

`src/content/config.ts`:

```
import { z, defineCollection } from "astro:content";

const recipesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    ingredients: z.array(z.string()),
  }),
});

export const collections = {
  recipes: recipesCollection,
};

```

#### Step 8: Add Global Styles

Create a global stylesheet in `src/styles/global.css`:

```
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

header {
  background: #ff6347;
  color: #fff;
  padding: 1rem 0;
  text-align: center;
}

nav a {
  color: #fff;
  margin: 0 0.5rem;
  text-decoration: none;
}

main {
  padding: 1rem;
}

footer {
  background: #333;
  color: #fff;
  text-align: center;
  padding: 1rem 0;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.recipe-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
}

.recipe-card h2 {
  margin-top: 0;
}

.recipe-card a {
  color: #ff6347;
  text-decoration: none;
}
```

### Explanation

**Content Collections**: Use Astro's content collections to manage and validate your markdown content.

**TypeScript**: Utilize TypeScript interfaces for type safety and clearer code structure.

**Dynamic Routing**: [recipe].astro handles dynamic URL routing based on the recipe's slug.

**Components**: Create reusable UI components like RecipeCard to simplify the codebase.

> Here you will get the full code : https://github.com/themefisher/my-recipe-collection

You've now set up a fully functional "**My Recipe Collection**" project with TypeScript. This tutorial covered the basics of using Astro.js to build a static site with dynamic routing, markdown content, and reusable components. From here, you can expand the project with additional features like search functionality, filtering recipes, or user-generated content. Enjoy building with Astro.js!

### Astro's Rich Ecosystem: Themes, Templates, Integrations, and Documentation

Astro offers a robust ecosystem to support developers in creating exceptional websites.

#### Themes and Templates

Kickstart your project with professionally designed layouts and styles. Choose from the official Astro theme library, explore community-created options, or discover premium templates on platforms like Themefisher. With a vast selection of both free and paid options, you'll find the perfect starting point for your website.

Themefisher boasts a wide range of free and premium Astro themes, offering developers expertly crafted templates to match any project.

> Themefisher boasts a wide range of free and premium <A rel="dofollow" href="https://themefisher.com/astro-themes" >Astro themes</A>, offering developers expertly crafted templates to match any project.
> **Theme Repository**: A collection of themes created by the Astro community to meet diverse requirements.

#### Integrations

Astro's versatility is enhanced by <A href="https://astro.build/integrations/">seamless integration</A> with a wide range of tools and services.Seamlessly connect Astro with your preferred tools and services, including popular JavaScript frameworks, build tools, deployment platforms, and content management systems. Here, you will find your preferred integration suitable for your project.

#### Documentation

Astro provides comprehensive and well-structured <A href="https://docs.astro.build/en/getting-started/"> documentation </A> to guide developers through the process. It covers:

- Core concepts and features
- Installation and setup
- Component development
- Routing and navigation
- Deployment
- Troubleshooting
- API reference

The documentation is designed to be user-friendly and accessible, making it easy to learn and use Astro effectively.

## Astro: Backed by a Thriving Community

Astro benefits from a strong community that offers consistent support, regular updates, and frequent meetups, making it a great choice for developers of all levels. Here's how you can tap into this vibrant community:

<A href="https://astro.build/chat"> Discord </A>: Join the official Astro Discord server for real-time chat, troubleshooting help, and discussions with other Astro developers.Here you can connect and collaborate with 30,000+ Astro enthusiasts.

<A href="https://www.reddit.com/r/astrojs/"> Reddit </A>: Subscribe to the r/astrojs subreddit for news, discussions, and project showcases.

<A href="https://x.com/astrodotbuild"> X </A>: Follow the official Astro Twitter account for updates, announcements, and community highlights.

#### Conclusion

Astro is undoubtedly a framework to watch in the ever-evolving landscape of web development With its focus on performance, developer experience, and flexibility.
As you continue your Astro journey, explore the framework's rich ecosystem of integrations, themes, and community resources to unlock even greater potential.
Happy coding with Astro!

**Recommended Reading:**

- <A href="https://themefisher.com/tailwind-css-with-astro" rel="follow"> How to Integrate Tailwind CSS with Astro </A>

- <A rel="follow" href="https://themefisher.com/best-astrojs-integration"> A Collection of Best Astrojs Integration </A>

- <A href="/best-astro-themes"> A Collection of Best Astro Themes </A>
