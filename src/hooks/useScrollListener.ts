import { useEffect, useState } from 'react'

export default function useScrollListener() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    if (window) {
      window.onscroll = () => setScrollPosition(window.scrollY)
    }
  }, [])

  return {
    scrollPosition,
  }
}
