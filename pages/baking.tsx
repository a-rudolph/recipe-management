import { Button, Card, Col, Row } from 'antd'
import { createResponsiveStyle, getColor } from '@styles/themes'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import styled, { css } from 'styled-components'
import _noop from 'lodash/noop'
import { appRouter } from './api/trpc/[trpc]'
import { createSSGHelpers } from '@trpc/react/ssg'
import { getTimelineSteps } from '@utils/timeline'
import { InferGetStaticPropsType } from 'next'
import { renderDangerous } from '@utils/dangerous-renders'
import { Text } from '@components/atoms'
import { useState } from 'react'

const StyledPage = styled.div`
  padding: 16px;

  display: flex;
  justify-content: center;
  width: 100%;

  & > div {
    width: 100%;
    max-width: 800px;
  }

  .ant-card {
    ${createResponsiveStyle.mobile(css`
      width: 100%;
    `)}
  }
`

const PageLayout: React.FC = ({ children }) => {
  return (
    <StyledPage>
      <div>{children}</div>
    </StyledPage>
  )
}

const StyledCard = styled(Card)`
  b {
    color: ${getColor('wheaty_1')};
    letter-spacing: 1px;
  }
`

type BakingPageProps = InferGetStaticPropsType<typeof getStaticProps>

const BakingPage: React.FC<BakingPageProps> = ({ recipe }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [showingStepIndex, setShowingStepIndex] = useState(0)

  const steps = getTimelineSteps(recipe)

  const onNext = () => {
    setCurrentStepIndex((prev) => prev + 1)
    setShowingStepIndex((prev) => prev + 1)
  }

  const resetSteps = () => {
    setCurrentStepIndex(0)
    setShowingStepIndex(0)
  }

  const showingStep = steps[showingStepIndex]

  return (
    <PageLayout>
      <Row style={{ marginBottom: '8px' }}>
        <Text fs='h5'>{recipe.name}</Text>
      </Row>
      <Row>
        <ProgressSteps
          onStepClick={(index) => {
            setShowingStepIndex(index)
          }}
          showing={showingStepIndex}
          total={steps.length}
          current={currentStepIndex}
        />
      </Row>
      <Row>
        <StyledCard>
          <Row style={{ marginBottom: '8px' }}>
            <Text fs='h4'>{showingStep.title}</Text>
          </Row>
          <Row style={{ marginBottom: '8px', height: '200px' }}>
            {renderDangerous.div(showingStep.description)}
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
              <Button onClick={() => setShowingStepIndex(currentStepIndex)}>
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

const ProgressItem = styled.button<{
  $isShowing: boolean
  $state: 'past' | 'current' | 'future'
}>`
  border: none;
  cursor: pointer;

  height: 4px;
  width: 40px;

  background-color: ${({ $isShowing, $state, theme }) => {
    if ($isShowing && $state !== 'current') {
      return theme.colors.text_2
    }

    switch ($state) {
      case 'current':
        return theme.colors.wheaty_1
      case 'past':
      case 'future':
      default:
        return theme.colors.secondary_1
    }
  }};
`

type ProgressStepProps = {
  total: number
  current: number
  showing?: number
  onStepClick?: (step: number) => void
}

const ProgressSteps: React.FC<ProgressStepProps> = ({
  total,
  current,
  showing,
  onStepClick = _noop,
}) => {
  const steps = Array.from({ length: total })

  return (
    <Row gutter={8} style={{ marginBottom: '16px' }}>
      {steps.map((_, index) => {
        const state =
          index < current ? 'past' : index === current ? 'current' : 'future'

        const isShowing = index === showing

        return (
          <Col key={index}>
            <ProgressItem
              onClick={() => {
                onStepClick(index)
              }}
              $isShowing={isShowing}
              $state={state}
            />
          </Col>
        )
      })}
    </Row>
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
