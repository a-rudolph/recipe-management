import _isUndefined from 'lodash/isUndefined'

export default function formatTime(n: number): string {
  const h = Math.floor(n)
  const d = n - h
  const m = d * 60

  const min = m < 10 ? `0${m}` : `${m}`

  if (h === 0) return `${min}min`

  return `${h}h ${min}m`
}

export const timeToSeconds = ({ hh = 0, mm = 0, ss = 0 }: TimeValue) => {
  return Number(hh) * 60 * 60 + Number(mm) * 60 + Number(ss)
}

export const secondsToTime = (seconds: number = 0) => {
  const hh = Math.floor(seconds / 3600)
  const rem = seconds - hh * 3600

  const mm = Math.floor(rem / 60)

  const ss = rem - mm * 60

  const ret = {
    hh: padNumber(hh),
    mm: padNumber(mm),
    ss: padNumber(ss),
  }

  return ret
}

export const padNumber = (n?: number | string) => {
  if (_isUndefined(n)) return

  const s = String(n)

  if (s.length < 2) return `0${s}`

  return s
}
