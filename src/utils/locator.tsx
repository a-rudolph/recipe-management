import { useEffect } from 'react'

const setupLocatorUI = () => {
  if (process.env.NODE_ENV === 'development') {
    import('@locator/runtime').then((m) => m.setup())
  }
}

export default function Init() {
  useEffect(() => {
    setupLocatorUI()
  }, [])

  return <></>
}
