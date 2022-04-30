import { Button, Text } from '@components/atoms'
import LeftIcon from '@components/icons/Left'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  &.go-back-button {
    margin-left: -16px;
    display: flex;
    align-items: center;
    padding: 0;

    .left-icon-wrap {
      margin-right: 8px;
      margin-bottom: 2px;
    }
  }
`

export const BackButton = ({
  onBack,
  children,
}: {
  onBack?: VoidFunction
  children: string
}) => {
  return (
    <StyledButton onClick={onBack} className='go-back-button' type='ghost'>
      <div className='left-icon-wrap'>
        <Text color='wheaty_1'>
          <LeftIcon size={12} />
        </Text>
      </div>
      <Text fs='h5' color='text_2' style={{ letterSpacing: '0.5px' }}>
        {children}
      </Text>
    </StyledButton>
  )
}

export default BackButton
