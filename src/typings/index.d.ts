type RecipeType = {
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
