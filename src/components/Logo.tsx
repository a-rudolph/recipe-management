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
      <Box id='logo-wrapper' sx={{ position: 'relative' }}>
        <Styled.h3
          sx={{
            fontSize: '32px',
            m: '24px 12px',
            textDecoration: 'underline',
          }}
          color='primary'
        >
          {BRAND_NAME}
        </Styled.h3>
        <Box
          sx={{
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
