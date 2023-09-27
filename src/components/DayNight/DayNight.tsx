import { type Moment } from 'moment'
import MoonIcon from '../icons/Moon'
import SunIcon from '../icons/Sun'
import { useTheme } from 'styled-components'

const DayNight = ({ time }: { time: Moment | number }) => {
  const theme = useTheme()

  const getHours = () => {
    if (typeof time === 'number') {
      return time
    }

    return time.get('hours')
  }

  const getIcon = () => {
    const hours = getHours()
    return hours >= 6 && hours < 18 ? <SunIcon /> : <MoonIcon />
  }

  return (
    <div style={{ height: 16, color: theme.colors.wheaty_1 }}>{getIcon()}</div>
  )
}

export default DayNight
