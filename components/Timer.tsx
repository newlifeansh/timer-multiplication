interface TimerProps {
  time: string
}

export default function Timer({ time }: TimerProps) {
  return (
    <div className='flex items-center justify-center'>
      <div className='text-6xl font-mono font-bold tracking-wider text-gray-900'>
        {time}
      </div>
    </div>
  )
}
