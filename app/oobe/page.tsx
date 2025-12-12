'use client'

import { useRouter } from 'next/navigation'

export default function Oobe() {
  const router = useRouter()

  const handleOptionClick = (option: string) => {
    if (option === 'year') {
      router.push('/monthly-list?months=all')
    } else if (option === 'month') {
      router.push('/select-month')
    }
  }

  return (
    <div className='bg-white relative w-full min-h-screen flex flex-col items-center' data-name='OOBE'>
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
      <div className='w-full max-w-[375px] px-[18px] mt-[73px] flex flex-col gap-[50px]'>
        {/* Title and Subtitle - Figma gap-[11px] */}
        <div className='flex flex-col gap-[11px] w-[324px]'>
          <p className='font-extrabold leading-normal text-[#35383e] text-[25px]'>
            How can I help you?
          </p>
          <p className='font-bold leading-normal text-[16px] text-[rgba(53,56,62,0.5)] w-[312px]'>
            Find the ETF returns corresponding to the selected month.
          </p>
        </div>

        {/* Options Container - Figma gap-[45px] between options */}
        <div className='flex flex-col gap-[45px] w-full'>
          {/* Option 1: Returns for entire year */}
          <div
            className='bg-[rgba(53,56,62,0.05)] flex gap-[15px] items-center p-[15px] rounded-[22.5px] cursor-pointer hover:bg-[rgba(53,56,62,0.1)] transition-colors'
            onClick={() => handleOptionClick('year')}
          >
            <div className='shrink-0 w-[35px] h-[35px] bg-gray-200 rounded-full' />
            <p className='flex-1 font-bold leading-normal text-[#35383e] text-[18px]'>
              I would like to know the returns for the entire year.
            </p>
          </div>

          {/* Option 2: Preferred month */}
          <div
            className='bg-[rgba(53,56,62,0.05)] flex gap-[15px] items-center p-[15px] rounded-[22.5px] cursor-pointer hover:bg-[rgba(53,56,62,0.1)] transition-colors'
            onClick={() => handleOptionClick('month')}
          >
            <div className='shrink-0 w-[35px] h-[35px] bg-gray-200 rounded-full' />
            <p className='flex-1 font-bold leading-normal text-[#35383e] text-[18px]'>
              I have a preferred month.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
