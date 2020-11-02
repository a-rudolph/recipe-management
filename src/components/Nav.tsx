import styled from 'styled-components'
import { Text } from './Text'

type NavProps = any

const StyledNav = styled.div`
  padding: 1rem;
  background-color: ${(props) => props.theme.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Nav = (props: NavProps) => {
  return (
    <StyledNav>
      <Text>hello navbar</Text>
    </StyledNav>
  )
}
