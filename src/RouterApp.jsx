import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HOME_ROUTES } from "./constant/routes";
import "./index.css";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import useSelectTheme from "./hooks/useSelectTheme";

const RootPage = lazy(async () => await import("./pages/index"));

const router = createBrowserRouter([
  {
    path: HOME_ROUTES,
    element: <RootPage />,
  },
]);

export default function RouterApp() {
  const { theme } = useSelectTheme();

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<>loading</>}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}
