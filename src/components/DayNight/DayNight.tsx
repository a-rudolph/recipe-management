import { type Moment } from 'moment'
import MoonIcon from '../icons/Moon'
import SunIcon from '../icons/Sun'
import { useTheme } from 'styled-components'
import { useUserSettingsStore } from '@/stores/user-settings'
import ZzzIcon from '../icons/Zzz'
import { Row, Tooltip } from 'antd'
import Link from 'next/link'
import { Text, Button } from '../atoms'
import { CloseOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

const DayNight = ({
  time,
  showSleep = true,
  showTooltip = false,
}: {
  time: Moment
  showSleep?: boolean
  showTooltip?: boolean
}) => {
  const theme = useTheme()
  const { settings } = useUserSettingsStore()

  const getHours = () => {
    if (typeof time === 'number') {
      return time
    }

    return time.get('hours')
  }

  const getIcon = () => {
    const hours = getHours()

    if (showSleep && isBedTime()) {
      if (showTooltip) return <SleepWithTooltip />

      return <ZzzIcon />
    }

    return hours >= 5 && hours < 18 ? <SunIcon /> : <MoonIcon />
  }

  const isBedTime = () => {
    const hours = getHours()

    const start = settings.activeTimeStart / 60
    const end = settings.activeTimeEnd / 60

    // 11pm - 7am i'd rather be sleeping
    const isBed = hours >= end || hours < start

    return isBed
  }

  return (
    <div style={{ height: 16, color: theme.colors.wheaty_1 }}>{getIcon()}</div>
  )
}

export default DayNight

const SleepWithTooltip = () => {
  const { tooltips, updateTips } = useUserSettingsStore()

  const [tipShowing, setTipShowing] = useState(false)

  useEffect(() => {
    if (tooltips.inactiveTime) {
      setTipShowing(true)
    }
  }, [])

  const dismiss = () => {
    updateTips({ inactiveTime: false })
    setTipShowing(false)
  }

  return (
    <Tooltip
      getTooltipContainer={() =>
        (document.getElementsByClassName('main-col')[0] as HTMLElement) ||
        document.body
      }
      title={
        <div onClick={(e) => e.stopPropagation()}>
          <Row justify='space-between' align='middle'>
            <div>
              <Text style={{ marginRight: 8 }} color='wheaty_1'>
                <ZzzIcon />
              </Text>
              Icon signifies inactive time
            </div>
            <Button onClick={dismiss} type='ghost'>
              <CloseOutlined style={{ fontSize: '16px' }} />
            </Button>
          </Row>
          <div>
            You can change your active times in the{' '}
            <Link onClick={dismiss} href='/settings'>
              <Text weight={600}>settings</Text>
            </Link>
            .
          </div>
        </div>
      }
      placement='left'
      open={tipShowing}
    >
      <ZzzIcon />
    </Tooltip>
  )
}
