import type { CSSProperties, MutableRefObject } from 'react'
import { Text } from '@components/atoms'

type TimeDisplayProps = {
  hmRef: MutableRefObject<HTMLSpanElement | null>
  ssRef: MutableRefObject<HTMLSpanElement | null>
  onClick?: VoidFunction
  style?: CSSProperties
}

export default function TimeDisplay(props: TimeDisplayProps) {
  const { hmRef, ssRef, ...rest } = props

  return (
    <div className='time-container' {...rest}>
      <Text fs='h1' color='wheaty_1'>
        <span ref={hmRef}>00:00</span>
      </Text>
      <Text fs='h1' color='wheaty_1'>
        <span ref={ssRef}>:00</span>
      </Text>
    </div>
  )
}
