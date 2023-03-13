import { useEffect } from 'react'

export default function useScrollListener(
  cb: (_position: number) => void,
  dep?: any[]
) {
  const getScrollY = () => {
    if (window) return window.scrollY
    return 0
  }

  useEffect(() => {
    const scrollHandler = () => cb(getScrollY())

    window.addEventListener('scroll', scrollHandler)

    return () => window.addEventListener('scroll', scrollHandler)
  }, dep || [])
}
