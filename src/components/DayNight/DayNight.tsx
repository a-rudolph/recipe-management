import { type Moment } from 'moment'
import MoonIcon from '../icons/Moon'
import SunIcon from '../icons/Sun'
import { useTheme } from 'styled-components'
import ZzzIcon from '../icons/Zzz'
import { useUserSettingsStore } from '@/stores/user-settings'

const DayNight = ({
  time,
  showSleep = true,
}: {
  time: Moment
  showSleep?: boolean
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
      return <ZzzIcon />
    }

    return hours >= 5 && hours < 18 ? <SunIcon /> : <MoonIcon />
  }

  const isBedTime = () => {
    const hours = getHours()

    // 11pm - 7am i'd rather be sleeping
    const isBed =
      hours >= settings.activeTimeEnd || hours < settings.activeTimeStart

    return isBed
  }

  return (
    <div style={{ height: 16, color: theme.colors.wheaty_1 }}>{getIcon()}</div>
  )
}

export default DayNight
