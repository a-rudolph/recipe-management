import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      wheaty_1: string
      primary_1: string
      secondary_1: string
      text_1: string
      text_2: string
      grad_1: string
      grad_2: string
      grad_3: string

      wheaty_3: string
      wheaty_4: string
      mono_2: string
      mono_3: string
      bg_1: string
      bg_2: string
    }
    shade: {
      button: string
      small: string
      big: string
    }
    gradient: string
  }
}
