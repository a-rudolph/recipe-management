export default function LeftArrow({ size = 16 }: IconProps) {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox='0 0 37 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16.25 5L4 17.25L16.25 29.5'
        stroke='#FFE3B9'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M4 17.25L32 17.25'
        stroke='#FFE3B9'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}
