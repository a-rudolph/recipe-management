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
    border-bottom: 1px dashed ${({ theme }) => theme.colors.wheaty_2};
  }

  input {
    background: rgb(255, 255, 255, 0.1);
    font-size: inherit;
    color: inherit;
    width: 60px;
    outline: none;
    border-style: none;
    text-indent: 4px;
  }
`

export default function TimeInput({
  value = {},
  onChange = _noop,
}: TimeInputProps) {
  const handleChange = (newValue: TimeValue) => {
    onChange({
      ...value,
      ...newValue,
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
          <>
            <input
              value={value[key]}
              onBlur={() => {
                handleChange({ [key]: padNumber(value[key]) })
              }}
              onChange={(e) => {
                handleChange({ [key]: e.target.value })
              }}
              {...commonProps}
            />
            {i < 2 && ':'}
          </>
        ))}
      </Text>
    </StyledDiv>
  )
}
