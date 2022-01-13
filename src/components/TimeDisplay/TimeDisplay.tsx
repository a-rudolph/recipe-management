import { MutableRefObject } from 'react'
import { Text } from '@components/atoms'
import styled from 'styled-components'

const StyledTime = styled.div``

type TimeDisplayProps = {
  hmRef: MutableRefObject<HTMLSpanElement>
  ssRef: MutableRefObject<HTMLSpanElement>
  onClick?: VoidFunction
}

export default function TimeDisplay(props: TimeDisplayProps) {
  const { hmRef, ssRef, onClick } = props

  return (
    <StyledTime className='time-container' onClick={onClick}>
      <Text fs='48px' color='wheaty_1'>
        <span ref={hmRef}>00:00</span>
      </Text>
      <Text fs='32px' color='wheaty_1'>
        <span ref={ssRef}>:00</span>
      </Text>
    </StyledTime>
  )
}

/** trim zeros */
