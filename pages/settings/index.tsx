import { CardTitle, Text } from '@/components/atoms'
import { Form, Slider, Space } from 'antd'
import { BasicLayout } from '@/layouts'
import DayNight from '@/components/DayNight'
import moment from 'moment'
import styled from 'styled-components'
import { useState } from 'react'

const StyledDiv = styled.div`
  padding: 16px;
  padding-top: 0;
`

const SEVEN_IN_MINUTES = 7 * 60
const TWENTY_TWO_IN_MINUTES = 22 * 60
const MAX_MINUTES = 24 * 60

const Page: React.FC = () => {
  const [range, setRange] = useState<[number, number]>([
    SEVEN_IN_MINUTES,
    TWENTY_TWO_IN_MINUTES,
  ])

  const getTime = (minutes: number) => {
    return moment().startOf('day').add(minutes, 'minutes')
  }

  const formatTime = (time: moment.Moment) => {
    return time.format('h:mm a')
  }

  const start = getTime(range[0])
  const end = getTime(range[1])

  return (
    <BasicLayout.Card>
      <CardTitle>Settings</CardTitle>
      <StyledDiv>
        <Form>
          <Text fs='h5'>Active time</Text>
          <Form.Item name='activeTime'>
            <Space>
              <DayNight time={start} />
              <Text fs='body' secondary>
                {formatTime(start)}
              </Text>
              <Text fs='body' secondary>
                -
              </Text>
              <DayNight time={end} />
              <Text fs='body' secondary>
                {formatTime(end)}
              </Text>
            </Space>
            <Slider
              range
              max={MAX_MINUTES}
              value={range}
              step={15}
              onChange={setRange}
              tooltip={{
                open: false,
              }}
            />
          </Form.Item>
        </Form>
      </StyledDiv>
    </BasicLayout.Card>
  )
}

export default Page
