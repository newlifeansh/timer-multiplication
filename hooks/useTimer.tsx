'use client'

import { useState, useEffect, useRef } from 'react'

export interface TimerRecord {
  time: string
  milliseconds: number
}

export type ButtonState = 'start' | 'stop' | 'restart'
export type Stage = 'normal' | 'hidden'

export function useTimer(stage: Stage = 'normal') {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [records, setRecords] = useState<TimerRecord[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      }, 10)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const formatTime = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / 3600000)
    const minutes = Math.floor((milliseconds % 3600000) / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    const ms = Math.floor((milliseconds % 1000) / 10)

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(2, '0')}`
  }

  const start = () => {
    setIsRunning(true)
  }

  const stop = () => {
    setIsRunning(false)
    const formattedTime = formatTime(time)
    const newRecord: TimerRecord = {
      time: formattedTime,
      milliseconds: time
    }
    setRecords(prev => [...prev, newRecord])
    setTime(0)
  }

  const restart = () => {
    setIsRunning(false)
    setTime(0)
    setRecords([])
  }

  const getButtonState = (): ButtonState => {
    if (records.length >= 2) {
      return 'restart'
    }
    return isRunning ? 'stop' : 'start'
  }

  const calculateResult = (): number | null => {
    if (records.length !== 2) return null

    const ms1 = Math.floor((records[0].milliseconds % 1000) / 10)
    const ms2 = Math.floor((records[1].milliseconds % 1000) / 10)

    const lowestDigit1 = Math.min(...String(ms1).padStart(2, '0').split('').map(Number))
    const lowestDigit2 = Math.min(...String(ms2).padStart(2, '0').split('').map(Number))

    return lowestDigit1 * lowestDigit2
  }

  const isSuccess = (): boolean | null => {
    const result = calculateResult()
    if (result === null) return null
    const threshold = stage === 'normal' ? 7 : 71
    return result > threshold
  }

  return {
    time: formatTime(time),
    isRunning,
    records,
    buttonState: getButtonState(),
    start,
    stop,
    restart,
    calculateResult,
    isSuccess
  }
}
