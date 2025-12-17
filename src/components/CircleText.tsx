import clsx from 'clsx'

type Props = {
  text?: string
  textColor?: string
  backgroundColor?: string
  className?: string
}

export default function CircleText({
  text = 'Drink Starix ♥ Drink Healthy ♥ ',
  textColor = '#000000',
  backgroundColor = '#00ffff',
  className,
}: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 300 300'
      className={clsx('w-260px h-260px', className)}
    >
      {/* Soft BG circle */}
      <circle
        cx='150'
        cy='150'
        r='130'
        fill={backgroundColor}
        stroke={textColor}
        strokeWidth='3'
      />

      <defs>
        <path
          id='circlePath'
          d='
            M 150,150
            m -110,0
            a 110,110 0 1,1 220,0
            a 110,110 0 1,1 -220,0
          '
        />
      </defs>

      <text
        fill={textColor}
        fontSize='26'
        fontWeight='600'
        letterSpacing='3px'
        className='animate-spin-slow origin-center tracking-wide'
      >
        <textPath href='#circlePath' startOffset='0%'>
          {text.repeat(3)}
        </textPath>
      </text>
    </svg>
  )
}
