import BasicLayout from '@layouts/BasicLayout'
import { client } from '@utils/trpc'
import getAvailableRecipes from '@utils/getAvailableRecipes'
import RecipeList from '@components/RecipeList'

type HomeProps = {
  recipes: RecipeType[]
}

const Home = ({ recipes }: HomeProps) => {
  return (
    <BasicLayout.Card side='right'>
      <RecipeList recipes={recipes} />
    </BasicLayout.Card>
  )
}

export const getStaticProps = async () => {
  const recipes = getAvailableRecipes()

  const response = await client.query('hello')

  console.log(response)

  return {
    props: {
      recipes,
    },
  }
}

export default Home
