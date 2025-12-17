'use client'
import CircleText from './CircleText'
import StarixLogo from './StarixLogo'
import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className='bg-[#000000] text-[#ffff00] relative'>
      <div className='relative mx-auto flex w-full max-w-4xl justify-center px-4 py-10'>
        <StarixLogo />

        <div className='absolute sm:right-24 top-0 size-28 origin-center -translate-y-14 md:size-48 md:-translate-y-28'>
          <CircleText />
        </div>
      </div>

      {/* Scroll To Top Button - fixed at bottom-right */}
      <button
        onClick={scrollToTop}
        aria-label='Scroll to top'
        className='
          absolute bottom-6 right-4
          flex items-center justify-center
          h-12 w-12 rounded-full
          bg-[#00ffff] text-black
          shadow-lg cursor-pointer
          z-50
        '
      >
        <ArrowUp className='h-8 w-8' />
      </button>
    </footer>
  )
}
