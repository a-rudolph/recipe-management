import { Card } from '@/components/atoms'
import { getColor } from '@/styles/themes'
import styled from 'styled-components'

type ModalProps = {
  visible?: boolean
  children: React.ReactNode
  cardStyle?: React.CSSProperties
  onClose?: VoidFunction
  closeable?: boolean
} & React.HTMLAttributes<Element>

const StyledMask = styled.div<{ visible?: boolean }>`
  height: 100vh;
  width: 100vw;
  z-index: 50;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.5);

  display: ${({ visible }) => (visible ? 'block' : 'none')};

  .atom-card {
    z-index: 51;

    position: absolute;
    top: 10vh;
    left: 50%;
    transform: translate(-50%, 0);

    box-shadow: 1px 2px 3px 0 rgb(0, 0, 0, 0.8);

    max-width: 80vw;
    width: 400px;
    height: 320px;
    background-color: ${getColor('primary_1')};
  }
`

export default function Modal({
  visible,
  closeable = true,
  children,
  cardStyle,
  onClose,
  className = '',
  ...rest
}: ModalProps) {
  return (
    <StyledMask
      {...rest}
      className={`atom-modal-mask ${className}`}
      visible={visible}
      onClick={onClose}
    >
      {visible && (
        <Card
          className='atom-modal-card'
          style={cardStyle}
          onClick={(e) => e.stopPropagation()}
        >
          {closeable && (
            <button
              style={{
                position: 'absolute',
                right: '8px',
                top: '8px',
              }}
              onClick={onClose}
            >
              x
            </button>
          )}
          {children}
        </Card>
      )}
    </StyledMask>
  )
}
