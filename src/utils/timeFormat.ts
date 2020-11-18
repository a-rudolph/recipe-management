export default function timeFormat(n: number): string {
  const h = Math.floor(n)
  const d = n - h
  const m = d * 60

  const min = m < 10 ? `0${m}` : `${m}`

  return `${h}h ${min}`
}
