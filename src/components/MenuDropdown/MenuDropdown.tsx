import { animated, useSpring } from 'react-spring'
import { CloseOutlined, FieldTimeOutlined } from '@ant-design/icons'
import { PropsWithChildren, useRef, useState } from 'react'
import { Row, Button } from '@components/atoms'
import breakpoints from '@constants/breakpoints'
import { Drawer } from 'antd'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import useScreenWidth from '@hooks/useScreenWidth'

const TimerCard = dynamic(() => import('@components/TimerCard'))

const StyledHeader = styled(Row)`
  padding: 4px 12px;

  .burger-button {
    height: 32px;
  }

  @media screen and (min-width: ${breakpoints.sm}px) {
    background: ${({ theme }) => theme.gradient};
  }
`

const StyledDropdownRow = styled(Row)`
  margin: 16px;
  padding-bottom: 16px;
  display: flex;
  justify-content: center;
`

const Wrapper = styled(animated.div)`
  overflow-y: hidden;
`

const useEasterEgg = () => {
  const counter = useRef(0)
  const [isEnabled, setEnabled] = useState(false)

  const onClick = () => {
    counter.current++

    if (counter.current >= 7) {
      setEnabled(true)
    }
  }

  return {
    onClick,
    isEnabled,
  }
}

const MenuDropdown = ({ children }: PropsWithChildren<{}>) => {
  const [isOpen, setIsOpen] = useState(false)
  const { onClick, isEnabled } = useEasterEgg()

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
    if (!isEnabled) {
      return
    }

    setIsOpen((prev) => !prev)
  }

  const screenWidth = useScreenWidth()

  if (screenWidth > breakpoints.md) {
    return (
      <>
        <StyledHeader justify='space-between' align='center'>
          {children}
          {isEnabled ? (
            <Button className='burger-button' onClick={toggle} type='ghost'>
              <FieldTimeOutlined />
            </Button>
          ) : (
            <span onClick={onClick} style={{ height: '1rem', width: '1rem' }} />
          )}
        </StyledHeader>
        {isEnabled && (
          <Drawer push={true} onClose={() => setIsOpen(false)} visible={isOpen}>
            <TimerCard />
          </Drawer>
        )}
      </>
    )
  }

  return (
    <Wrapper style={style}>
      <StyledHeader justify='space-between' align='center'>
        {children}
        {isEnabled ? (
          <Button className='burger-button' onClick={toggle} type='ghost'>
            <animated.div style={{ position: 'absolute', ...openStyle }}>
              <FieldTimeOutlined />
            </animated.div>
            <animated.div style={{ ...closeStyle }}>
              <CloseOutlined />
            </animated.div>
          </Button>
        ) : (
          <span onClick={onClick} style={{ height: '1rem', width: '1rem' }} />
        )}
      </StyledHeader>
      {isEnabled && (
        <StyledDropdownRow>
          <TimerCard />
        </StyledDropdownRow>
      )}
    </Wrapper>
  )
}

export default MenuDropdown
