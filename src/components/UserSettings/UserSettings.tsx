import { CardTitle, Text } from '@/components/atoms'
import { Form, Slider, Space } from 'antd'
import { BasicLayout } from '@/layouts'
import DayNight from '@/components/DayNight'
import moment from 'moment'
import styled from 'styled-components'
import { useUserSettingsStore } from '@/stores/user-settings'

const StyledDiv = styled.div`
  padding: 16px;
  padding-top: 0;
`

const MAX_MINUTES = 24 * 60

const UserSettings: React.FC = () => {
  const { settings, updateSettings } = useUserSettingsStore()

  const getTime = (minutes: number) => {
    return moment().startOf('day').add(minutes, 'minutes')
  }

  const formatTime = (time: moment.Moment) => {
    return time.format('h:mm a')
  }

  const start = getTime(settings.activeTimeStart)
  const end = getTime(settings.activeTimeEnd)

  return (
    <BasicLayout.Card>
      <CardTitle>Settings</CardTitle>
      <StyledDiv>
        <Form>
          <Text fs='h5'>Active time</Text>
          <Form.Item name='activeTime'>
            <Space>
              <DayNight showSleep={false} time={start} />
              <Text fs='body' secondary>
                {formatTime(start)}
              </Text>
              <Text fs='body' secondary>
                -
              </Text>
              <DayNight showSleep={false} time={end} />
              <Text fs='body' secondary>
                {formatTime(end)}
              </Text>
            </Space>
            <Slider
              range
              max={MAX_MINUTES}
              value={[settings.activeTimeStart, settings.activeTimeEnd]}
              step={15}
              onChange={(value) => {
                updateSettings({
                  activeTimeStart: value[0],
                  activeTimeEnd: value[1],
                })
              }}
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

export default UserSettings
