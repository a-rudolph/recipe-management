import { SW_NOTIFICATIONS } from '@/constants/features'
import { z } from 'zod'

export const getServiceWorkerRegistration = async () => {
  if (!('serviceWorker' in navigator)) return null

  return navigator.serviceWorker.getRegistration()
}

export const getServiceWorker = async () => {
  const registration = await getServiceWorkerRegistration()

  return registration?.active || null
}

export const setupMessageListener = () => {
  if (!('serviceWorker' in navigator)) return

  navigator.serviceWorker.addEventListener('message', (event) => {
    // event is a MessageEvent object
    console.log(`The service worker sent me a message: ${event.data}`)
  })
}

export const messageSW = async (data: ActionTypes) => {
  if (!SW_NOTIFICATIONS) return
  const sw = await getServiceWorker()

  if (!sw) return

  sw.postMessage(data)
}

export const TIMER_START = 'TIMER_START'
export const TIMER_FINISH = 'TIMER_FINISH'
export const TIMER_STOP = 'TIMER_STOP'
export const TIMER_RUNNING = 'TIMER_RUNNING'

export const actionSchema = {
  startTimer: z.object({
    type: z.literal(TIMER_START),
    payload: z.object({
      endTimeNumber: z.number(),
    }),
  }),
  finishTimer: z.object({
    type: z.literal(TIMER_FINISH),
  }),
  stopTimer: z.object({
    type: z.literal(TIMER_STOP),
  }),
}

export type ActionTypes = z.infer<
  (typeof actionSchema)[keyof typeof actionSchema]
>
