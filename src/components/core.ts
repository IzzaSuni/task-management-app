import {
  space,
  width,
  fontSize,
  color,
  flexbox,
  layout,
  typography,
  grid,
  background,
  border,
  position,
  shadow,
  SpaceProps,
  WidthProps,
  FontSizeProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  TypographyProps,
  GridProps,
  BackgroundProps,
  BorderProps,
  PositionProps,
  ShadowProps,
  fontWeight,
} from "styled-system";
import BaseMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { CSSObject, styled } from "styled-components";

export type StyledSystemProps = SpaceProps &
  WidthProps &
  FontSizeProps &
  ColorProps &
  FlexboxProps &
  LayoutProps &
  TypographyProps &
  GridProps &
  BackgroundProps &
  BorderProps &
  PositionProps &
  ShadowProps;

export default function element<T extends keyof JSX.IntrinsicElements>(
  elementTag: T
) {
  return styled(elementTag)<
    StyledSystemProps & { cssStyle?: CSSObject; gap?: number; dataCy?: string }
  >`
    ${space}
    ${width}
  ${fontSize}
  ${color}
  ${flexbox}
  ${layout}
  ${typography}
  ${grid}
  ${background}
  ${border}
  ${position}
  ${shadow}
  ${fontWeight}



  ${({ cssStyle }) => cssStyle}
  `;
}

export const TextField = styled(element("input"))`
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;

  &:focus-visible {
    outline: none;
  }
`;
export const Img = styled(element("img"))``;
export const Box = styled(element("div"))`
  box-sizing: border-box;
`;

export const FlexBox = styled(Box)(({ gap }) => ({
  display: "flex",
  gap: gap ? gap * 4 + "px" : 0,
}));

export const EllipsisContainer = styled(FlexBox)`
  overflow: hidden;

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Text = styled(element("p"))`
  color: ${({ theme, color }) => color ?? theme.colors.text};
`;

export const StyledButton = styled(element("button"))<StyledSystemProps>`
  height: fit-content;
  background: ${({ background }) => background ?? "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ border }) => border ?? "none"};
  cursor: pointer;
  gap: ${({ gap }) => (gap ? gap * 4 + "px" : 0)};
`;

export const Markdown = styled(BaseMarkdown).attrs(() => ({
  remarkPlugins: [remarkGfm],
}))`
  * {
    color: ${({ theme }) => theme.colors.text};
  }
`;
