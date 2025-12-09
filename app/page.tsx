'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const imgHome1 = 'http://localhost:3845/assets/c2d5d4650384dbfa9dfa5c844349788f526ba544.png'
const imgImage1 = 'http://localhost:3845/assets/3c28cd3df8e9a746ee406f263a9c426867a1292d.png'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/oobe')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className='bg-[#f8f8f8] relative w-full h-screen' data-name='home' data-node-id='3:7'>
      <div className='absolute h-[290px] left-[-6px] top-[389px] w-[387px]' data-name='home 1' data-node-id='3:4122'>
        <img alt='' className='absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full' src={imgHome1} />
      </div>
      <p className='absolute bg-clip-text bg-gradient-to-r font-sans from-[#888888] leading-[normal] left-[66px] not-italic text-[20px] text-nowrap to-[#222222] top-[174px] whitespace-pre' data-node-id='3:4147' style={{ WebkitTextFillColor: 'transparent' }}>
        Monthly dividend stocks
      </p>
      <div className='absolute h-[220px] left-[60px] top-[233px] w-[273px]' data-name='image 1' data-node-id='23:356'>
        <img alt='' className='absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full' src={imgImage1} />
      </div>
    </div>
  )
}
