/** @jsx jsx */
import { Box, Card, Flex, Grid, Text, jsx } from 'theme-ui'
import Logo from '../src/components/Logo'
import Link from 'next/link'

export default function Home() {
  const startingStyle: { [key: string]: import('theme-ui').SxStyleProp } = {
    banner: {
      height: '50vh',
      position: 'relative',
    },
    placeholder: {
      height: '50vh',
      position: 'absolute',
    },
  }

  return (
    <Grid sx={{ height: '50vh' }} gap={0}>
      <Box sx={{ position: 'relative' }}>
        <Box sx={startingStyle.placeholder} />
        <Box sx={startingStyle.banner}>
          <img
            src='/bg.jpg'
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <span
            sx={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              fontSize: '12px',
            }}
          >
            Photo by{' '}
            <a
              sx={{ color: 'text' }}
              href='https://unsplash.com/@gaellemarcel?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText'
            >
              Gaelle Marcel
            </a>{' '}
            on{' '}
            <a
              sx={{ color: 'text' }}
              href='https://unsplash.com/s/photos/wheat?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText'
            >
              Unsplash
            </a>
          </span>
        </Box>
        <Box variant='mask' />
      </Box>
      <Box p='3' sx={{ height: '100%' }}>
        <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
          <Grid sx={{ maxWidth: '560px', width: '100%' }}>
            <Flex sx={{ width: '100%' }}>
              <Logo.Title />
            </Flex>
            <Link href='/saturday-white-bread'>
              <Card sx={{ variant: 'card', cursor: 'pointer' }}>
                <Text>Saturday white bread</Text>
              </Card>
            </Link>
            <Link href='/saturday-white-bread'>
              <Card sx={{ variant: 'card', cursor: 'pointer' }}>
                <Text>Saturday 75% whole wheat</Text>
              </Card>
            </Link>
            <Link href='/saturday-white-bread'>
              <Card sx={{ variant: 'card', cursor: 'pointer' }}>
                <Text>Overnight white bread</Text>
              </Card>
            </Link>
            <Link href='/saturday-white-bread'>
              <Card sx={{ variant: 'card', cursor: 'pointer' }}>
                <Text>Overnight 40% whole wheat</Text>
              </Card>
            </Link>
          </Grid>
        </Flex>
      </Box>
    </Grid>
  )
}
