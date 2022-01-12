import { Fragment, useRef } from 'react'
import { padNumber } from '@utils/formatTime'
import { Text } from '@components/atoms'
import styled from 'styled-components'
import _noop from 'lodash/noop'

type TimeInputProps = {
  value?: TimeValue
  onChange?: TimeChangeHandler
} & Omit<React.HTMLAttributes<Element>, 'onChange' | 'value'>

const StyledDiv = styled.div`
  &.time-input-wrapper {
    padding: 0 4px;
    border-radius: 5px;
    background: rgb(255, 255, 255, 0.1);
  }

  input {
    background: transparent;
    font-size: inherit;
    color: inherit;
    width: 60px;
    outline: none;
    border-style: none;
    text-indent: 4px;
  }
`

const NUMBER_REGEX = /^\d*$/

const isJustDigits = (value: string | number = '') => {
  const valid = NUMBER_REGEX.test(String(value))

  return valid
}

export default function TimeInput({
  value = { hh: '', mm: '', ss: '' },
  onChange = _noop,
}: TimeInputProps) {
  const refs: Record<TimeKey, React.MutableRefObject<HTMLInputElement>> = {
    hh: useRef<HTMLInputElement>(null),
    mm: useRef<HTMLInputElement>(null),
    ss: useRef<HTMLInputElement>(null),
  }

  const focusPrev = (curr: TimeKey) => {
    const PREV: Record<TimeKey, TimeKey | null> = {
      hh: null,
      mm: 'hh',
      ss: 'mm',
    }
    const prev = PREV[curr]

    if (!prev) return

    refs[prev].current?.focus()
  }

  const focusNext = (curr: TimeKey) => {
    const NEXT: Record<TimeKey, TimeKey | null> = {
      hh: 'mm',
      mm: 'ss',
      ss: null,
    }
    const next = NEXT[curr]

    if (!next) return

    refs[next].current?.focus()
  }

  const shouldNext = (value: TimeValue) => {
    const hhNext = value.hh > 1
    const mmNext = value.mm > 5
    const ssNext = value.ss > 5

    return hhNext || mmNext || ssNext
  }

  const handleChange = (newValue: TimeValue) => {
    const key = Object.keys(newValue)[0] as TimeKey
    let nextValue = newValue[key]

    if (shouldNext(newValue)) {
      nextValue = padNumber(nextValue)
      focusNext(key)
    }

    onChange({
      ...value,
      [key]: nextValue,
    })
  }

  const commonProps = {
    maxLength: 2,
    placeholder: '00',
  }

  const keys: TimeKey[] = ['hh', 'mm', 'ss']

  return (
    <StyledDiv className='time-input-wrapper'>
      <Text fs='48px' color='wheaty_1'>
        {keys.map((key, i) => (
          <Fragment key={i}>
            <input
              ref={refs[key]}
              value={value[key]}
              inputMode='numeric'
              onBlur={() => {
                handleChange({ [key]: value[key] ? padNumber(value[key]) : '' })
              }}
              onKeyDown={(e) => {
                if (!value[key] && e.key === 'Backspace') {
                  focusPrev(key)
                }
              }}
              onChange={(e) => {
                const value = e.target.value
                const valid = isJustDigits(value)

                if (!valid) return

                handleChange({ [key]: value })
              }}
              {...commonProps}
            />
            {i < 2 && ':'}
          </Fragment>
        ))}
      </Text>
    </StyledDiv>
  )
}
