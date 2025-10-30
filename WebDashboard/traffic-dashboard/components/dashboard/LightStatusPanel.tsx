'use client'

import { Badge } from '@/components/ui/Badge'
import { CountdownTimer } from '@/components/ui/CountdownTimer'
import { useLightStatus } from '@/hooks/useLightStatus'

const lanes = [
  { intersection: 'int1', lane: 'north', label: 'Intersection 1 - North' },
  { intersection: 'int1', lane: 'south', label: 'Intersection 1 - South' },
  { intersection: 'int1', lane: 'east', label: 'Intersection 1 - East' },
  { intersection: 'int1', lane: 'west', label: 'Intersection 1 - West' },
  { intersection: 'int2', lane: 'north', label: 'Intersection 2 - North' },
  { intersection: 'int2', lane: 'south', label: 'Intersection 2 - South' },
  { intersection: 'int2', lane: 'east', label: 'Intersection 2 - East' },
  { intersection: 'int2', lane: 'west', label: 'Intersection 2 - West' },
]

export default function LightStatusPanel() {
  const lightStatus = useLightStatus()
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">Traffic Light Status</h2>
      <div className="space-y-3">
        {lanes.map(({ intersection, lane, label }) => {
          const key = `${intersection}-${lane}`
          const status = lightStatus[key]
          
          const colorVariant = 
            status?.color === 'green' ? 'green' :
            status?.color === 'yellow' ? 'yellow' : 'red'
          
          const emoji = 
            status?.color === 'green' ? '🟢' :
            status?.color === 'yellow' ? '🟡' : '🔴'
          
          return (
            <div key={key} className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{label}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl">{emoji}</span>
                    <Badge variant={colorVariant}>
                      {status?.color?.toUpperCase() || 'RED'}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Time Remaining</p>
                  <CountdownTimer 
                    duration={status?.duration || 30} 
                    color={status?.color || 'red'} 
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

