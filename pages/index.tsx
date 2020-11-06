import Link from 'next/link'
import { Box, Card, Flex, Text } from 'theme-ui'
import Logo from '../src/components/Logo'

export default function Home() {
  return (
    <Box p='3'>
      <h1>
        <Flex>
          Welcome to <Logo.Title />
        </Flex>
      </h1>
      <Link href='/saturday-white-bread'>
        <Card sx={{ variant: 'card', cursor: 'pointer' }}>
          <Text>Saturday white bread</Text>
        </Card>
      </Link>
    </Box>
  )
}
