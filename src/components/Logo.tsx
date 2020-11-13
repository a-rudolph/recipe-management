/** @jsx jsx */
import { Box, jsx, Styled } from 'theme-ui'
import { BRAND_NAME } from '../themes'

const logoUrl = '/leaf.svg'

export default {
  Img({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
    return <img sx={{ variant: 'logo', height: size }} src={logoUrl} />
  },
  Title() {
    return (
      <Box id='logo-wrapper' sx={{ position: 'absolute', top: '35vh' }}>
        <Styled.h1
          sx={{
            zIndex: 35,
            fontWeight: 650,
            m: '24px 12px',
            textDecoration: 'underline',
            color: 'muted',
          }}
        >
          {BRAND_NAME}
        </Styled.h1>
        <Box
          sx={{
            zIndex: 25,
            position: 'absolute',
            right: '1px',
            top: '36px',
          }}
        >
          <img sx={{ variant: 'logo', height: 'medium' }} src={logoUrl} />
        </Box>
      </Box>
    )
  },
}
