import { useEffect, useState } from 'react'
import getAvailableRecipes from '@utils/getAvailableRecipes'
import responsive from '@constants/responsive'
import RecipeList from '@components/RecipeList'
import BasicLayout from '@layouts/BasicLayout'

type HomeProps = {
  recipes: RecipeType[]
}

const Home = ({ recipes }: HomeProps) => {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  const isLg = screenWidth > responsive.md

  return (
    <>
      <BasicLayout.Card side='right'>
        <RecipeList recipes={recipes} />
      </BasicLayout.Card>
      {isLg && <div></div>}
    </>
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
