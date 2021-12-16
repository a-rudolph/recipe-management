type TimeValue = Partial<Record<TimeKey, string | number>>

type TimeKey = 'hh' | 'mm' | 'ss'

type TimeChangeHandler = (payload: TimeValue) => void
