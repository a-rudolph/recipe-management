const PlayButton = (props: React.HTMLAttributes<{}>) => {
  return (
    <svg
      {...props}
      className='play-icon'
      width='24'
      height='28'
      viewBox='0 0 24 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21.8129 11.4404C23.7266 12.6103 23.7266 15.3897 21.8129 16.5596L5.06473 26.798C3.06568 28.02 0.5 26.5814 0.5 24.2384V3.76163C0.5 1.41864 3.06568 -0.0200285 5.06472 1.20201L21.8129 11.4404Z'
        fill='#F6BB63'
      />
    </svg>
  )
}

export default PlayButton
