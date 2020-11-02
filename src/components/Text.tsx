import styled from 'styled-components'

const StyledText = styled.div`
  color: ${(props) => props.theme.mono};
  font-weight: ${(props) => (props.strong ? 600 : 400)};
  font-size: ${(props) => props.size};
`

type TextProps = {
  strong?: boolean
  size?: string
}

export const Text = (props: TextProps) => {
  const { strong, size, ...rest } = props

  return <StyledText strong={strong} size={size} {...rest} />
}
