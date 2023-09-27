import { type Moment } from 'moment'
import MoonIcon from '../icons/Moon'
import SunIcon from '../icons/Sun'
import { useTheme } from 'styled-components'
import ZzzIcon from '../icons/Zzz'

const DayNight = ({ time }: { time: Moment }) => {
  const theme = useTheme()

  const getHours = () => {
    if (typeof time === 'number') {
      return time
    }

    return time.get('hours')
  }

  const getIcon = () => {
    const hours = getHours()

    if (isBedTime()) {
      return <ZzzIcon />
    }

    return hours >= 6 && hours < 18 ? <SunIcon /> : <MoonIcon />
  }

  const isBedTime = () => {
    const hours = getHours()

    // 11pm - 7am i'd rather be sleeping
    const isBed = hours >= 23 || hours < 7
    return isBed
  }

  return (
    <div style={{ height: 16, color: theme.colors.wheaty_1 }}>{getIcon()}</div>
  )
}

export default DayNight
