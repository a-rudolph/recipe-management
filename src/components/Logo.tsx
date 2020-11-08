/** @jsx jsx */
import { Box, jsx, Flex, Text } from 'theme-ui'
import { BRAND_NAME } from '../themes'
const logoUrl = '/leaf.svg'

export default {
  Img({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
    return <img sx={{ variant: 'logo', height: size }} src={logoUrl} />
  },
  Title() {
    return (
      <Flex sx={{ position: 'relative' }}>
        <Text
          sx={{
            ml: '12px',
            mr: '12px',
            textDecoration: 'underline',
          }}
          color='primary'
        >
          {BRAND_NAME}
        </Text>
        <Box
          sx={{
            position: 'absolute',
            right: '1px',
            top: '4px',
          }}
        >
          <img sx={{ variant: 'logo', height: 'medium' }} src={logoUrl} />
        </Box>
      </Flex>
    )
  },
}
