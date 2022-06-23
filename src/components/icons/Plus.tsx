const PlusButton = (props: React.HTMLAttributes<{}>) => {
  return (
    <svg
      {...props}
      width='29'
      height='30'
      viewBox='0 0 29 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='12.6016'
        y='30'
        width='30'
        height='3.05502'
        rx='1.52751'
        transform='rotate(-90 12.6016 30)'
        fill='#F6BB63'
      />
      <rect
        y='13.3784'
        width='28.2589'
        height='3.24324'
        rx='1.62162'
        fill='#F6BB63'
      />
    </svg>
  )
}

export default PlusButton
