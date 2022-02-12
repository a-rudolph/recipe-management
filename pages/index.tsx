import getAvailableRecipes from '@utils/getAvailableRecipes'
import responsive from '@constants/responsive'
import RecipeList from '@components/RecipeList'
import styled from 'styled-components'
import { Card } from '@components/atoms'
import { useEffect, useState } from 'react'

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  .atom-card {
    width: 80vw;
    min-height: 60vh;
    margin-bottom: 24px;
  }

  @media screen and (min-width: ${responsive.md}px) {
    justify-content: space-around;

    .atom-card {
      width: max-content;
      padding: 24px;
      border-radius: 4px;
    }
  }
`

type HomeProps = {
  recipes: RecipeType[]
}

const StyledItem = styled.div`
  .divider {
    margin: 16px -16px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.mono_2};
  }
`

export default function Home({ recipes }: HomeProps) {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  const isLg = screenWidth > responsive.md

  return (
    <StyledDiv>
      <Card side='right'>
        <RecipeList recipes={recipes} />
      </Card>
      {isLg && <div>another section!</div>}
    </StyledDiv>
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
