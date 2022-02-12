declare const IS_PRODUCTION: boolean

type RecipeType = {
  name: string
  key: string
  bulk: number
  proof: number
  start: number
  btf: Btf

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

type Btf = 'overnight' | 'samedayer'

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
