import styled, { css } from 'styled-components'
import breakpoints from '@/constants/breakpoints'
import PlayButton from '@/components/icons/Play'
import StopButton from '@/components/icons/Stop'
import { Text } from '@/components/atoms'

const StyledButton = styled.button<{ $centered?: boolean }>`
  width: 88px;
  height: 88px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ $centered }) =>
    $centered &&
    css`
      position: absolute;
      bottom: 24px;
      left: 0;
      transform: translate(0, -50%);
      z-index: 10;
    `}

  border: 8px solid;
  border-color: #2d3134;

  box-shadow: ${({ theme }) => theme.shadows.up};

  background: ${({ theme }) => theme.colors.secondary_1};

  position: relative;
  cursor: pointer;

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

  .floating-text {
    @media screen and (max-width: ${breakpoints.sm}px) {
      display: none;
    }

    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(-110px);

    padding: 0 16px;
    height: 100%;
    opacity: 0;
    transition: all 0.3s ease;

    white-space: nowrap;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    .floating-text {
      opacity: 1;
      transform: translateX(-148px);
    }
  }
`

const StartRecipeButton: React.FC<{
  onClick: () => void
  step: number | null
  centered?: boolean
}> = ({ onClick, step, centered }) => {
  return (
    <StyledButton onClick={onClick} $centered={centered}>
      {step !== null && <StopButton />}
      {step === null && (
        <>
          <div className='floating-text'>
            <Text fs={24} color='wheaty_1'>
              Start recipe
            </Text>
          </div>
          <PlayButton
            style={{
              transform: 'translateX(2px)',
            }}
          />
        </>
      )}
    </StyledButton>
  )
}

export default StartRecipeButton
