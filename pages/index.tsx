import BasicLayout from '@layouts/BasicLayout'
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

  return {
    props: {
      recipes,
    },
  }
}

export default Home
