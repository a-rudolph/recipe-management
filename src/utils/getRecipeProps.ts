import { GetStaticPropsResult } from 'next'
import { recipes } from '../constants/recipes'

export default function getRecipeProps(
  params
): GetStaticPropsResult<RecipeProp> {
  const recipe = recipes.find((recipe) => recipe.key === params.key)

  return { props: { recipe } }
}
