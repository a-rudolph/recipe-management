/** @jsx jsx */
import { jsx, Button, Box, Flex, Text } from 'theme-ui'

export const Nav = () => {
  return (
    <Box sx={{ variant: 'nav' }}>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Text sx={{ variant: 'nav.item' }}>yeastily</Text>
        <Button sx={{ variant: 'button' }}>Button</Button>
      </Flex>
    </Box>
  )
}
