import { getStyle, theme } from '@styles/themes'
import styled, { css } from 'styled-components'
import _get from 'lodash/get'

type Colors = typeof theme.colors
type Size = typeof theme.text

type StyledTextProps = {
  $color: keyof Colors
  $fontSize: keyof Size
  $weight: number
  $secondary: boolean
}

const StyledText = styled.span<StyledTextProps>`
  color: ${({ $color, theme }) => getColor(theme.colors, $color)};
  font-size: ${(theme) => getStyle('text', theme.$fontSize)(theme)};
  font-weight: ${({ $weight }) => $weight};

  ${({ theme, $secondary, $weight = 600 }) =>
    $secondary &&
    css`
      font-family: Lato, sans-serif;
      font-style: italic;
      font-weight: ${$weight};
      letter-spacing: 0.5px;
      color: ${getColor(theme.colors, 'text_2')};
    `}
`

type TextProps = {
  children: React.ReactNode
  color?: keyof Colors
  fs?: keyof Size
  weight?: number
  style?: React.CSSProperties
  secondary?: boolean
  className?: string
}

const Text = ({
  color = 'text_1',
  fs = 'body',
  weight = 400,
  secondary = false,
  ...props
}: TextProps) => {
  return (
    <StyledText
      $color={color}
      $weight={weight}
      $fontSize={fs}
      $secondary={secondary}
      {...props}
    />
  )
}

const getColor = (colors: Colors, color: keyof Colors = 'text_1') => {
  return _get(colors, color)
}

export const Header = ({
  as: fs = 'h2',
  ...props
}: { as: keyof Size } & TextProps) => {
  const Content = <Text {...props} fs={fs} />

  if (fs === 'h1') {
    return <h1>{Content}</h1>
  }

  if (fs === 'h2') {
  }

  if (fs === 'h3') {
    return <h3>{Content}</h3>
  }

  if (fs === 'h4') {
    return <h4>{Content}</h4>
  }

  if (fs === 'h5') {
    return <h5>{Content}</h5>
  }

  return <h2>{Content}</h2>
}

Text.accent = styled(Text).attrs((props) => ({
  secondary: true,
  ...props,
}))``

export default Text
