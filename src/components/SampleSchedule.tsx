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

  return (
    <Box sx={{ width: '120px' }}>
      <Modal visible={Boolean(modal)} onClose={() => setModal(null)}>
        Select {modal?.title} time
      </Modal>
      <TimerDroplet
        onTimeClick={onTimeClick}
        step={{
          time: timeMoments.start,
          title: 'Mix',
        }}
      />
      <TimerDroplet.Divider />
      <TimerDroplet
        onTimeClick={onTimeClick}
        step={{
          time: timeMoments.shape,
          title: 'Shape',
        }}
      />
      <TimerDroplet.Divider />
      <TimerDroplet
        onTimeClick={onTimeClick}
        step={{
          time: timeMoments.bake,
          title: 'Bake',
        }}
      />
    </Box>
  )
}
