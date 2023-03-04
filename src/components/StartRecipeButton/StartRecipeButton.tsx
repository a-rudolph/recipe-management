import PlayButton from '@components/icons/Play'
import StopButton from '@components/icons/Stop'
import styled from 'styled-components'

const StyledButton = styled.button`
  width: 88px;
  height: 88px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 24px;
  left: 0;
  transform: translate(0, -50%);
  z-index: 10;

  border: 8px solid;
  border-color: #2d3134;

  box-shadow: ${({ theme }) => theme.shadows.up};

  background: ${({ theme }) => theme.colors.secondary_1};

  position: relative;

  &:after {
    content: '';
    background: ${({ theme }) => theme.gradient};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    z-index: -1;
  }
`

const StartRecipeButton: React.FC<{
  onClick: () => void
  step: number | null
}> = ({ onClick, step }) => {
  return (
    <StyledButton onClick={onClick}>
      {step !== null && <StopButton />}
      {step === null && (
        <PlayButton
          style={{
            transform: 'translateX(2px)',
          }}
        />
      )}
    </StyledButton>
  )
}

export default StartRecipeButton
