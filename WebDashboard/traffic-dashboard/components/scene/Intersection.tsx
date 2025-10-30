'use client'

import { useRef } from 'react'
import { Group } from 'three'
import TrafficLight from './TrafficLight'
import Vehicle from './Vehicle'
import RoadMarkings from './RoadMarkings'

type IntersectionProps = {
  position: [number, number, number]
  name: string
  vehicleData: Record<string, any>
  lightStatus: Record<string, any>
}

export default function Intersection({ position, name, vehicleData, lightStatus }: IntersectionProps) {
  const groupRef = useRef<Group>(null)
  
  const lanes = [
    { 
      lane: 'north', 
      lightPos: [0, 0, -13] as [number, number, number], 
      vehicleStart: [0, 0.5, -25] as [number, number, number], 
      direction: 'z' as const
    },
    { 
      lane: 'south', 
      lightPos: [0, 0, 13] as [number, number, number], 
      vehicleStart: [0, 0.5, 25] as [number, number, number], 
      direction: '-z' as const
    },
    { 
      lane: 'east', 
      lightPos: [13, 0, 0] as [number, number, number], 
      vehicleStart: [25, 0.5, 0] as [number, number, number], 
      direction: '-x' as const
    },
    { 
      lane: 'west', 
      lightPos: [-13, 0, 0] as [number, number, number], 
      vehicleStart: [-25, 0.5, 0] as [number, number, number], 
      direction: 'x' as const
    },
  ]
  
  return (
    <group ref={groupRef} position={position}>
      {/* Intersection platform */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[24, 0.3, 24]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
      
      {/* North road */}
      <mesh position={[0, 0, -24]} receiveShadow>
        <boxGeometry args={[8, 0.3, 24]} />
        <meshStandardMaterial color="#6a6a6a" />
      </mesh>
      
      {/* South road */}
      <mesh position={[0, 0, 24]} receiveShadow>
        <boxGeometry args={[8, 0.3, 24]} />
        <meshStandardMaterial color="#6a6a6a" />
      </mesh>
      
      {/* East road */}
      <mesh position={[24, 0, 0]} receiveShadow>
        <boxGeometry args={[24, 0.3, 8]} />
        <meshStandardMaterial color="#6a6a6a" />
      </mesh>
      
      {/* West road */}
      <mesh position={[-24, 0, 0]} receiveShadow>
        <boxGeometry args={[24, 0.3, 8]} />
        <meshStandardMaterial color="#6a6a6a" />
      </mesh>
      
      {/* Road markings */}
      <RoadMarkings />
      
      {/* Traffic lights and vehicles for each lane */}
      {lanes.map(({ lane, lightPos, vehicleStart, direction }) => {
        const key = `${name}-${lane}`
        const vehicles = vehicleData[key] || { cars: 0, bikes: 0, buses: 0, trucks: 0 }
        const light = lightStatus[key] || { color: 'red', duration: 30 }
        
        const vehicleList: Array<{type: string, position: [number, number, number]}> = []
        let offset = 0
        
        // Add cars
        for (let i = 0; i < Math.min(vehicles.cars || 0, 10); i++) {
          const pos = calculatePosition(vehicleStart, direction, offset)
          vehicleList.push({ type: 'car', position: pos })
          offset += 3.2
        }
        
        // Add bikes
        for (let i = 0; i < Math.min(vehicles.bikes || 0, 10); i++) {
          const pos = calculatePosition(vehicleStart, direction, offset)
          vehicleList.push({ type: 'bike', position: pos })
          offset += 2.3
        }
        
        // Add buses
        for (let i = 0; i < Math.min(vehicles.buses || 0, 5); i++) {
          const pos = calculatePosition(vehicleStart, direction, offset)
          vehicleList.push({ type: 'bus', position: pos })
          offset += 4.5
        }
        
        // Add trucks
        for (let i = 0; i < Math.min(vehicles.trucks || 0, 5); i++) {
          const pos = calculatePosition(vehicleStart, direction, offset)
          vehicleList.push({ type: 'truck', position: pos })
          offset += 4.0
        }
        
        return (
          <group key={key}>
            <TrafficLight
              position={lightPos}
              currentColor={light.color || 'red'}
            />
            
            {vehicleList.map((vehicle, idx) => (
              <Vehicle
                key={`${key}-${vehicle.type}-${idx}`}
                type={vehicle.type as any}
                position={vehicle.position}
                targetPosition={vehicle.position}
              />
            ))}
          </group>
        )
      })}
    </group>
  )
}

function calculatePosition(
  start: [number, number, number], 
  direction: 'z' | '-z' | 'x' | '-x', 
  offset: number
): [number, number, number] {
  const [x, y, z] = start
  
  switch(direction) {
    case 'z': return [x, y, z + offset]
    case '-z': return [x, y, z - offset]
    case 'x': return [x + offset, y, z]
    case '-x': return [x - offset, y, z]
    default: return [x, y, z]
  }
}
