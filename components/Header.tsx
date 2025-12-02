interface HeaderProps {
  stage: 'normal' | 'hidden'
}

export default function Header({ stage }: HeaderProps) {
  const text = stage === 'normal'
    ? '7 숫자 보다 크면 성공'
    : '71 숫자 보다 크면 성공'

  return (
    <div className='w-full text-center py-4'>
      <h1 className='text-xl font-bold text-gray-800'>
        {text}
      </h1>
    </div>
  )
}
