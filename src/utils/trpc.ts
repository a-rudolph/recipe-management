import type { AppRouter } from '@pages/api/trpc/[trpc]'
import { createReactQueryHooks } from '@trpc/react'
import { createTRPCClient } from '@trpc/client'

console.log('process.env: ', process.env)

export const trpcUrl = process.env.API_URL
  ? `https://${process.env.API_URL}/api/trpc`
  : 'http://localhost:3000/api/trpc'

export const trpc = createReactQueryHooks<AppRouter>()

export const client = createTRPCClient<AppRouter>({
  url: trpcUrl,
})
