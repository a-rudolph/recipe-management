import { animated, useSpring } from 'react-spring'
import { CloseOutlined, FieldTimeOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { useRef, useState } from 'react'
import breakpoints from '@constants/breakpoints'
import { Button } from '@components/atoms'
import dynamic from 'next/dynamic'
import QrCodeButton from '@components/QrCodeButton'
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
  const [isEnabled, setEnabled] = useState(true)

  const onClick = () => {
    counter.current++
    console.log('.'.repeat(counter.current))

    if (counter.current >= 7) {
      setEnabled(true)
    }
  }

  return {
    isEnabled,
    onClick,
  }
}

const MenuDropdown: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { isEnabled, onClick } = useEasterEgg()

  const screenWidth = useScreenWidth()

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

  return (
    <Wrapper style={style}>
      <StyledHeader justify='space-between' align='middle'>
        <Col>
          <Row align='middle'>
            <Col>{children}</Col>
            {Boolean(screenWidth > breakpoints.md) && (
              <Col style={{ marginLeft: '32px' }}>
                <QrCodeButton />
              </Col>
            )}
          </Row>
        </Col>
        <Col>
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
            <div onClick={onClick} style={{ height: '1rem', width: '1rem' }} />
          )}
        </Col>
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
