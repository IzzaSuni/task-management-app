import { FlexBox } from "@/components/core";
import styled from "styled-components";

export const Container = styled(FlexBox)`
  border-radius: 8px;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundFaded};
  }
`;
