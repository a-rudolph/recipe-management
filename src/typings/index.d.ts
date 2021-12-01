declare const IS_PRODUCTION: boolean

type RecipeType = {
  name: string
  key: string
  bulk: number
  proof: number
  start: number

  // deprecated
  times: {
    bulk: number[]
    proof: number[]
  }
  yield: {
    amount: number
    unit: string
  }
  ingredients: IngredientType[]
}

type Step = {
  title: string
  time: import('moment').Moment
}

type Steps = Array<Step>

type IngredientType = {
  quantity: number
  unit: string
  name: string
  extra?: string
}

type RecipeProp = {
  recipe: RecipeType
}

type ChangeHandler<T> = (value: T) => void
