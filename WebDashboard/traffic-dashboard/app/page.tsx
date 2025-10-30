'use client'

import dynamic from 'next/dynamic'
import EmergencyAlert from '@/components/dashboard/EmergencyAlert'
import StatsPanel from '@/components/dashboard/StatsPanel'
import LightStatusPanel from '@/components/dashboard/LightStatusPanel'
import DecisionLogic from '@/components/dashboard/DecisionLogic'
import TrafficFlowGraph from '@/components/dashboard/TrafficFlowGraph'

// Load 3D scene only on client (prevents SSR issues with Three.js)
const TrafficScene3D = dynamic(
  () => import('@/components/dashboard/TrafficScene3D'),
  { 
    ssr: false, 
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-gray-400 text-lg">Loading 3D Scene...</div>
      </div>
    )
  }
)

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Emergency Alert Banner - Only shows when emergency active */}
      <EmergencyAlert />
      
      {/* Main Layout: 60% 3D Scene | 40% Panels */}
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left: 3D Visualization */}
        <div className="w-full lg:w-[60%] h-[50vh] lg:h-full border-r border-gray-800">
          <TrafficScene3D />
        </div>
        
        {/* Right: Information Panels */}
        <div className="w-full lg:w-[40%] h-[50vh] lg:h-full overflow-y-auto">
          <div className="p-6 space-y-6">
            <StatsPanel />
            <LightStatusPanel />
            <DecisionLogic />
            <TrafficFlowGraph />
          </div>
        </div>
      </div>
    </div>
  )
}
