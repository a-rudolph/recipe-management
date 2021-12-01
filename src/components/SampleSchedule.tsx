import TimerDroplet from './TimerDroplet'
import moment, { Moment } from 'moment'
import { useTimeContext } from '@hooks/useTimeContext'
import { Fragment } from 'react'
import { Box } from 'theme-ui'

type SampleScheduleProps = {
  times: RecipeType['times']
}

export default function SampleSchedule(props: SampleScheduleProps) {
  const { times } = props

  const {
    time: { start },
    setTime,
  } = useTimeContext()

  const setStart = (start: Moment) => setTime({ start })

  const shape = moment(start).add(times.bulk[0], 'h')
  const bake = moment(shape).add(times.proof[0], 'h')
  const timeMoments = {
    start,
    shape,
    bake,
  }

  const steps: Steps = [
    {
      time: timeMoments.start,
      title: 'Mix',
    },
    {
      time: timeMoments.shape,
      title: 'Shape',
    },
    {
      time: timeMoments.bake,
      title: 'Bake',
    },
  ]

  return (
    <Box sx={{ width: '120px' }}>
      {steps.map((step, i, arr) => {
        const onTimeChange = i === 0 ? setStart : undefined

        return (
          <Fragment key={step.title}>
            <TimerDroplet onTimeChange={onTimeChange} step={step} />
            {i < arr.length - 1 && <TimerDroplet.Divider />}
          </Fragment>
        )
      })}
    </Box>
  )
}
