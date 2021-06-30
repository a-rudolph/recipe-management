type RecipeType = {
  name: string
  key: string
  times: {
    bulk: number[]
    proof: number[]
  }
  yield: {
    amount: number
    unit: string
  }
  ingrendients: IngredientType[]
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
}

type RecipeProp = {
  recipe: RecipeType
}
