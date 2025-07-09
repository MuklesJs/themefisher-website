---
title: How to Build Single Page Application (SPA) with Astro
date: 2023-02-14
meta_title: ""
description: Learn how to build performant and interactive Single-Page Applications (SPAs) with AstroJS. Discover the benefits of Astro’s component-based architecture and server-side rendering capabilities.
image: /blog-thumb/spa-with-astro.webp
author: Mehedi Sharif
last_update: 2024-10-02 #yyyy-mm-dd
sponsored: false
draft: false
categories:
  - Astro
---

<Toc/>

## Building a Single Page Application (SPA) with Astro: A Unique Approach

Building a Single Page Application (SPA) with Astro might not be the first thing that comes to mind. Astro is typically known for creating content-rich Multi-Page Applications (MPAs) and static websites, focusing on minimizing JavaScript to boost performance. So why would you use Astro to build an SPA?

The answer is surprisingly simple: Astro allows you to build SPAs alongside your static and server-rendered pages. This combination gives you the best of both worlds: high performance, SEO-optimized pages for your marketing needs and a robust, dynamic SPA for interactive features.

In this article, we'll dive into how to build an SPA with Astro while integrating modern tools like React, React Router, and Node.js to build a complete web application.

### Why Build a SPA with Astro?

Astro is commonly associated with building blazing-fast static websites, with minimal JavaScript being sent to the browser. However, there’s more under Astro’s hood. You can actually build an SPA within Astro while still taking advantage of its unique architecture for static content. By doing so, you can deliver a powerful hybrid experience: a fast-loading, SEO-friendly site for your main pages, while still offering dynamic functionality in areas where it’s needed.

## Astro's Versatility: MPA and SPA in One Framework

The beauty of Astro is its flexibility. You can build traditional static websites and also integrate an SPA without switching frameworks. For instance, you can keep your marketing and blog pages as fully static, leveraging Astro’s strength in fast page delivery. Meanwhile, the more interactive parts of your site (like dashboards or user profiles) can function as a single-page application, using dynamic React components.

## Setting Up Your Astro Project

### Initializing a New Astro Project

Before we jump into the SPA build, let’s set up our Astro environment. To create a new Astro project, simply run:

```bash
npm create astro@latest
```

This will guide you through creating a new Astro project with the necessary configurations.

### Adding React and Node.js Support

Once your project is initialized, you'll need to add support for React (since our SPA will be built using React) and Node.js as the backend:

```bash
npx astro add react
npx astro add node
```

These commands will configure Astro to support React components and set up Node.js as the backend runtime for your project.

## Installing React Router

React Router is essential for SPA navigation. To install it, run the following command:

```bash
npm install react-router-dom
```

This allows us to create multi-page navigation inside the SPA using React components.

## Creating the SPA Structure

Now we’ll start building the SPA itself. We'll create React components for each page of the SPA.

### Defining the Basic Components

Create 3 new files called `Dashboard.tsx, Settings.tsx, Profile.tsx` in our `src/components/functional/` folder. Here is an example of one of the file how they could look:

```jsx
const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
```

These files represent the individual pages of the SPA.

### Building a Navbar with React Router

Next, create a navigation bar using React Router's `Link` component. We're creating this `Nav.tsx` file in our `/components/functional` folder:

```jsx
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/dashboard/settings">Settings</Link>
        </li>
        <li>
          <Link to="/dashboard/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};
```

This navbar will allow users to navigate between the different sections of the SPA.

### Setting up SPA Layouts with Outlet

To manage our spa layout, we’ll use React Router’s `Outlet` component:

```jsx
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div>
    <Nav />
    <div>
      <Outlet />
    </div>
  </div>
);
```

The `Outlet` will render the currently active page based on the navigation.

## Defining Routes in React Router

Now, let’s configure our routes. Create `App.tsx` file in `/components/functional` folder and use `createBrowserRouter` in to define how users navigate through the SPA:

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "settings", element: <Settings /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

export const App = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

This setup creates a dashboard with three subpages: Settings, Profile, and Dashboard itself.

## Integrating the SPA into Astro

### Setting Up the Catch-All Route

To integrate your SPA into the Astro framework, we need to set up a catch-all route for the SPA. In Astro, create a new file `src/pages/dashboard/[...all].astro` to route all `/dashboard` requests to the React application.

### Rendering the SPA with Astro Layouts

Inside the catch-all route file, import your React app and render it within Astro’s layout:

```javascript
---
import { App } from "../../components/app";
import Layout from "../../layouts/Layout.astro";

export const prerender = false;
---

<Layout title="Dashboard">
  <App client:only="react />
</Layout>
```

Using `client:only="react"` ensures that React is only rendered on the client side, which is critical for dynamic SPAs. And `prerender = false` tells Astro not to prerender this page, as it will be handled by React.

And for prererendering we need an adapter for the server. You can use `@astrojs/vercel` for this purpose. Install it with:

```bash
yarn astro add vercel
```

## Running Your SPA in Astro

Once all configurations are in place, run your project with:

```bash
npm run dev
```

Visit `http://localhost:4321/dashboard`, and you'll see your React SPA fully integrated within your Astro project.

## Going Beyond: Adding tRPC and React Query for Data Fetching

To enhance your SPA, consider adding libraries like tRPC and React Query. tRPC allows type-safe communication between your client and server, while React Query handles efficient data fetching. Together, they can manage complex client-server communication, perfect for apps that require real-time data updates.

## Benefits of Using Astro for SPA and API

Astro's flexibility means you can build both the front end and back end of your application in one framework. You can have your static pages, dynamic SPAs, and even a server-rendered API — all with Astro. The integration with React makes it easy to reuse components, while Astro ensures fast delivery of static content.

## Wrapping Up: Combining Astro’s Static and SPA Capabilities

By building your SPA within Astro, you can take advantage of both the performance benefits of static content and the interactivity of modern SPAs. This hybrid approach works well for small to medium-sized applications and provides a great balance between developer experience and performance.

## Github Repository

> If you're looking for the complete code setup, head over to our GitHub repository - <A href="https://github.com/themefisher/astroplate-single-page-application"> click here </A>

We've implemented this SPA technique in our Astro boilerplate, Astroplate. Clone the repo and dive into the code to explore Astroplate’s SPA capabilities.

### Conclusion

Building a Single Page Application with Astro opens up exciting possibilities. You can leverage Astro's speed and flexibility to deliver both static and dynamic content. Whether you’re looking to build a marketing site with interactive components or a full-fledged web app, Astro has the tools to make it happen. With additional tools like tRPC and React Query, you can take your Astro-SPA project even further.
