import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTE } from "./constant/routes";
import "./index.css";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import useSelectTheme from "./hooks/useSelectTheme";
import { GlobalStyle, Wrapper } from "./RouterApp.styled";
import "@mdxeditor/editor/style.css";
import Root from "./pages";
import { FlexBox, Text } from "./components/core";

const router = createBrowserRouter([
  {
    path: ROUTE,
    element: <Root />,
  },
]);

export default function RouterApp() {
  const { theme } = useSelectTheme();

  return (
    <ThemeProvider theme={theme}>
      <Suspense
        fallback={
          <FlexBox justifyContent={"center"} alignItems={"center"}>
            <Text fontSize={theme.size.l}>loading</Text>
          </FlexBox>
        }
      >
        <Wrapper>
          <GlobalStyle />
          <RouterProvider router={router} />
        </Wrapper>
      </Suspense>
    </ThemeProvider>
  );
}
