import { SoundSettingProvider } from '@components/SoundToggle'
import { ThemeProvider } from 'styled-components'
import { TimerProvider } from './useTimerContext'
import { theme } from '@styles/themes'

const AppContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <TimerProvider>
      <SoundSettingProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </SoundSettingProvider>
    </TimerProvider>
  )
}

export default AppContext
