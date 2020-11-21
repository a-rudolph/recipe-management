import { GetStaticPaths, GetStaticProps } from 'next'
import { Box } from 'theme-ui'
import SampleSchedule from '../../../src/components/SampleSchedule'
import getRecipePaths from '../../../src/utils/getRecipePaths'
import getRecipeProps from '../../../src/utils/getRecipeProps'

export default function Schedule({ recipe }: RecipeProp) {
  return (
    <Box p={3} pt={6}>
      <SampleSchedule times={recipe.times} />
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
