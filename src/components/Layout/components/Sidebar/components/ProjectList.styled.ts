import { FlexBox } from "@/components/core";
import styled from "styled-components";

export const Container = styled(FlexBox)`
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundFaded};
    border-radius: 8px;
  }
`;
