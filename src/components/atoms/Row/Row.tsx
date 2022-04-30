import styled, { CSSProperties } from 'styled-components'

type RowProps = {
  justify?: CSSProperties['justifyContent']
  align?: CSSProperties['alignItems']
}

const Row = styled.div<RowProps>`
  display: flex;
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};

  &.centered {
    justify-content: center;
  }
`

export default Row
