import { useState } from 'react'
import { Box } from 'theme-ui'
import TimerDroplet from './TimerDroplet'
import moment from 'moment'

type SampleScheduleProps = {
  times: RecipeType['times']
}

const getInitialStart = () => {
  const now = moment().get('minutes')

  let next = now
  while (next % 15 !== 0) {
    next++
  }

  console.log(next)

  return moment().minutes(next)
}

export default function SampleSchedule(props: SampleScheduleProps) {
  const { times } = props

  const [start, setStart] = useState(getInitialStart)

  console.log(start)

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
          <>
            <TimerDroplet
              key={step.title}
              onTimeChange={onTimeChange}
              step={step}
            />
            {i < arr.length - 1 && (
              <TimerDroplet.Divider key={`${step.title}-div`} />
            )}
          </>
        )
      })}
    </Box>
  )
}
