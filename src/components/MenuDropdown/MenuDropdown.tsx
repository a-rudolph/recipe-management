import { getColor, getStyle } from '@styles/themes'
import { PropsWithChildren, useState } from 'react'
import { Row, Button } from '@components/atoms'
import breakpoints from '@constants/breakpoints'
import BurgerMenu from '@components/BurgerMenu'
import styled from 'styled-components'

const StyledHeader = styled(Row)`
  padding: 4px 12px;

  .burger-button {
    font-size: unset;
  }

  @media screen and (min-width: ${breakpoints.sm}px) {
    background: ${({ theme }) => theme.gradient};
    border-bottom: 1px solid ${getColor('mono_2')};
    box-shadow: ${getStyle('shade', 'small')};
  }
`

const MenuDropdown = ({ children }: PropsWithChildren<{}>) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <StyledHeader justify='space-between' align='center'>
      {children}
      <Button className='burger-button' onClick={toggle} type='ghost'>
        <BurgerMenu isOpen={isOpen} />
      </Button>
    </StyledHeader>
  )
}

export default MenuDropdown
