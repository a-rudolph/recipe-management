import { useEffect, useState } from 'react'

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  return screenWidth
}

export default useScreenWidth
