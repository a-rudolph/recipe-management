import { recipes } from '../../src/constants/recipes'
import { Box } from 'theme-ui'
import SampleSchedule from '../../src/components/SampleSchedule'

export default function Schedule() {
  return (
    <Box p={4} pt={6}>
      <SampleSchedule times={recipes[0].times} />
    </Box>
  )
}
