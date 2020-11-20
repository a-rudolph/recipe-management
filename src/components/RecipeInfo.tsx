/** @jsx jsx */
import { Box, Grid, jsx, Text } from 'theme-ui'
import fractionize from '../utils/fractionize'

type RecipeTimesProps = {
  times: RecipeType['times']
}

export default function RecipeTimes(props: RecipeTimesProps) {
  const { times } = props

  const timeStyles = {
    color: 'accent',
    fontWeight: 500,
    padding: '0 8px',
  }

  return (
    <Grid gap={0} columns={['auto', 'max-content auto']}>
      <Grid pl={1} gap={0} columns={['100%', 'auto 1fr']}>
        <Box>Bulk fermentation time:</Box>
        <Box>
          <Text sx={timeStyles}>
            {times.bulk.map((time) => fractionize(time)).join('-')} hours
          </Text>
        </Box>
      </Grid>
      <Grid
        gap={0}
        columns={['100%', 'auto 1fr']}
        sx={{
          pl: 1,
          borderTopLeftRadius: '3px',
          flexGrow: 1,
          borderLeft: '2px solid',
          borderTop: '2px solid',
          borderColor: 'accent',
        }}
      >
        <Box>Proof time:</Box>
        <Box>
          <Text sx={timeStyles}>
            {times.proof.map((time) => fractionize(time)).join('-')} hours
          </Text>
        </Box>
      </Grid>
    </Grid>
  )
}
