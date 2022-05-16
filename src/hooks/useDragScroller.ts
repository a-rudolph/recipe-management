import { useSpring, easings } from 'react-spring'
import { useEffect } from 'react'

export const SCROLLER_ID = 'detail-scroller'

export const useDragScroller = () => {
  const [scroll, api] = useSpring(() => ({
    left: 0,
    config: {
      duration: 550,
      easing: easings.easeOutCubic,
    },
  }))

  useEffect(() => {
    addTouchEnd(touchEnder)

    return () => {
      removeTouchEnd(touchEnder)
    }
  }, [])

  const goTo = (slide: number) => {
    const { current, max } = getScrollPosition()

    api.start({
      from: { left: current },
      to: { left: slide * max },
    })
  }

  const touchEnder = () => {
    const slide = getCloserSlide()
    goTo(slide)
  }

  return {
    scroll,
    goTo,
  }
}

export default useDragScroller

// ------------- helpers -------------
const getScroller = () => {
  return document.getElementById(SCROLLER_ID)
}

const addTouchEnd = (handler) => {
  const scroller = getScroller()

  if (!scroller) return

  scroller.addEventListener('touchend', handler)
}

const removeTouchEnd = (handler) => {
  const scroller = getScroller()

  if (!scroller) return

  scroller.removeEventListener('touchend', handler)
}

const getScrollPosition = () => {
  const scroller = getScroller()

  if (!scroller) return {}

  return { current: scroller.scrollLeft, max: scroller.scrollWidth / 2 }
}

const getCloserSlide = () => {
  const scroller = getScroller()

  if (!scroller) return 0

  const left = scroller.scrollLeft
  const halfway = scroller.scrollWidth / 2

  return Math.round(left / halfway)
}
