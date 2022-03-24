import { useSpring, animated, config } from 'react-spring'
import { Row, Text } from '@components/atoms'
import { getColor } from '@styles/themes'
import SimpleTimeline from '@components/SimpleTimeline'
import styled from 'styled-components'
import Link from 'next/link'

const StyledDiv = styled.div`
  .dot {
    height: 10px;
    width: 10px;
    background: ${getColor('secondary_1')};
    border-radius: 50%;
    margin: 0 16px;
  }
`

const StyledItem = styled.div`
  cursor: pointer;
  border-left: 8px solid;
  border-bottom: 1px solid;
  border-color: ${getColor('wheaty_1')};
  border-radius: 4px 0 0 4px;
  padding: 16px 16px 0;
  margin: 16px 0;
  margin-right: -24px;
  box-shadow: 0px 2px 2px rgb(0 0 0 / 25%);

  .divider {
    margin: 16px -16px;
    height: 1px;
    background-color: ${getColor('mono_2')};
  }

  transition: all 0.3s ease;

  &:hover {
    background: ${getColor('wheaty_4')}11;
  }
`

type RecipeListProps = {
  recipes: RecipeType[]
}

const RecipeList = ({ recipes }: RecipeListProps) => {
  const samedayers: RecipeType[] = []
  const overnights: RecipeType[] = []

  recipes.forEach((recipe) => {
    switch (recipe.btf) {
      case 'samedayer':
        samedayers.push(recipe)
        break
      case 'overnight':
        overnights.push(recipe)
        break
    }
  })

  return (
    <StyledDiv>
      <Row>
        <Text.h2>Straight dough Recipes</Text.h2>
      </Row>
      <Row justify='center' align='center'>
        <div className='dot' />
        <Text.h1>Same-day breads</Text.h1>
        <div className='dot' />
      </Row>
      <Row>
        <Text.accent>mix in the morning, bake in the afternoon</Text.accent>
      </Row>
      {samedayers.map((recipe, i) => (
        <RecipeLink key={recipe.key} index={i} recipe={recipe} />
      ))}
      <Row justify='center' align='center'>
        <div className='dot' />
        <Text.h1>Overnight breads</Text.h1>
        <div className='dot' />
      </Row>
      <Row>
        <Text.accent>mix in the evening, bake in the morning</Text.accent>
      </Row>
      {overnights.map((recipe, i) => (
        <RecipeLink
          key={recipe.key}
          index={i + samedayers.length}
          recipe={recipe}
        />
      ))}
    </StyledDiv>
  )
}

const RecipeLink = ({
  recipe,
  index,
}: {
  recipe: RecipeType
  index: number
}) => {
  const { name, start, bulk, proof, key } = recipe

  const animateProps = useSpring({
    to: { transform: 'translateX(0)' },
    from: { transform: 'translateX(100%)' },
    config: config.gentle,
    delay: 200 * index,
  })

  return (
    <animated.div style={animateProps}>
      <Link key={key} href='/recipes/[key]' as={`/recipes/${key}`}>
        <StyledItem>
          <Text.h2>{name}</Text.h2>
          <SimpleTimeline start={start} bulk={bulk} proof={proof} />
        </StyledItem>
      </Link>
    </animated.div>
  )
}

export default RecipeList
