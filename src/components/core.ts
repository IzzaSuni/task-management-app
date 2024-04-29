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

export const Box = styled(element("div"))``;

export const FlexBox = styled(Box)({ display: "flex" });
export const Text = styled(element("p"))`
  color: ${({ theme, color }) => color ?? theme.colors.text};
`;

export const StyledButton = styled(element("button"))<StyledSystemProps>`
  height: fit-content;
  background: ${({ background }) => background ?? "#a6cfd5"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #4f6fcf;

    p {
      color: white !important;
    }
  }
`;
