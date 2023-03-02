import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import Text from '@components/atoms/Text'

export type CardProps = {
  side?: 'left' | 'right'
  onClose?: VoidFunction
} & React.HTMLAttributes<HTMLDivElement>

const StyledCard = styled.div.attrs<CardProps>({
  className: `atom-card`,
})<CardProps>`
  border-radius: 15px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: ${({ theme }) => theme.gradient};
  padding: 16px;
  position: relative;
`

const Close = styled(Button)`
  top: 8px;
  right: 8px;
  position: absolute;
  padding: 4px 8px;
  background: transparent;
  opacity: 0.6;
  border: none;

  transition: all 0.1s;
  &:hover {
    opacity: 0.8;
  }
`

const Card = ({ children, onClose, ...rest }: CardProps) => {
  return (
    <StyledCard {...rest}>
      {onClose && (
        <Close onClick={onClose}>
          <Text>
            <CloseOutlined />
          </Text>
        </Close>
      )}
      {children}
    </StyledCard>
  )
}

export default Card
