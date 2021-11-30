import { theme } from '@styles/themes'
import styled from 'styled-components'
import _get from 'lodash/get'

type StyledTextProps = {
  $color: keyof Colors
  $fontSize: string
  $weight: number
}

const StyledText = styled.span<StyledTextProps>`
  color: ${({ $color, theme }) => getColor(theme.colors, $color)};
  font-weight: ${({ $weight }) => $weight};
  font-size: ${({ $fontSize }) => $fontSize};
  font-family: Roboto;
`

type TextProps = {
  children: React.ReactNode
  color?: keyof Colors
  fs?: string
  weight?: number
  style?: React.CSSProperties
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
  ...rest
}: TextProps) {
  return (
    <StyledText {...rest} $color={color} $weight={weight} $fontSize={fs}>
      {children}
    </StyledText>
  )
}
