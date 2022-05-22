import { animated, useSpring } from 'react-spring'
import { CloseOutlined, FieldTimeOutlined } from '@ant-design/icons'
import { getColor, getStyle } from '@styles/themes'
import { PropsWithChildren, useState } from 'react'
import { Row, Button } from '@components/atoms'
import breakpoints from '@constants/breakpoints'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

const TimerCard = dynamic(() => import('@components/TimerCard'))

const StyledHeader = styled(Row)`
  padding: 4px 12px;

  .burger-button {
    height: 32px;
  }

  @media screen and (min-width: ${breakpoints.sm}px) {
    background: ${({ theme }) => theme.gradient};
    border-bottom: 1px solid ${getColor('mono_2')};
    box-shadow: ${getStyle('shade', 'small')};
  }
`

const StyledDropdownRow = styled(Row)`
  margin: 16px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
`

const Wrapper = styled(animated.div)`
  overflow-y: hidden;
`

const MenuDropdown = ({ children }: PropsWithChildren<{}>) => {
  const [isOpen, setIsOpen] = useState(false)

  const style = useSpring({
    maxHeight: isOpen ? 400 : 62,
    duration: 500,
  })

  // open timer icon
  const openStyle = useSpring({
    opacity: isOpen ? 0 : 1,
    duration: 200,
  })

  // close icon
  const closeStyle = useSpring({
    opacity: isOpen ? 1 : 0,
    duration: 200,
  })

  const toggle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <Wrapper style={style}>
      <StyledHeader justify='space-between' align='center'>
        {children}
        <Button className='burger-button' onClick={toggle} type='ghost'>
          <animated.div style={{ position: 'absolute', ...openStyle }}>
            <FieldTimeOutlined />
          </animated.div>
          <animated.div style={{ ...closeStyle }}>
            <CloseOutlined />
          </animated.div>
        </Button>
      </StyledHeader>
      <StyledDropdownRow>
        <TimerCard />
      </StyledDropdownRow>
    </Wrapper>
  )
}

export default MenuDropdown
