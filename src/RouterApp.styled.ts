import styled from "styled-components";
import { Box } from "./components/core";

export const Wrapper = styled(Box)`
  svg {
    color: ${({ theme }) => theme.colors.text};
  }
`;
