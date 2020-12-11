export default function formatTime(n: number): string {
  const h = Math.floor(n)
  const d = n - h
  const m = d * 60

  const min = m < 10 ? `0${m}` : `${m}`

  if (h === 0) return `${min}min`

  return `${h}h ${min}m`
}

declare global {
  interface Number {
    minToHM(): string
  }
  interface String {
    HMtoMin(): Number
  }
}

Number.prototype.minToHM = function () {
  const n = this
  const hours = n / 60
  const m = n % 60
  const min = m < 10 ? `0${m}` : `${m}`

  return `${hours}:${min}`
}

declare global {
  interface Number {
    minToHM(): string
  }
}

String.prototype.HMtoMin = function () {
  const reg = /^[0-1]?[0-9][:][0-5][0-9]$/

  const match = reg.test(this)

  console.log(match)

  const [h, m] = this.split(':')

  const hours = Number(h)
  const min = Number(m)

  return min + hours * 60
}
