import type { AppRouter } from '@pages/api/trpc/[trpc]'
import { createReactQueryHooks } from '@trpc/react'
import { createTRPCClient } from '@trpc/client'

export const trpcUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/api/trpc`
  : 'http://localhost:3000/api/trpc'

export const trpc = createReactQueryHooks<AppRouter>()

export const client = createTRPCClient<AppRouter>({
  url: trpcUrl,
})
