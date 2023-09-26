import moment, { Moment } from 'moment'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getNextMoment } from '@/utils/time'

type AppContext = {
  time: TimeType
  setTime: ChangeHandler<Partial<TimeType>>
}

type TimeType = {
  start: Moment
}

const initialContext = {
  time: {
    start: moment(),
  },
  setTime: () => {},
}

const TimeContext = createContext<AppContext>(initialContext)

export const useTimeContext = () => {
  return useContext(TimeContext)
}

export const TimeContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [time, setState] = useState({ start: moment() })

  useEffect(() => {
    setState({ start: getNextMoment() })
  }, [])

  const setTime = (time: Partial<TimeType>) => {
    setState((prev) => {
      return { ...prev, ...time }
    })
  }

  return (
    <TimeContext.Provider value={{ time, setTime }}>
      {children}
    </TimeContext.Provider>
  )
}
