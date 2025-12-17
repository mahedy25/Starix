'use client'
import { FC, useRef, useState } from 'react'
import { Content } from '@prismicio/client'
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from '@prismicio/react'
import { SodaCanProps } from '@/components/SodaCan'
import { Center, Environment, View } from '@react-three/drei'
import FloatingCan from '@/components/FloatingCan'
import { ArrowIcon } from '@/slices/Carousel/ArrowIcon'
import clsx from 'clsx'
import { WavyCircles } from './WavyCircles'
import { Group } from 'three'
import gsap from 'gsap'
import { PrismicNextLink } from '@prismicio/next'

const SPINS_ON_CHANGE = 8

const FLAVORS: {
  flavor: SodaCanProps['flavor']
  color: string
  name: string
}[] = [
  { flavor: 'blackCherry', color: '#710523', name: 'Black Cherry' },
  { flavor: 'grape', color: '#572981', name: 'Goated Grape' },
  { flavor: 'lemonLime', color: '#164405', name: 'Lemon Lime' },
  {
    flavor: 'strawberryLemonade',
    color: '#690B3D',
    name: 'Strawberry Lemonade',
  },
  { flavor: 'watermelon', color: '#4B7002', name: 'Watermelon Bomb' },
]

export type CarouselProps = SliceComponentProps<Content.CarouselSlice>

const Carousel: FC<CarouselProps> = ({ slice }) => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0)
  const sodaCanRef = useRef<Group>(null)

  function changeFlavor(index: number) {
    if (!sodaCanRef.current) return

    const nextIndex = (index + FLAVORS.length) % FLAVORS.length

    const tl = gsap.timeline()
    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
            : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: 'power2.inOut',
        duration: 1,
      },
      0
    )
      .to(
        '.background, .wavy-circles-outer, .wavy-circles-inner',
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: 'power2.inOut',
          duration: 1,
        },
        0
      )
      .to(
        '.text-wrapper',
        {
          duration: 0.2,
          y: -10,
          opacity: 0,
        },
        0
      )
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
      .to(
        '.text-wrapper',
        {
          duration: 0.2,
          y: 0,
          opacity: 1,
        },
        0.7
      )
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className='carousel relative grid h-screen w-full grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white'
    >
      <div className='background pointer-events-none absolute inset-0 bg-[#710523] opacity-50' />

      <WavyCircles className='absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]' />

      <h2 className='relative text-center text-5xl font-bold'>
        <PrismicText field={slice.primary.heading} />
      </h2>

      {/* --- Main Content Area --- */}
      <div className='relative flex items-center justify-center'>
        {/* Left Button */}
        <ArrowButton
          onclick={() => changeFlavor(currentFlavorIndex + 1)}
          direction='left'
          label='Previous Flavor'
        />

        {/* Can View */}
        <View className='aspect-square h-[70vmin] min-h-40'>
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              ref={sodaCanRef}
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavorIndex].flavor}
            />
          </Center>

          <Environment
            files='/hdrs/lobby.hdr'
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>

        {/* Right Button */}
        <ArrowButton
          onclick={() => changeFlavor(currentFlavorIndex - 1)}
          direction='right'
          label='Next Flavor'
        />
      </div>
      {/* ------------------------- */}

      <div className='text-area relative mx-auto text-center'>
        <div className='text-wrapper text-4xl font-medium'>
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>
        <div className='mt-2 text-2xl font-normal opacity-90'>
          <PrismicRichText field={slice.primary.price_text} />
        </div>
        <div className='mt-6'>
          <PrismicNextLink
            field={slice.primary.button_link}
            className=' rounded-xl bg-[#FF3131] px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-[#000000] md:text-2xl'
          >
            {slice.primary.button_text}
          </PrismicNextLink>
        </div>
      </div>
    </section>
  )
}

export default Carousel

type ArrowButtonProps = {
  direction?: 'right' | 'left'
  label: string
  onclick: () => void
}

function ArrowButton({
  label,
  onclick,
  direction = 'right',
}: ArrowButtonProps) {
  return (
    <button
      onClick={onclick}
      className='size-10 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20 cursor-pointer'
    >
      <ArrowIcon className={clsx(direction === 'right' && '-scale-x-100')} />
      <span className='sr-only'>{label}</span>
    </button>
  )
}
