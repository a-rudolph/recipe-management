import { Fragment, useEffect, useRef } from 'react'
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

type RefType = HTMLInputElement | null

export default function TimeInput({
  value = { hh: '', mm: '', ss: '' },
  onChange = _noop,
}: TimeInputProps) {
  const refs: Record<TimeKey, React.MutableRefObject<RefType>> = {
    hh: useRef<RefType>(null),
    mm: useRef<RefType>(null),
    ss: useRef<RefType>(null),
  }

  useEffect(() => {
    refs.hh.current?.focus()
  }, [])

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
    const hhNext = value.hh ? value.hh > 1 : false
    const mmNext = value.mm ? value.mm > 5 : false
    const ssNext = value.ss ? value.ss > 5 : false

    const twoDigits = String(value.hh || value.mm || value.ss).length === 2

    return hhNext || mmNext || ssNext || twoDigits
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
      <Text fs='h1' color='wheaty_1'>
        {keys.map((key, i) => (
          <Fragment key={i}>
            <input
              ref={refs[key]}
              value={value[key]}
              inputMode='numeric'
              className='number-input'
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
