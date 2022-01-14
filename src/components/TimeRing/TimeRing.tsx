import styled from 'styled-components'

const StyledRing = styled.div<{ diameter: number; perimeter: number }>`
  .ring {
    position: absolute;
    top: 16px;
    right: 36px;

    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.wheaty_1};
    border-radius: 50%;
    height: ${({ diameter }) => diameter}px;
    width: ${({ diameter }) => diameter}px;
    transform: rotate(-90deg);

    circle {
      stroke: ${({ theme }) => theme.colors.wheaty_1};
      stroke-width: 5px;
      fill: none;

      stroke-dasharray: ${({ perimeter }) => perimeter}px;
    }
  }
`

type TimeRingProps = {
  percent?: number
  width?: number
}

export default function TimeRing({ percent = 0, width = 200 }: TimeRingProps) {
  const diameter = width
  const r = width / 2
  const perimeter = diameter * Math.PI

  const offset = perimeter * (1 - percent)

  return (
    <StyledRing diameter={diameter} perimeter={perimeter}>
      <svg className='ring' xmlns='http://www.w3.org/2000/svg'>
        <circle cx={r} cy={r} r={r} strokeDashoffset={offset} />
      </svg>
    </StyledRing>
  )
}
