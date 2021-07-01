import moment, { Moment } from 'moment'
import { ChangeEvent, OptionHTMLAttributes } from 'react'
import { Flex, Select, SelectProps, SxStyleProp, Text } from 'theme-ui'

type TimeSelectProps = {
  value: Moment
  onChange: (m: Moment) => void
} & Omit<SelectProps, 'ref' | 'value' | 'onChange'>

const wrapperSx: SxStyleProp = {
  border: '1px solid',
  borderColor: 'inverted',
  borderRadius: '8px',
}

const selectSx: SxStyleProp = {
  borderColor: 'transparent',
  cursor: 'default',
  padding: '4px 8px',
}

const TimeSelect = ({ value, onChange, ...selectProps }: TimeSelectProps) => {
  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    try {
      const m = moment(value)
      onChange(m)
    } catch (e) {
      console.error(e)
    }
  }

  const minutes = new Array(4).fill(null)
  const hours = new Array(24).fill(null)

  const style = onChange ? wrapperSx : selectSx

  return (
    <Flex sx={{ width: '100%', justifyContent: 'center' }}>
      <Flex sx={{ svg: { display: 'none' }, ...style }}>
        <Select
          sx={{ ...selectSx, pr: '4px' }}
          disabled={!onChange}
          value={value.toISOString()}
          onChange={handleChange}
          {...selectProps}
        >
          {hours.map((_, i) => {
            const optionValue = moment(value).hours(0).add(i, 'h')
            return (
              <TimeOption key={i} value={optionValue}>
                {optionValue.format('HH')}
              </TimeOption>
            )
          })}
        </Select>
        <Text
          sx={{
            fontSize: 3,
            fontWeight: 500,
            margin: '0 2px',
          }}
        >
          :
        </Text>
        <Select
          sx={{ ...selectSx, pl: '4px' }}
          disabled={!onChange}
          value={value.toISOString()}
          onChange={handleChange}
          {...selectProps}
        >
          {minutes.map((_, i) => {
            const optionValue = moment(value)
              .minutes(0)
              .add(i * 15, 'm')

            return (
              <TimeOption key={i} value={optionValue}>
                {optionValue.format('mm')}
              </TimeOption>
            )
          })}
        </Select>
      </Flex>
    </Flex>
  )
}

type TimeOptionProps = {
  value: Moment
} & Omit<OptionHTMLAttributes<HTMLOptionElement>, 'value'>

const TimeOption = ({ value, ...rest }: TimeOptionProps) => {
  return <option value={value.toISOString()} {...rest} />
}

export default TimeSelect
