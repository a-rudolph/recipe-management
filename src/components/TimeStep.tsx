import { Box, Text } from 'theme-ui'
import formatTime from '@utils/formatTime'

type TimeStepProps = {
  title: string
  time?: number
}

export default function TimeStep(props: TimeStepProps) {
  const { title, time } = props

  return (
    <Box>
      <Box sx={{ bg: 'muted', p: 1, borderRadius: '4px' }}>
        <Text>{title}</Text>
      </Box>
      <Box sx={{ height: '10px' }}>
        {time && (
          <Text
            sx={{
              textAlign: 'end',
              fontSize: '12px',
              fontWeight: 500,
              color: 'gray',
            }}
          >
            {formatTime(time)}
          </Text>
        )}
      </Box>
    </Box>
  )
}
