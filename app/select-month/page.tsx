'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const months = [
  { id: 1, name: 'Jan' },
  { id: 2, name: 'Feb' },
  { id: 3, name: 'Mar' },
  { id: 4, name: 'Apr' },
  { id: 5, name: 'May' },
  { id: 6, name: 'Jun' },
  { id: 7, name: 'July' },
  { id: 8, name: 'Aug' },
  { id: 9, name: 'Sep' },
  { id: 10, name: 'Oct' },
  { id: 11, name: 'Nov' },
  { id: 12, name: 'Dec' }
]

export default function SelectMonth() {
  const router = useRouter()
  const [selectedMonths, setSelectedMonths] = useState<number[]>([])

  const toggleMonth = (monthId: number) => {
    setSelectedMonths((prev) =>
      prev.includes(monthId) ? prev.filter((id) => id !== monthId) : [...prev, monthId]
    )
  }

  const handleConfirm = () => {
    if (selectedMonths.length > 0) {
      const monthsParam = selectedMonths.sort((a, b) => a - b).join(',')
      router.push(`/monthly-list?months=${monthsParam}`)
    }
  }

  return (
    <div className='bg-white relative w-full min-h-screen flex flex-col items-center' data-name='OOBE-case_each_details'>
      {/* Status Bar - 전체 너비 반응형 */}
      <div className='w-full bg-white'>
        <div className='flex items-center justify-between px-[34px] py-[16px]'>
          <div className='text-sm font-semibold'>9:41</div>
          <div className='flex gap-[5px] items-center'>
            <svg width='17' height='10' viewBox='0 0 17 10' fill='none'>
              <rect x='0.5' y='0.5' width='16' height='9' rx='1.5' fill='black' />
              <path opacity='0.4' d='M17 4V6C17.5 5.66667 17.8 5 17.8 4.5C17.8 4 17.5 3.33333 17 3V4Z' fill='black' />
            </svg>
            <svg width='15' height='11' viewBox='0 0 15 11' fill='none'>
              <path fillRule='evenodd' clipRule='evenodd' d='M0 5.5C0 2.46243 2.46243 0 5.5 0H9.5C12.5376 0 15 2.46243 15 5.5C15 8.53757 12.5376 11 9.5 11H5.5C2.46243 11 0 8.53757 0 5.5Z' fill='black' />
            </svg>
            <svg width='25' height='11' viewBox='0 0 25 11' fill='none'>
              <rect x='0.5' y='0.5' width='24' height='10' rx='1.5' stroke='black' strokeOpacity='0.35' />
              <rect x='2' y='2' width='21' height='7' rx='0.5' fill='black' />
            </svg>
          </div>
        </div>
      </div>

      {/* Content Container - 최대 375px, 가운데 정렬 */}
      <div className='w-full max-w-[375px] px-[25px] flex flex-col'>
        {/* Title */}
        <p className='font-extrabold leading-normal text-[#35383e] text-[25px] mt-[73px] w-[324px]'>
          Choose the month you want.
        </p>

        {/* Subtitle */}
        <p className='font-bold leading-normal text-[16px] text-[rgba(53,56,62,0.5)] mt-[20px] w-[312px]'>
          You can select multiple months.
        </p>

        {/* Month grid */}
        <div className='flex flex-col gap-[19px] mt-[45px] w-[325px]'>
        {[0, 2, 4, 6, 8, 10].map((startIdx) => (
          <div key={startIdx} className='flex gap-[14px]'>
            {months.slice(startIdx, startIdx + 2).map((month) => {
              const isSelected = selectedMonths.includes(month.id)
              return (
                <button
                  key={month.id}
                  onClick={() => toggleMonth(month.id)}
                  className={`flex gap-[15px] items-center p-[15px] rounded-[22.5px] w-[155.5px] h-[65px] transition-colors ${
                    isSelected
                      ? 'bg-[rgba(255,170,4,0.1)]'
                      : 'bg-[rgba(53,56,62,0.05)] hover:bg-[rgba(53,56,62,0.08)]'
                  }`}
                >
                  <div className='shrink-0 w-[35px] h-[35px] bg-gray-200 rounded-full flex items-center justify-center'>
                    {isSelected && <span className='text-[#805d19] text-xl'>✓</span>}
                  </div>
                  <p
                    className={`flex-1 leading-normal text-[18px] ${
                      isSelected ? 'font-extrabold text-[#805d19]' : 'font-bold text-[#35383e]'
                    }`}
                  >
                    {month.name}
                  </p>
                </button>
              )
            })}
          </div>
        ))}
      </div>

        {/* Confirm button */}
        {selectedMonths.length > 0 && (
          <button
            onClick={handleConfirm}
            className='fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-[#FFAA04] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-[#e69a03] transition-colors z-50'
          >
            {selectedMonths.length}개월 선택 완료
          </button>
        )}
      </div>
    </div>
  )
}
