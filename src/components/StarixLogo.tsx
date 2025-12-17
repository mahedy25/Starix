import { Cinzel } from 'next/font/google'

export const cinzel = Cinzel({
  subsets: ['latin'],
  weight: '900',
  display: 'swap',
})

export default function StarixLogo() {
  return (
    <div className='flex justify-center items-center mt-6 z-10 cursor-pointer'>
      <h1
        className={`${cinzel.className} text-5xl md:text-6xl   font-bold`}
      >
        Starix
      </h1>
    </div>
  )
}
