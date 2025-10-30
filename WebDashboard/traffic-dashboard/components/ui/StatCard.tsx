'use client'

import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: number
  unit?: string
  trend?: 'up' | 'down' | 'neutral'
}

export function StatCard({ icon: Icon, label, value, unit = '', trend }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  
  // Animated counter
  useEffect(() => {
    let start = displayValue
    let end = value
    let duration = 500 // ms
    let startTime: number | null = null
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      setDisplayValue(Math.floor(start + (end - start) * progress))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [value])
  
  return (
    <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 space-y-2">
      <div className="flex items-center justify-between">
        <Icon className="w-8 h-8 text-blue-500" />
        {trend && (
          <span className={`text-xs ${
            trend === 'up' ? 'text-green-500' : 
            trend === 'down' ? 'text-red-500' : 
            'text-gray-400'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '−'}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-3xl font-bold text-white">
          {displayValue}{unit}
        </p>
      </div>
    </div>
  )
}

