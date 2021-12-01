import { theme } from '@styles/themes'
import styled, { css } from 'styled-components'
import _get from 'lodash/get'

type StyledTextProps = {
  $color: keyof Colors
  $fontSize: string
  $weight: number
  $secondary: boolean
}

const StyledText = styled.span<StyledTextProps>`
  color: ${({ $color, theme }) => getColor(theme.colors, $color)};
  font-weight: ${({ $weight }) => $weight};
  font-size: ${({ $fontSize }) => $fontSize};
  font-family: Roboto;

  ${({ $secondary }) =>
    $secondary &&
    css`
      font-family: Lato, sans-serif;
      font-style: italic;
      font-weight: 600;
      letter-spacing: 0.5px;
      color: ${({ theme }) => theme.colors.wheaty_3};
    `}
`

type TextProps = {
  children: React.ReactNode
  color?: keyof Colors
  fs?: string
  weight?: number
  style?: React.CSSProperties
  secondary?: boolean
}

type Colors = typeof theme.colors

const getColor = (colors: Colors, color: keyof Colors) => {
  return _get(colors, color)
}

export default function Text({
  children,
  color = 'wheaty_2',
  fs = '16px',
  weight = 400,
  secondary = false,
  ...rest
}: TextProps) {
  return (
    <StyledText
      {...rest}
      $color={color}
      $weight={weight}
      $fontSize={fs}
      $secondary={secondary}
    >
      {children}
    </StyledText>
  )
}
