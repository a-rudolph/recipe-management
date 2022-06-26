import { getStyle, theme } from '@styles/themes'
import styled, { css } from 'styled-components'
import _get from 'lodash/get'
import _isNumber from 'lodash/isNumber'

type Colors = typeof theme.colors
type Size = typeof theme.text

type StyledTextProps = {
  $color?: keyof Colors
  $fontSize: keyof Size | number
  $weight: number
  $secondary: boolean
}

function isThemeProp<T>(property: T | number): property is T {
  return !_isNumber(property)
}

const StyledText = styled.span<StyledTextProps>`
  color: ${({ $color = 'text_1', theme }) => getColor(theme.colors, $color)};
  font-size: ${(props) => {
    const { $fontSize } = props

    if (!isThemeProp($fontSize)) {
      return `${$fontSize}px`
    }

    return getStyle('text', $fontSize)(props)
  }};
  font-weight: ${({ $weight }) => $weight};

  ${({ theme, $secondary, $weight = 600, $color = 'text_2' }) =>
    $secondary &&
    css`
      &.atom-text {
        font-family: Lato, sans-serif;
        font-style: italic;
        font-weight: ${$weight};
        letter-spacing: 0.5px;
        color: ${getColor(theme.colors, $color)};
      }
    `}

  b {
    color: ${getStyle('colors', 'wheaty_1')};
    letter-spacing: 1px;
  }
`

type TextProps = {
  children: React.ReactNode
  color?: keyof Colors
  fs?: keyof Size | number
  weight?: number
  style?: React.CSSProperties
  secondary?: boolean
  className?: string
}

const Text = ({
  color,
  fs = 'body',
  weight = 400,
  secondary = false,
  className,
  ...props
}: TextProps) => {
  return (
    <StyledText
      $color={color}
      $weight={weight}
      $fontSize={fs}
      $secondary={secondary}
      className={`atom-text ${className}`}
      {...props}
    />
  )
}

const getColor = (colors: Colors, color: keyof Colors = 'text_1') => {
  return _get(colors, color)
}

const Header = ({
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

Text.accent = styled(Text).attrs(({ className, ...props }) => ({
  className: `atom-text atom-text-accent ${className}`,
  secondary: true,
  ...props,
}))``

Text.Header = Header

export default Text
