'use client'
import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Bounded } from '@/components/Bounded'
import Scene from './Scene'
import { View } from '@react-three/drei'

/**
 * Props for `SkyDive`.
 */
export type SkyDiveProps = SliceComponentProps<Content.SkyDiveSlice>

/**
 * Component for "SkyDive" Slices.
 */
const SkyDive: FC<SkyDiveProps> = ({ slice }) => {
  return (
    <Bounded
      className='skydive h-screen'
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <h2 className='sr-only'>{slice.primary.sentence}</h2>
      <View className='h-screen w-screen'>
        <Scene flavor={slice.primary.flavor}
        sentence={slice.primary.sentence}
        />
      </View>
    </Bounded>
  )
}

export default SkyDive
