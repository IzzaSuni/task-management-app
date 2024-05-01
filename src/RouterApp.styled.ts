import styled, { createGlobalStyle } from "styled-components";
import { Box } from "./components/core";
import { theme } from "./constant/theme";

export const Wrapper = styled(Box)`
  svg {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.background};
  }

  .react-tooltip {
    z-index: 9999;
    opacity: 1 !important;
    background: ${({ theme }) => theme.colors.background} !important;
    box-shadow: ${({ theme }) =>
      `0 0 0 1px ${theme.colors.primary}, 0 4px 11px ${theme.colors.primary}`};
  }
`;
