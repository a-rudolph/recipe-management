import { useEffect, useRef, useState } from 'react'
import { useSpring, easings } from 'react-spring'

export const SCROLLER_ID = 'detail-scroller'

export const SCROLL_DURATION = 550
const SPEED_BONUS = 1.3

type DragData = {
  timeStamp: number
  x: number
}

const initDragData: DragData = { timeStamp: 0, x: 0 }

export const useDragScroller = () => {
  const startRef = useRef<DragData>(initDragData)
  const endRef = useRef<DragData>(initDragData)

  const [side, setSide] = useState(0)

  const onTouchStart = (e) => {
    const x = getScrollPosition()?.current || 0

    startRef.current = {
      timeStamp: e.timeStamp,
      x,
    }
  }

  const [scroll, api] = useSpring(() => ({
    left: 0,
    config: {
      duration: SCROLL_DURATION,
      easing: easings.easeOutCubic,
    },
  }))

  useEffect(() => {
    addTouchEnd(onTouchEnd)
    addEvent('touchstart', onTouchStart)

    return () => {
      removeTouchEnd(onTouchEnd)
      removeEvent('touchstart', onTouchStart)
    }
  }, [])

  const goTo = (slide: number) => {
    const { current, max } = getScrollPosition()

    const final = slide * max

    api.start({
      from: { left: current },
      to: { left: final },
    })
    setSide(slide)
  }

  const onTouchEnd = (e) => {
    const x = getScrollPosition()?.current || 0
    endRef.current = {
      timeStamp: e.timeStamp,
      x,
    }

    const speed = findVelocity(startRef.current, endRef.current)

    const speedFactor = Math.round(speed * SPEED_BONUS)
    // -1, 0, 1

    const closestSlide = getCloserSlide()
    // 0, 1

    // (-1, 0) => 0
    // (0, 0) => 0
    // (1, 0) => 1

    // (-1, 1) => 0
    // (0, 1) => 1
    // (1, 1) => 1

    if (speedFactor === -1) {
      goTo(0)
      return
    }

    if (speedFactor === 1) {
      goTo(1)
      return
    }

    goTo(closestSlide)
  }

  return {
    side,
    scroll,
    goTo,
  }
}

export default useDragScroller

// --------------- helpers ---------------
const findVelocity = (start: DragData, end: DragData) => {
  const dx = end.x - start.x
  const dt = end.timeStamp - start.timeStamp

  return dx / dt
}

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

const addEvent = (eventType: string, handler) => {
  const scroller = getScroller()

  if (!scroller) return

  scroller.addEventListener(eventType, handler)
}

const addTouchEnd = (handler) => {
  addEvent('touchend', handler)
}

const removeEvent = (eventType: string, handler) => {
  const scroller = getScroller()

  if (!scroller) return

  scroller.removeEventListener(eventType, handler)
}

const removeTouchEnd = (handler) => {
  removeEvent('touchend', handler)
}
