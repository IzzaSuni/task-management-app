import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTE } from "./constant/routes";
import "./index.css";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import useSelectTheme from "./hooks/useSelectTheme";
import { GlobalStyle, Wrapper } from "./RouterApp.styled";
import "@mdxeditor/editor/style.css";

const RootPage = lazy(async () => await import("./pages/index"));

const router = createBrowserRouter([
  {
    path: ROUTE,
    element: <RootPage />,
  },
]);

export default function RouterApp() {
  const { theme } = useSelectTheme();

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<>loading</>}>
        <Wrapper>
          <GlobalStyle />
          <RouterProvider router={router} />
        </Wrapper>
      </Suspense>
    </ThemeProvider>
  );
}
