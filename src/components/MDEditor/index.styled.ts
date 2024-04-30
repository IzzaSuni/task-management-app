import { MDXEditor as MDXEditorBase } from "@mdxeditor/editor";
import styled, { createGlobalStyle } from "styled-components";

export const MDXEditor = styled(MDXEditorBase)`
  .mdxeditor-toolbar {
    background: ${({ theme }) => theme.colors.background};
    display: ${({ readOnly }) => (readOnly ? "none" : "block")};
    padding: 0 !important;
  }

  * {
    color: ${({ theme }) => theme.colors.text};
  }

  svg {
    height: 18px;
    width: 18px;
  }
`;

export const MDXGlobalStyle = createGlobalStyle`
.mdxeditor-popup-container {
    div {
      background: ${({ theme }) => theme.colors.background};
      div {
        div {
          div {
            background: transparent !important;
          }
        }
      }
    }
  }

.toolbar-container{
  button {
      background: ${({ theme }) => theme.colors.background};
  }
}
`;
