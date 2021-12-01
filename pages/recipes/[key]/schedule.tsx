import { GetStaticPaths, GetStaticProps } from 'next'
import { Box, Flex, Grid, Text } from 'theme-ui'
import SampleSchedule from '@components/SampleSchedule'
import getRecipePaths from '@utils/getRecipePaths'
import getRecipeProps from '@utils/getRecipeProps'
import FoldCount from '@components/FoldCount'
import TimeStep from '@components/TimeStep'

const Bullet = ({ isActive }: { isActive?: boolean }) => (
  <Flex variant='flex.center'>
    <Box
      sx={{
        m: 1,
        bg: isActive ? 'accent' : 'gray',
        height: '8px',
        width: '8px',
        borderRadius: '50%',
      }}
    />
  </Flex>
)

const Bullets = ({
  count,
  active = -1,
}: {
  count: number
  active?: number
}) => {
  const arr = new Array(count).fill(null)

  const bullets = arr.map((_, i) => <Bullet key={i} isActive={i === active} />)

  return <>{bullets}</>
}

export default function Schedule({ recipe }: RecipeProp) {
  return (
    <Box p={3} pt={6} sx={{ display: 'flex', justifyContent: 'center' }}>
      <SampleSchedule times={recipe.times} />
      <Box px={2} sx={{ flexGrow: 1, maxWidth: ['80vw', '50vw'] }}>
        <Grid gap={0}>
          <TimeStep title='Autolyse' time={0.5} />
          <Bullets count={1} />
          <Text variant='step'>Mix final dough</Text>
          <TimeStep title='Bulk fermentation' time={recipe.times.bulk[0]} />
          <FoldCount count={3} />
          <Bullets count={3} />
          <Text variant='step'>Shape loaves</Text>
          <TimeStep title='Proof' time={recipe.times.proof[0]} />
          <Bullets count={2} />

          <TimeStep title='Bake' time={0.75} />
        </Grid>
      </Box>
    </Box>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    ...getRecipePaths(),
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    ...getRecipeProps(params),
  }
}
