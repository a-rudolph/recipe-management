declare const IS_PRODUCTION: boolean

type RecipeType = {
  name: string
  key: string
  bulk: number
  proof: number
  start: number
  brt9: Brt9
  ingredients: IngredientType[]
}

type Brt9 = 'sameday' | 'overnight'

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
