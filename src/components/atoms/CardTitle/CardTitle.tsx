import { Row } from 'antd'
import { Text } from '@components/atoms'

const CardTitle = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Row style={{ margin: '-16px 0 8px -8px' }}>
      <Text
        fs='h5'
        color='text_2'
        style={{ letterSpacing: '0.5px', textTransform: 'uppercase' }}
      >
        {children}
      </Text>
    </Row>
  )
}

export default CardTitle
