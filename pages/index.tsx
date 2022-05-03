import getAvailableRecipes from '@utils/getAvailableRecipes'
// import BasicLayout from '@layouts/BasicLayout'
import RecipeList from '@components/RecipeList'
import { Card } from '@components/atoms'
import breakpoints from '@constants/breakpoints'
import styled from 'styled-components'

type HomeProps = {
  recipes: RecipeType[]
}

const LayoutCard = styled(Card)`
  width: 80vw;
  min-height: 60vh;
  margin-bottom: 24px;
  padding: 24px;
  overflow: hidden;

  @media screen and (min-width: ${breakpoints.sm}px) {
    width: 320px;
    border-radius: 4px;
  }
`

const Home = ({ recipes }: HomeProps) => {
  return (
    <LayoutCard side='right'>
      recipe LIST
      {/* <RecipeList recipes={recipes} /> */}
    </LayoutCard>
  )
}

// export const getStaticProps = async () => {
//   const recipes = getAvailableRecipes()

//   return {
//     props: {
//       recipes,
//     },
//   }
// }

export default Home
