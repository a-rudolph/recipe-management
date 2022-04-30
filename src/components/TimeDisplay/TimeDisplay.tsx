import styled, { CSSProperties } from 'styled-components'
import { MutableRefObject } from 'react'
import { Text } from '@components/atoms'

const StyledTime = styled.div``

type TimeDisplayProps = {
  hmRef: MutableRefObject<HTMLSpanElement>
  ssRef: MutableRefObject<HTMLSpanElement>
  onClick?: VoidFunction
  style?: CSSProperties
}

export default function TimeDisplay(props: TimeDisplayProps) {
  const { hmRef, ssRef, ...rest } = props

  return (
    <StyledTime className='time-container' {...rest}>
      <Text fs='h1' color='wheaty_1'>
        <span ref={hmRef}>00:00</span>
      </Text>
      <Text fs='h1' color='wheaty_1'>
        <span ref={ssRef}>:00</span>
      </Text>
    </StyledTime>
  )
}

/** trim zeros */
