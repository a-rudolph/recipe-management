import { createContext, useContext, useEffect, useState } from 'react'
import { Button } from '@components/atoms'
import Sound from '@components/icons/Sound'

const SOUND_SETTING = 'wheatifully_sound_enabled'

export const SoundSettingProvider: React.FC = ({ children }) => {
  const [on, setOn] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(SOUND_SETTING)
    const on = stored ? JSON.parse(stored) : false

    setOn(on)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(SOUND_SETTING, JSON.stringify(on))
  }, [on])

  return (
    <SettingContext.Provider value={{ on, setOn }}>
      {children}
    </SettingContext.Provider>
  )
}

type SettingContextType = {
  on: boolean
  setOn: React.Dispatch<React.SetStateAction<boolean>>
}

const initialContext: SettingContextType = {
  on: false,
  setOn: () => {},
}

const SettingContext = createContext<SettingContextType>(initialContext)

export const useSettingContext = () => {
  return useContext(SettingContext)
}

const SoundToggle = () => {
  const { on, setOn } = useSettingContext()

  return (
    <Button
      className='sound-btn'
      icon={<Sound on={on} />}
      onClick={() => {
        setOn((on) => !on)
      }}
    />
  )
}

export default SoundToggle
