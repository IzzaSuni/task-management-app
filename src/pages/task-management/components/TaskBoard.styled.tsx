import { FlexBox, TextField } from "@/components/core";
import styled from "styled-components";

export const TaskContainer = styled(FlexBox)`
  .Task {
    width: -webkit-fill-available;
  }

  .Due-date {
    width: calc(30% + 32px);
  }

  .Status {
    width: calc(20% + 32px);
  }
`;

export const TaskTextField = styled(TextField)`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export const SelectContainer = styled(FlexBox)`
  * {
    color: ${({ theme }) => theme.colors.text} !important;
  }

  .react-select-container {
    outline: none !important;
  }

  .react-select__control {
    background: transparent;
    font-size: ${({ theme }) => theme.size.s}px;
    border: none;
    box-shadow: none;
  }

  .react-select__indicators {
    span {
      display: none;
    }
  }

  .react-select__menu {
    z-index: 100000 !important;
    background: ${({ theme }) => theme.colors.background};
    box-shadow: ${({ theme }) =>
      `0 0 0 1px ${theme.colors.primary}, 0 4px 11px ${theme.colors.primary}`};
  }

  .react-select__option {
    font-size: ${({ theme }) => theme.size.s}px;
    background: transparent;
    cursor: pointer;
  }

  .react-select__option--is-selected {
    background: ${({ theme }) => theme.colors.backgroundFaded};
  }
`;
