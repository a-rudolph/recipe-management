import { useCallback, useState } from 'react'
import { Box } from 'theme-ui'
import TimerDroplet from './TimerDroplet'
import moment from 'moment'
import Modal from './Modal'

type SampleScheduleProps = {
  times: RecipeType['times']
}

export default function SampleSchedule(props: SampleScheduleProps) {
  const { times } = props

  const [modal, setModal] = useState<Step | null>(null)

  const onTimeClick = useCallback((step: Step) => {
    setModal(step)
  }, [])

  const start = moment()
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
        return (
          <>
            <TimerDroplet onTimeClick={onTimeClick} step={step} />
            {i < arr.length - 1 && <TimerDroplet.Divider />}
          </>
        )
      })}
    </Box>
  )
}
