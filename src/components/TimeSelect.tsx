import moment, { Moment } from 'moment'
import { ChangeEvent, OptionHTMLAttributes } from 'react'
import { Flex, Select, SelectProps, Text } from 'theme-ui'

type TimeSelectProps = {
  value: Moment
  onChange: (m: Moment) => void
} & Omit<SelectProps, 'ref' | 'value' | 'onChange'>

const TimeSelect = ({ value, onChange, ...selectProps }: TimeSelectProps) => {
  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const m = moment(value)
    onChange(m)
  }

  const minutes = new Array(4)
  const hours = new Array(12)

  return (
    <Flex sx={{ width: '100%', justifyContent: 'space-around' }}>
      <Select
        sx={{
          flexGrow: 1,
        }}
        value={value.toISOString()}
        onChange={handleChange}
        {...selectProps}
      >
        {hours.map((_, i) => {
          const optionValue = moment(value).hours(0).add(i, 'h')
          return (
            <TimeOption value={optionValue}>
              {optionValue.format('HH')}
            </TimeOption>
          )
        })}
        <TimeOption value={value}>{value.format('HH')}</TimeOption>
      </Select>
      <Text>:</Text>
      <Select
        sx={{
          flexGrow: 1,
        }}
        value={value.toISOString()}
        onChange={handleChange}
        {...selectProps}
      >
        {minutes.map((_, i) => {
          const optionValue = moment(value)
            .minutes(0)
            .add(i * 15, 'm')
          return (
            <TimeOption value={optionValue}>
              {optionValue.format('mm')}
            </TimeOption>
          )
        })}
      </Select>
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
