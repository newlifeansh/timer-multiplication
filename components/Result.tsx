interface ResultProps {
  result: number | null
}

export default function Result({ result }: ResultProps) {
  if (result === null) {
    return null
  }

  return (
    <div className='flex flex-col gap-2 w-full mt-4'>
      <h3 className='text-lg font-semibold text-gray-700'>계산 결과</h3>
      <div className='bg-blue-50 p-4 rounded-lg text-center'>
        <p className='text-3xl font-bold text-blue-600'>{result}</p>
      </div>
    </div>
  )
}
