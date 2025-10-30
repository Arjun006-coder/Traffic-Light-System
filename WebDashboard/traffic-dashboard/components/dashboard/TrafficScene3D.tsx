'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import Intersection from '@/components/scene/Intersection'
import { useVehicleDetections } from '@/hooks/useVehicleDetections'
import { useLightStatus } from '@/hooks/useLightStatus'
import { useDebounce } from '@/hooks/useDebounce'

export default function TrafficScene3D() {
  const vehicleData = useVehicleDetections()
  const lightStatus = useLightStatus()
  
  const debouncedVehicles = useDebounce(vehicleData, 150)
  const debouncedLights = useDebounce(lightStatus, 150)
  
  return (
    <div className="w-full h-full bg-[#0a0a0a] relative">
      <div className="absolute top-4 left-4 z-10 bg-black/60 text-white px-3 py-2 rounded text-xs">
        🖱️ Drag to rotate • Scroll to zoom • Right-click to pan
      </div>
      
      <Canvas shadows gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 50, 80]} fov={55} />
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={40}
          maxDistance={180}
          maxPolarAngle={Math.PI / 2.1}
          target={[0, 0, 0]}
        />
        
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[60, 60, 60]}
          intensity={0.7}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-100}
          shadow-camera-right={100}
          shadow-camera-top={100}
          shadow-camera-bottom={-100}
        />
        <pointLight position={[-40, 30, -40]} intensity={0.25} color="#3b82f6" />
        <pointLight position={[40, 30, 40]} intensity={0.25} color="#3b82f6" />
        
        <fog attach="fog" args={['#0a0a0a', 100, 200]} />
        
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[300, 300]} />
          <meshStandardMaterial color="#0f0f0f" />
        </mesh>
        
        <Suspense fallback={null}>
          <Intersection
            position={[-45, 0, 0]}
            name="int1"
            vehicleData={debouncedVehicles}
            lightStatus={debouncedLights}
          />
          
          <Intersection
            position={[45, 0, 0]}
            name="int2"
            vehicleData={debouncedVehicles}
            lightStatus={debouncedLights}
          />
          
          <mesh position={[0, 0, 0]} receiveShadow>
            <boxGeometry args={[90, 0.3, 8]} />
            <meshStandardMaterial color="#5a5a5a" />
          </mesh>
          
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh key={`center-${i}`} position={[-42 + i * 4.5, 0.11, 0]}>
              <boxGeometry args={[2, 0.05, 0.15]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
            </mesh>
          ))}
        </Suspense>
      </Canvas>
    </div>
  )
}
