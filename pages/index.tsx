import { appRouter } from './api/trpc/[trpc]'
import BasicLayout from '@layouts/BasicLayout'
import { createSSGHelpers } from '@trpc/react/ssg'
import type { InferGetStaticPropsType } from 'next'
import RecipeList from '@components/RecipeList'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

const Home = ({ recipes }: HomeProps) => {
  return (
    <BasicLayout.Card side='right'>
      <RecipeList recipes={recipes} />
    </BasicLayout.Card>
  )
}

export const getStaticProps = async () => {
  const ssg = await createSSGHelpers({
    router: appRouter,
    ctx: () => null,
  })

  // Prefetch `get-all-recipes`
  const data = await ssg.fetchQuery('get-all-recipes')

  return {
    props: {
      recipes: data.recipes,
    },
  }
}

export default Home
