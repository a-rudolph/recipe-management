import { Card, Row } from 'antd'
import { createResponsiveStyle, getColor } from '@styles/themes'
import styled, { css } from 'styled-components'
import { appRouter } from './api/trpc/[trpc]'
import { createSSGHelpers } from '@trpc/react/ssg'
import { getAutolysisDescription } from '@constants/descriptions'
import { InferGetStaticPropsType } from 'next'
import { renderDangerous } from '@utils/dangerous-renders'
import { Text } from '@components/atoms'

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
  return (
    <PageLayout>
      <Row style={{ marginBottom: '8px' }}>
        <Text fs='h5'>getting started</Text>
      </Row>
      <Row>
        <StyledCard>
          <Row style={{ marginBottom: '8px' }}>
            <Text fs='h4'>Autolyse</Text>
          </Row>
          {renderDangerous.div(getAutolysisDescription(recipe))}
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
