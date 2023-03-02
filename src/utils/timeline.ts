import {
  getAutolysisDescription,
  getBakeDescription,
  getBakePostDescription,
  getBakePreDescription,
  getFoldDescription,
  getMixDescription,
  getProofDescription,
  getShapeDescription,
} from '@constants/descriptions'
import fractionize from './fractionize'
import moment from 'moment'
import { useCurrentRecipeStore } from 'stores/current-recipe'

export const hoursToTimeString = (hours: number, format: string = 'h:mm a') => {
  return moment({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
    .add(hours, 'hours')
    .format(format)
}

export const hoursToDuration = (hours: number): string => {
  if (hours < 1) {
    return `${hours * 60} minutes`
  }

  if (hours === 1) {
    return '1 hour'
  }

  return `${fractionize(hours)} hours`
}

export type TimelineStepData = {
  title: string
  time: number
  // extras
  subTitle?: string
  description?: string
  postDescription?: string
  preDescription?: string
  duration: number
}

export const useTimelineSteps = (recipe?: RecipeType): TimelineStepData[] => {
  const currentStart = useCurrentRecipeStore((state) => state.startTime)

  if (!recipe) return []

  const { start: defaultStart, bulk, proof } = recipe

  const start = currentStart || defaultStart

  const AUTOLYSE_HOURS = 0.5
  const BAKE_HOURS = 1 // baking + cooling

  const autol = start - AUTOLYSE_HOURS
  const mix = start
  const shape = start + bulk
  const bake = shape + proof
  const eat = bake + BAKE_HOURS

  return [
    {
      title: 'autolyse',
      subTitle: 'autolysis',
      description: getAutolysisDescription(recipe),
      duration: AUTOLYSE_HOURS,
      time: autol,
    },
    {
      title: 'mix',
      description: getMixDescription(recipe),
      subTitle: 'bulk fermentation',
      postDescription: getFoldDescription(recipe),
      duration: bulk,
      time: mix,
    },
    {
      title: 'shape',
      subTitle: 'proofing',
      description: getShapeDescription(2),
      postDescription: getProofDescription(),
      preDescription: getBakePreDescription(recipe),
      duration: proof,
      time: shape,
    },
    {
      title: 'bake',
      subTitle: 'baking',
      description: getBakeDescription(recipe),
      postDescription: getBakePostDescription(recipe),
      duration: BAKE_HOURS,
      time: bake,
    },
    {
      title: 'ready to eat!',
      time: eat,
      duration: 0,
    },
  ]
}
