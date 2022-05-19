import fractionize from './fractionize'
import { getAutolysisDescription } from '@constants/descriptions'
import moment from 'moment'

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

type TimelineStepData = {
  title: string
  time: number
  // extras
  subTitle?: string
  description?: (recipe: RecipeType) => string
  duration?: number
}

export const getTimelineSteps = ({
  start,
  bulk,
  proof,
}: RecipeType): TimelineStepData[] => {
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
      description: getAutolysisDescription,
      duration: AUTOLYSE_HOURS,
      time: autol,
    },
    {
      title: 'mix',
      subTitle: 'bulk fermentation',
      duration: bulk,
      time: mix,
    },
    {
      title: 'shape',
      subTitle: 'proofing',
      duration: proof,
      time: shape,
    },
    {
      title: 'bake',
      subTitle: 'baking',
      duration: BAKE_HOURS,
      time: bake,
    },
    {
      title: 'ready to eat',
      time: eat,
    },
  ]
}
