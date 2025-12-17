'use client'

import * as THREE from 'three'
import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

const o = new THREE.Object3D()

export function Bubbles({
  count = 300,
  speed = 5,
  bubbleSize = 0.05,
  opacity = 0.5,
  repeat = true,
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const bubbleSpeed = useRef<Float32Array>(new Float32Array(count))
  const minSpeed = speed * 0.001
  const maxSpeed = speed * 0.005

  // ✅ CREATE ONCE
  const geometry = useMemo(
    () => new THREE.SphereGeometry(bubbleSize, 16, 16),
    [bubbleSize]
  )

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        transparent: true,
        opacity,
      }),
    [opacity]
  )

  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return

    for (let i = 0; i < count; i++) {
      o.position.set(
        gsap.utils.random(-4, 4),
        gsap.utils.random(-4, 4),
        gsap.utils.random(-4, 4)
      )

      o.updateMatrix()
      mesh.setMatrixAt(i, o.matrix)
      bubbleSpeed.current[i] = gsap.utils.random(minSpeed, maxSpeed)
    }

    mesh.instanceMatrix.needsUpdate = true

    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [count, minSpeed, maxSpeed, geometry, material])

  useFrame(() => {
    const mesh = meshRef.current
    if (!mesh) return

    // ✅ SAFE MUTATION (material is memoized)
    material.color.set(document.body.style.backgroundColor || '#ffffff')

    for (let i = 0; i < count; i++) {
      mesh.getMatrixAt(i, o.matrix)
      o.position.setFromMatrixPosition(o.matrix)

      o.position.y += bubbleSpeed.current[i]

      if (o.position.y > 4 && repeat) {
        o.position.y = -2
        o.position.x = gsap.utils.random(-4, 4)
        o.position.z = gsap.utils.random(0, 8)
      }

      o.updateMatrix()
      mesh.setMatrixAt(i, o.matrix)
    }

    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      geometry={geometry}
      material={material}
    />
  )
}
