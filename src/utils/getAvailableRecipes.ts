import { recipes } from '@constants/recipes'

export default function getAvailableRecipes() {
  return recipes.map(({ key, name }) => ({ key, name }))
}
