import { animated, useSpring } from 'react-spring'
import { Button, Card, Row } from 'antd'
import { CardTitle, Text } from '@components/atoms'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import _noop from 'lodash/noop'
import { appRouter } from './api/trpc/[trpc]'
import { createSSGHelpers } from '@trpc/react/ssg'
import { getTimelineSteps } from '@utils/timeline'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import ProgressSteps from '@components/ProgressSteps'
import { renderDangerous } from '@utils/dangerous-renders'
import styled from 'styled-components'
import { useState } from 'react'

const StyledPage = styled.div`
  padding: 16px;

  display: flex;
  justify-content: center;
  width: 100%;

  overflow-x: hidden;

  & > div {
    width: 100%;
    max-width: 560px;
  }

  .ant-card {
    width: 100%;
  }
`

const PageLayout: React.FC = ({ children }) => {
  return (
    <StyledPage>
      <div>{children}</div>
    </StyledPage>
  )
}

const StyledCard = styled(animated(Card))``

type BakingPageProps = InferGetStaticPropsType<typeof getStaticProps>

const BakingPage: React.FC<BakingPageProps> = ({ recipe }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [showingStepIndex, setShowingStepIndex] = useState(0)

  const [style, api] = useSpring(() => ({ transform: 'translateX(0%)' }))

  const slide = (prev: number, next: number) => {
    const factor = prev < next ? 1 : -1

    api.start({
      from: { transform: `translateX(${100 * factor}%)` },
      to: { transform: 'translateX(0%)' },
    })
  }

  const steps = getTimelineSteps(recipe)

  const onNext = () => {
    // next is always in one direction
    slide(0, 1)

    setCurrentStepIndex((prev) => prev + 1)
    setShowingStepIndex((prev) => prev + 1)
  }

  const resetSteps = () => {
    // reset is always in one direction
    slide(1, 0)

    setCurrentStepIndex(0)
    setShowingStepIndex(0)
  }

  const showingStep = steps[showingStepIndex]

  return (
    <PageLayout>
      <Row style={{ marginBottom: '8px' }}>
        <Link href='/recipes/[key]' as={`/recipes/${recipe.key}`}>
          <a>
            <CardTitle style={{}}>{recipe.name}</CardTitle>
          </a>
        </Link>
      </Row>
      <Row>
        <ProgressSteps
          onStepClick={(index) => {
            setShowingStepIndex((prev) => {
              slide(prev, index)
              return index
            })
          }}
          showing={showingStepIndex}
          total={steps.length}
          current={currentStepIndex}
        />
      </Row>
      <Row>
        <StyledCard style={style}>
          <Row style={{ marginBottom: '8px' }}>
            <Text fs='h4'>{showingStep.title}</Text>
          </Row>
          <Row style={{ marginBottom: '8px', height: '200px' }}>
            <Text>{renderDangerous.div(showingStep.description)}</Text>
          </Row>
          <Row justify='end'>
            {showingStepIndex === currentStepIndex &&
              showingStepIndex < steps.length - 1 && (
                <Button onClick={onNext}>
                  <Text>Next</Text>
                </Button>
              )}
            {/* if we're not on the current step show a button to show current */}
            {showingStepIndex !== currentStepIndex && (
              <Button
                onClick={() =>
                  setShowingStepIndex((prev) => {
                    slide(prev, currentStepIndex)
                    return currentStepIndex
                  })
                }
              >
                {showingStepIndex > currentStepIndex && <LeftOutlined />}
                <Text>current step</Text>
                {showingStepIndex < currentStepIndex && <RightOutlined />}
              </Button>
            )}
            {/* show start again button for last step */}
            {showingStepIndex === steps.length - 1 &&
              currentStepIndex === steps.length - 1 && (
                <Button onClick={resetSteps}>
                  <Text>Start again</Text>
                </Button>
              )}
          </Row>
        </StyledCard>
      </Row>
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const ssg = await createSSGHelpers({
    router: appRouter,
    ctx: () => null,
  })

  const data = await ssg.fetchQuery('get-recipe', {
    key: 'saturday-white-bread',
  })

  return {
    props: { recipe: data.recipe },
  }
}

export default BakingPage
