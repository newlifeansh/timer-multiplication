import { TimerRecord } from '../hooks/useTimer'

interface RecordsProps {
  records: TimerRecord[]
}

export default function Records({ records }: RecordsProps) {
  return (
    <div className='flex flex-col gap-3 w-full'>
      <h3 className='text-lg font-semibold text-gray-700'>기록</h3>
      <div className='flex flex-col gap-2'>
        {records.length === 0 ? (
          <p className='text-gray-400 text-sm'>기록이 없습니다</p>
        ) : (
          records.map((record, index) => (
            <div
              key={index}
              className='flex items-center justify-between bg-gray-50 p-3 rounded-lg'
            >
              <span className='font-medium text-gray-700'>
                {index + 1}차 기록
              </span>
              <span className='font-mono text-lg font-bold text-gray-900'>
                {record.time}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
