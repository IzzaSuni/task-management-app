import { Button, FlexBox } from "@/components/core";
import styled from "styled-components";

export const Container = styled(Button)<{ isActive?: boolean }>`
  border-radius: 8px;

  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.backgroundFaded : "transparent"};

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundFaded};
  }
`;
