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
  font-weight: ${({ $weight }) => $weight || 400};
  font-size: ${({ $fontSize }) => $fontSize || '16px'};
  font-family: Roboto;

  ${({ theme, $secondary, $weight = 600, $color }) =>
    $secondary &&
    css`
      font-family: Lato, sans-serif;
      font-style: italic;
      font-weight: ${$weight};
      letter-spacing: 0.5px;
      color: ${getColor(theme.colors, $color || 'wheaty_3')};
    `}
`

type TextProps = {
  children: React.ReactNode
  color?: keyof Colors
  fs?: string
  weight?: number
  style?: React.CSSProperties
  secondary?: boolean
  className?: string
}

type Colors = typeof theme.colors

const getColor = (colors: Colors, color: keyof Colors = 'text_1') => {
  return _get(colors, color)
}

const Text = ({
  children,
  color,
  fs,
  weight,
  secondary = false,
  className = '',
  ...rest
}: TextProps) => {
  return (
    <StyledText
      {...rest}
      $color={color}
      $weight={weight}
      $fontSize={fs}
      $secondary={secondary}
      className={`atom-text ${className}`}
    >
      {children}
    </StyledText>
  )
}

const h0Props: Partial<TextProps> = {
  fs: '32px',
  weight: 500,
  style: { margin: '8px 0' },
}

const h1Props: Partial<TextProps> = {
  fs: '24px',
  weight: 500,
  style: { margin: '8px 0' },
}

const h2Props: Partial<TextProps> = {
  fs: '20px',
  weight: 500,
  style: { margin: '4px 0' },
}

const override = (props) => {
  return (incomingProps) => ({
    ...props,
    ...incomingProps,
  })
}

Text.h0 = styled(Text).attrs(override(h0Props))``
Text.h1 = styled(Text).attrs(override(h1Props))``
Text.h2 = styled(Text).attrs(override(h2Props))``

Text.accent = styled(Text).attrs((props) => ({
  fs: '18px',
  secondary: true,
  color: 'text_1',
  weight: 400,
  ...props,
}))``

export default Text
