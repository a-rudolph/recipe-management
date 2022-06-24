import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { recipes } from '@constants/recipes'
import { z } from 'zod'

export const appRouter = trpc
  .router()
  .query('get-all-recipes', {
    resolve() {
      return {
        recipes,
      }
    },
  })
  .query('get-recipe', {
    input: z.string(),
    resolve({ input }) {
      const recipe = recipes.find((recipe) => recipe.key === input)

      if (!recipe) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'Recipe not found.',
        })
      }

      return {
        recipe,
      }
    },
  })

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
})
