'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Stats = {
  total_vehicles_today: number
  avg_wait_time: number
  emergencies_handled: number
  accidents_detected: number
  fuel_saved_estimate: number
}

export function useStats() {
  const [data, setData] = useState<Stats | null>(null)
  
  useEffect(() => {
    const fetchStats = async () => {
      const { data: stats } = await supabase
        .from('stats')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1)
        .single()
      
      setData(stats)
    }
    
    fetchStats()
    
    // Refresh every 5 seconds
    const interval = setInterval(fetchStats, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  return data
}



