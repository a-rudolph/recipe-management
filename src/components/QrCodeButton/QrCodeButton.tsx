import { Text, Button } from '@components/atoms'
import { Row, Col, Modal } from 'antd'
import { QrcodeOutlined } from '@ant-design/icons'

const QrCodeButton = () => {
  const onClick = () => {
    Modal.info({
      content: <img alt='qr-code' src='/qr-codes/qr-development.png' />,
      maskClosable: true,
      icon: false,
    })
  }

  return (
    <Button type='ghost' onClick={onClick}>
      <Text>
        <Row gutter={8}>
          <Col>
            <QrcodeOutlined />
          </Col>
          <Col>open on your phone</Col>
        </Row>
      </Text>
    </Button>
  )
}

export default QrCodeButton
