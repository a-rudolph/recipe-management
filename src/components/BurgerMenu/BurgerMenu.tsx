import { animated, useSpring } from 'react-spring'

const BurgerMenu = ({ isOpen }: { isOpen: boolean }) => {
  const first = useSpring({
    transform: isOpen
      ? 'translate(5px, 32px) rotate(-45deg)'
      : 'translate(2px, 7px) rotate(0deg)',
  })
  const second = useSpring({
    transform: isOpen
      ? 'translate(10px, 4px) rotate(45deg)'
      : 'translate(2px, 19px) rotate(0deg)',
  })
  const third = useSpring({
    transform: isOpen
      ? 'translate(5px, 32px) rotate(-45deg)'
      : 'translate(2px, 31px) rotate(0deg)',
  })

  return (
    <svg
      width='40'
      height='32'
      viewBox='0 0 44 44'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <animated.rect width='40' height='4' rx='2' style={first} />
      <animated.rect width='40' height='4' rx='2' style={second} />
      <animated.rect width='40' height='4' rx='2' style={third} />
    </svg>
  )
}

export default BurgerMenu
