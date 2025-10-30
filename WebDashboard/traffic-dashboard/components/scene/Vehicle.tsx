'use client'

import { useRef, useEffect, memo } from 'react'
import { Mesh, Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'

type VehicleType = 'car' | 'bike' | 'bus' | 'truck' | 'emergency'

type VehicleProps = {
  type: VehicleType
  position: [number, number, number]
  targetPosition: [number, number, number]
}

const vehicleConfig = {
  car: { 
    size: [2, 1, 1] as [number, number, number], 
    color: '#3b82f6',
    emissive: '#000000',
    emissiveIntensity: 0
  },
  bike: { 
    size: [1.2, 0.8, 0.8] as [number, number, number], 
    color: '#6b7280',
    emissive: '#000000',
    emissiveIntensity: 0
  },
  bus: { 
    size: [3, 1.5, 1.2] as [number, number, number], 
    color: '#eab308',
    emissive: '#000000',
    emissiveIntensity: 0
  },
  truck: { 
    size: [2.5, 1.3, 1.1] as [number, number, number], 
    color: '#8b5cf6',
    emissive: '#000000',
    emissiveIntensity: 0
  },
  emergency: { 
    size: [2.2, 1.2, 1.1] as [number, number, number], 
    color: '#ef4444',
    emissive: '#ff0000',
    emissiveIntensity: 0.8
  },
}

function Vehicle({ type, position, targetPosition }: VehicleProps) {
  const meshRef = useRef<Mesh>(null)
  const targetPos = useRef(new Vector3(...targetPosition))
  
  useEffect(() => {
    targetPos.current.set(...targetPosition)
  }, [targetPosition])
  
  // Smooth movement to target position
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.lerp(targetPos.current, 0.08)
    }
  })
  
  // Pulsing effect for emergency vehicles
  useFrame(({ clock }) => {
    if (type === 'emergency' && meshRef.current) {
      const material = meshRef.current.material as any
      material.emissiveIntensity = 0.5 + Math.sin(clock.elapsedTime * 4) * 0.4
    }
  })
  
  const config = vehicleConfig[type]
  
  return (
    <mesh 
      ref={meshRef} 
      position={position}
      castShadow
      receiveShadow
    >
      <boxGeometry args={config.size} />
      <meshStandardMaterial 
        color={config.color}
        emissive={config.emissive}
        emissiveIntensity={config.emissiveIntensity}
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
  )
}

// Memoize to prevent re-renders when props haven't changed
export default memo(Vehicle, (prevProps, nextProps) => {
  return (
    prevProps.type === nextProps.type &&
    prevProps.position[0] === nextProps.position[0] &&
    prevProps.position[1] === nextProps.position[1] &&
    prevProps.position[2] === nextProps.position[2] &&
    prevProps.targetPosition[0] === nextProps.targetPosition[0] &&
    prevProps.targetPosition[1] === nextProps.targetPosition[1] &&
    prevProps.targetPosition[2] === nextProps.targetPosition[2]
  )
})
