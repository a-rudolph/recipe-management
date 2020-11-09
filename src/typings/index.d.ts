type RecipeType = {
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

type IngredientType = {
  quantity: number
  unit: string
  name: string
}
