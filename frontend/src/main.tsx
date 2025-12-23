import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import "./index.css";
import HealthPage from "./pages/HealthPage";
import TodosPage from "./pages/Todos";
import ResumePage from "./pages/Resume";
import CertsPage from "./pages/Certs";

// Import your components
import RootLayout from "./RootLayout";
import Home from "./components/Home";

// 1. Create a root route (The Shell)
const rootRoute = createRootRoute({
  component: RootLayout,
});

// 2. Create the Index route (Home page "/")
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const healthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/health", // This is the URL path
  component: HealthPage,
});

const todosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/todos", // This is the URL path
  component: TodosPage,
});

const resumeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resume", // This is the URL path
  component: ResumePage,
});

const certsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/certs", // This is the URL path
  component: CertsPage,
});

// 3. Create a Catch-All route for your Docs links
// This stops the app from crashing when you click "Alert Dialog" or "Docs" in the menu
const docsRoute = createRoute({
  getParentRoute: () => rootRoute,
  // The '$' matches anything. So /docs, /docs/installation all go here.
  path: "$",
  component: () => (
    <div className="container mx-auto text-center mt-20">
      <h1 className="text-2xl font-bold">Documentation Page</h1>
      <p className="text-muted-foreground">This page hasn't been built yet.</p>
    </div>
  ),
});

// 4. Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  docsRoute,
  healthRoute,
  todosRoute,
  resumeRoute,
  certsRoute,
]);

// 5. Create the router
const router = createRouter({ routeTree });

// Register the router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
