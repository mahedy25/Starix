import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `BigText`.
 */
export type BigTextProps = SliceComponentProps<Content.BigTextSlice>

/**
 * Component for "BigText" Slices.
 */
const BigText: FC<BigTextProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className='min-h-screen w-screen overflow-hidden bg-[#ffff00] text-[#000000]'
    >
      <h2 className='grid w-full gap-[3vw] text-center py-10 font-black uppercase leading-[.7] '>
        <div className='text-[40vw]'>Rich</div>
        <div className='grid gap-[3vw] text-[24vw] md:flex md:text-[11vw]'>
          <span className='inline-block max-md:text-[20vw]'>Flavor</span>
          <span className='inline-block max-md:text-[20vw]'>in</span>
          <span className='inline-block max-md:text-[25vw]'>every</span>
        </div>
        <div className='text-[30vw]'>Drink</div>
      </h2>
    </section>
  )
}

export default BigText
