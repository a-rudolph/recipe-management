import { Row, Text } from '@components/atoms'
import { Col } from 'antd'

const CardTitle: React.FC<{ style?: React.CSSProperties }> = ({
  children,
  style,
}) => {
  return (
    <Row style={{ margin: '16px', ...style }}>
      <Col>
        <Text
          fs='h5'
          color='text_2'
          style={{
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          {children}
        </Text>
      </Col>
    </Row>
  )
}

export default CardTitle
