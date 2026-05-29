import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/playfair-display/600-italic.css";
import "@fontsource/jetbrains-mono/400.css";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
