import moment from 'moment'

export const getNextMoment = (precision: number = 15) => {
  const now = moment().get('minutes')

  let next = now
  while (next % precision !== 0) {
    next++
  }

  return moment().minutes(next)
}
