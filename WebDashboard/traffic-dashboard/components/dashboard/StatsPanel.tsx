'use client'

import { Car, AlertTriangle, Clock, TrendingUp } from 'lucide-react'
import { StatCard } from '@/components/ui/StatCard'
import { useVehicleDetections } from '@/hooks/useVehicleDetections'
import { useEmergencyEvents } from '@/hooks/useEmergencyEvents'
import { useStats } from '@/hooks/useStats'

export default function StatsPanel() {
  const vehicleData = useVehicleDetections()
  const emergencies = useEmergencyEvents()
  const stats = useStats()
  
  // Calculate total vehicles currently in system
  const totalVehicles = Object.values(vehicleData).reduce((sum, lane) => 
    sum + (lane?.cars || 0) + (lane?.bikes || 0) + (lane?.buses || 0) + (lane?.trucks || 0), 
    0
  )
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">📊 System Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={Car}
          label="Vehicles in System"
          value={totalVehicles}
        />
        <StatCard
          icon={AlertTriangle}
          label="Active Emergencies"
          value={emergencies.length}
        />
        <StatCard
          icon={Clock}
          label="Avg Wait Time"
          value={stats?.avg_wait_time || 0}
          unit="s"
        />
        <StatCard
          icon={TrendingUp}
          label="Vehicles Today"
          value={stats?.total_vehicles_today || 0}
        />
      </div>
    </div>
  )
}

