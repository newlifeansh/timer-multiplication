interface TimerProps {
  time: string
}

export default function Timer({ time }: TimerProps) {
  return (
    <div className='flex items-center justify-center w-full'>
      <div className='text-4xl sm:text-5xl md:text-6xl font-mono font-bold tracking-tight text-gray-900'>
        {time}
      </div>
    </div>
  )
}
