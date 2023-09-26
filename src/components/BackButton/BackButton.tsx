import { Button, Text } from '@/components/atoms'
import { Col, Row } from 'antd'
import LeftIcon from '@/components/icons/Left'

export const BackButton = ({
  onBack,
  children,
}: {
  onBack?: VoidFunction
  children: string
}) => {
  return (
    <Button type='ghost' onClick={onBack}>
      <Row align='middle' gutter={8} justify='center'>
        <Col>
          <Text style={{ marginTop: '4px' }} color='wheaty_1'>
            <LeftIcon size={12} />
          </Text>
        </Col>
        <Col>
          <Text fs='h5' color='text_2' style={{ letterSpacing: '0.5px' }}>
            {children}
          </Text>
        </Col>
      </Row>
    </Button>
  )
}

export default BackButton
