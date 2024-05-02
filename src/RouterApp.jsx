import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTE } from "./constant/routes";
import "./index.css";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import useSelectTheme from "./hooks/useSelectTheme";
import { GlobalStyle, Wrapper } from "./RouterApp.styled";
import "@mdxeditor/editor/style.css";
import { Analytics } from "@vercel/analytics/react";

import { FlexBox, Text } from "./components/core";

const RootComponent = lazy(async () => await import("./pages"));

const router = createBrowserRouter([
  {
    path: ROUTE,
    element: <RootComponent />,
  },
]);

export default function RouterApp() {
  const { theme } = useSelectTheme();

  return (
    <ThemeProvider theme={theme}>
      <Suspense
        fallback={
          <FlexBox
            justifyContent={"center"}
            alignItems={"center"}
            height={"100vh"}
          >
            <Text fontSize={theme.size.xm}>loading...</Text>
          </FlexBox>
        }
      >
        <Analytics />
        <Wrapper>
          <GlobalStyle />
          <RouterProvider router={router} />
        </Wrapper>
      </Suspense>
    </ThemeProvider>
  );
}
