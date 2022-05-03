import getAvailableRecipes from '@utils/getAvailableRecipes'
import BasicLayout from '@layouts/BasicLayout'
import RecipeList from '@components/RecipeList'

type HomeProps = {
  recipes: RecipeType[]
}

const Home = ({ recipes }: HomeProps) => {
  return (
    <BasicLayout.Card side='right'>
      recipe LIST
      {/* <RecipeList recipes={recipes} /> */}
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
