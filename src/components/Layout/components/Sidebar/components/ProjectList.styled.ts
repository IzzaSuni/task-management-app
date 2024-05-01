import { FlexBox } from "@/components/core";
import styled from "styled-components";

export const Container = styled(FlexBox)<{ isActive?: boolean }>`
  border-radius: 8px;

  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.backgroundFaded : "transparent"};

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundFaded};
  }
`;
