import { GetStaticPathsResult } from 'next'
import { recipes } from '@constants/recipes'

export default function getRecipePaths(): GetStaticPathsResult {
  const paths = recipes.map((recipe) => {
    return {
      params: { key: recipe.key },
    }
  })

  return {
    fallback: false,
    paths,
  }
}
