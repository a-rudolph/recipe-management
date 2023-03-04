import { create } from 'zustand'
import { useEffect } from 'react'

type DeviceType = 'desktop' | 'mobile'

const useDeviceStore = create<{
  isDesktop: boolean
  setIsDesktop: (_isDesktop: boolean) => void
}>((set) => ({
  isDesktop: false,
  setIsDesktop: (isDesktop: boolean) => set({ isDesktop }),
}))

export const useSetDevice = () => {
  const setIsDesktop = useDeviceStore((state) => state.setIsDesktop)

  useEffect(() => {
    // userAgentData is experimental and may not be available
    const isMobile: boolean | undefined = (navigator as any)?.userAgentData
      ?.mobile

    // if it's not available lets use screen size
    if (isMobile === undefined) {
      const { innerWidth } = window

      console.warn('userAgentData is undefined, using innerWidth', innerWidth)

      if (innerWidth < 768) {
        setIsDesktop(false)
        return
      }
    }

    const isDesktop = !isMobile

    setIsDesktop(isDesktop)
  }, [])
}

export const useDeviceType = (): {
  isDesktop: boolean
  deviceType: DeviceType
} => {
  const isDesktop = useDeviceStore((state) => state.isDesktop)

  return { isDesktop, deviceType: isDesktop ? 'desktop' : 'mobile' }
}
