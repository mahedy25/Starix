'use client'
import { Float } from '@react-three/drei'
import { SodaCan, SodaCanProps } from './SodaCan'
import { forwardRef } from 'react'
import { Group } from 'three'

type FloatingCanProps = {
  flavor?: SodaCanProps['flavor']
  floatSpeed?: number
  rotationIntensity?: number
  floatIntensity?: number
  floatingRange?: [number, number]
  children?: React.ReactNode
}

const FloatingCan = forwardRef<Group, FloatingCanProps>(
  (
    {
      flavor = 'blackCherry',
      floatSpeed = 1.5,
      rotationIntensity = 1,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      children,
      ...props
    },
    ref
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed} // Animation speed
          rotationIntensity={rotationIntensity} // XYZ rotation intensity
          floatIntensity={floatIntensity} // Up/down float intensity, works like a multiplier with floatingRange
          floatingRange={floatingRange} // Range of y-axis values the object will float within
        >
          {children}
          <SodaCan flavor={flavor} />
        </Float>
      </group>
    )
  }
)
FloatingCan.displayName = 'FloatingCan'

export default FloatingCan
