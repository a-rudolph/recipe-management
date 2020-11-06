/** @jsx jsx */
import { Box, Card, Flex, Grid, Text, jsx } from 'theme-ui'
import Link from 'next/link'
import Logo from '../src/components/Logo'

export default function Home() {
  return (
    <Grid
      sx={{ height: '100%' }}
      gap={0}
      columns={[1, 'minmax(40vw, 300px) 60vw']}
    >
      <Box p='3' sx={{ height: '100%' }}>
        <h1>
          <Flex>
            <Logo.Title />
          </Flex>
        </h1>
        <Link href='/saturday-white-bread'>
          <Card sx={{ variant: 'card', cursor: 'pointer' }}>
            <Text>Saturday white bread</Text>
          </Card>
        </Link>
      </Box>
      <Box sx={{ position: 'relative', height: 'calc(100vh - 56px - 40px)' }}>
        <img
          src='/bg.jpg'
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <span
          sx={{ position: 'absolute', right: 0, bottom: 0, fontSize: '10px' }}
        >
          Photo by{' '}
          <a href='https://unsplash.com/@gaellemarcel?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText'>
            Gaelle Marcel
          </a>{' '}
          on{' '}
          <a href='https://unsplash.com/s/photos/wheat?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText'>
            Unsplash
          </a>
        </span>
      </Box>
    </Grid>
  )
}
