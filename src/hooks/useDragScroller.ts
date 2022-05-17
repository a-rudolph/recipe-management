import { useSpring, easings } from 'react-spring'
import { useEffect } from 'react'

export const SCROLLER_ID = 'detail-scroller'

const SCROLL_DURATION = 550

export const useDragScroller = () => {
  const [scroll, api] = useSpring(() => ({
    left: 0,
    config: {
      duration: SCROLL_DURATION,
      easing: easings.easeOutCubic,
    },
  }))

  useEffect(() => {
    addTouchEnd(onTouchEnd)

    return () => {
      removeTouchEnd(onTouchEnd)
    }
  }, [])

  const goTo = (slide: number) => {
    const { current, max } = getScrollPosition()

    const final = slide * max

    api.start({
      from: { left: current },
      to: { left: final },
    })
  }

  const onTouchEnd = () => {
    const slide = getCloserSlide()
    goTo(slide)
  }

  return {
    scroll,
    goTo,
  }
}

export default useDragScroller

// --------------- helpers ---------------

const getCloserSlide = () => {
  const scroller = getScroller()

  if (!scroller) return 0

  const left = scroller.scrollLeft
  const halfway = scroller.scrollWidth / 2

  return Math.round(left / halfway)
}

const getScrollPosition = () => {
  const scroller = getScroller()

  if (!scroller) return {}

  return { current: scroller.scrollLeft, max: scroller.scrollWidth / 2 }
}

const scrollToPosition = (position: number) => {
  const scroller = getScroller()

  if (!scroller) return {}

  return (scroller.scrollLeft = position)
}

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
