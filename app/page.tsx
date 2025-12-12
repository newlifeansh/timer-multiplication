'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/oobe')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className='bg-[#f8f8f8] relative w-full min-h-screen flex items-center justify-center overflow-hidden'>
      <div className='relative w-full max-w-[375px] h-screen'>
        <p className='absolute bg-clip-text bg-gradient-to-r font-sans from-[#888888] leading-[normal] left-1/2 -translate-x-1/2 not-italic text-[20px] text-nowrap to-[#222222] top-[174px] whitespace-pre' style={{ WebkitTextFillColor: 'transparent' }}>
          Monthly dividend stocks
        </p>
        <div className='absolute left-1/2 -translate-x-1/2 top-[233px] w-[273px] h-[220px]'>
          <svg viewBox='0 0 273 220' className='w-full h-full'>
            <text x='50%' y='50%' textAnchor='middle' dominantBaseline='middle' fill='#FFAA04' fontSize='48' fontWeight='bold'>
              $
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}
