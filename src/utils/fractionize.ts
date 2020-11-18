export default function fractionize(n: number): string {
  const fractionCode: { [key: number]: string } = {
    [50]: '½',
    [33]: '⅓',
    [66]: '⅔',
    [25]: '¼',
    [75]: '¾',
    [20]: '⅕',
    [40]: '⅖',
    [60]: '⅗',
    [80]: '⅘',
    [16]: '⅙',
    [83]: '⅚',
    [12]: '⅛',
    [37]: '⅜',
    [62]: '⅝',
    [87]: '⅞',
  }

  const k = Math.floor(n)

  const l = n - k

  const key = Math.floor(l * 100)
  const fraction = fractionCode[key]

  if (l === 0 || !fraction) {
    return String(n)
  }
  return `${k} ${fraction}` || String(n)
}
