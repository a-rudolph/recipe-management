export const breakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
} as const

export type Breakpoint = keyof typeof breakpoints

export default breakpoints
