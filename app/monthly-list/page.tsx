'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const allMonths = [
  { id: 1, name: 'Jan', number: '1' },
  { id: 2, name: 'Feb', number: '2' },
  { id: 3, name: 'Mar', number: '3' },
  { id: 4, name: 'Apr', number: '4' },
  { id: 5, name: 'May', number: '5' },
  { id: 6, name: 'Jun', number: '6' },
  { id: 7, name: 'July', number: '7' },
  { id: 8, name: 'Aug', number: '8' },
  { id: 9, name: 'Sep', number: '9' },
  { id: 10, name: 'Oct', number: '10' },
  { id: 11, name: 'Nov', number: '11' },
  { id: 12, name: 'Dec', number: '12' }
]

const filters = [
  { id: 'ranking', name: 'Dividend Ranking', active: true },
  { id: 'amount', name: 'Dividend Amount', active: false },
  { id: 'fund', name: 'Operating Fund Size', active: false }
]

const etfData = [
  {
    id: 1,
    ticker: 'JEPI',
    name: 'JPMorgan Equity Premium Income ETF',
    price: '0.37',
    favorites: '1.2k'
  },
  {
    id: 2,
    ticker: 'SCHD',
    name: 'Schwab U.S. Dividend Equity ETF',
    price: '0.45',
    favorites: '2.1k'
  },
  {
    id: 3,
    ticker: 'VYM',
    name: 'Vanguard High Dividend Yield ETF',
    price: '0.52',
    favorites: '1.8k'
  }
]

function MonthlyListContent() {
  const searchParams = useSearchParams()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const monthsParam = searchParams.get('months')

  // 표시할 월 결정
  const displayMonths =
    monthsParam === 'all'
      ? allMonths
      : monthsParam
      ? allMonths.filter((m) => monthsParam.split(',').includes(m.id.toString()))
      : allMonths

  const [selectedMonth, setSelectedMonth] = useState(displayMonths[0]?.id || 1)
  const [activeFilter, setActiveFilter] = useState('ranking')

  // 선택된 월을 가운데로 스크롤
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const selectedIndex = displayMonths.findIndex((m) => m.id === selectedMonth)

      if (selectedIndex !== -1) {
        const itemWidth = 64 + 12 // 월 버튼 너비 + gap
        const containerWidth = container.clientWidth
        const scrollPosition = selectedIndex * itemWidth - containerWidth / 2 + 64 / 2

        container.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: 'smooth'
        })
      }
    }
  }, [selectedMonth, displayMonths])

  return (
    <div className='bg-white relative w-full min-h-screen overflow-x-hidden' data-name='montly_list_selected'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute w-[60px] h-[60px] bg-purple-200 rounded-full right-[42px] top-[232px] opacity-30' />
        <div className='absolute w-[96px] h-[96px] bg-blue-200 rounded-full left-[-29px] top-[540px] opacity-30' />
        <div className='absolute w-[74px] h-[74px] bg-pink-200 rounded-full left-[72px] top-[210px] opacity-30' />
        <div className='absolute w-[58px] h-[58px] bg-yellow-200 rounded-full right-[135px] bottom-[45px] opacity-30' />
        <div className='absolute w-[70px] h-[70px] bg-green-200 rounded-full left-[-16px] top-[-14px] opacity-30' />
        <div className='absolute w-[118px] h-[118px] bg-indigo-200 rounded-full right-[71px] top-[331px] opacity-30' />
      </div>

      {/* Content */}
      <div className='relative z-10 px-0 pb-8'>
        {/* Header - Status Bar */}
        <div className='bg-transparent flex flex-col items-center w-full'>
          <div className='flex items-center justify-between px-[34px] py-[16px] w-full max-w-[375px]'>
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

        {/* Month selector - 캐러셀 방식 */}
        <div className='w-full max-w-[375px] mx-auto mt-8 mb-6'>
          <div
            ref={scrollContainerRef}
            className='flex gap-3 px-3 overflow-x-scroll scrollbar-hide snap-x snap-mandatory scroll-smooth'
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              cursor: 'grab'
            }}
            onMouseDown={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.style.cursor = 'grabbing'
              }
            }}
            onMouseUp={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.style.cursor = 'grab'
              }
            }}
            onMouseLeave={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.style.cursor = 'grab'
              }
            }}
          >
            {displayMonths.map((month) => {
              const isSelected = month.id === selectedMonth
              return (
                <div
                  key={month.id}
                  onClick={() => setSelectedMonth(month.id)}
                  className={`shrink-0 w-[64px] h-[70px] rounded-[15px] flex flex-col items-center justify-center transition-colors snap-center cursor-pointer select-none ${
                    isSelected
                      ? 'bg-[rgba(255,170,4,0.8)]'
                      : 'bg-white shadow-[0px_4px_32px_0px_rgba(0,0,0,0.04)]'
                  }`}
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <p
                    className={`text-[11px] font-normal mb-1 pointer-events-none ${
                      isSelected ? 'text-[#805d19]' : 'text-[#24252c]'
                    }`}
                  >
                    {month.name}
                  </p>
                  <p
                    className={`text-[19px] font-semibold pointer-events-none ${
                      isSelected ? 'text-[#805d19]' : 'text-[#24252c]'
                    }`}
                  >
                    {month.number}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Results count */}
        <p className='px-[25px] text-[14px] font-bold text-[#838383] mb-4'>Total 123 results</p>

        {/* Filter chips */}
        <div className='flex gap-2 px-[19px] mb-8 overflow-x-auto scrollbar-hide'>
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`shrink-0 px-[12px] py-[10px] h-[36px] rounded-[18px] border border-solid text-[13px] font-bold transition-colors ${
                filter.id === activeFilter
                  ? 'bg-white border-[#e6e6e6] text-[#af52de]'
                  : 'bg-white border-[#e6e6e6] text-[#aaaaaa]'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* ETF cards */}
        <div className='px-[19px] space-y-4'>
          {etfData.map((etf) => (
            <div
              key={etf.id}
              className='bg-white rounded-[15px] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.04)] p-[20px] relative'
            >
              {/* Card Content - Figma gap-[16px] between sections */}
              <div className='flex flex-col gap-[16px]'>
                {/* Top Section: Ticker/Name and Favorites */}
                <div className='flex items-center justify-between'>
                  {/* Ticker and name - Figma gap-[7px] */}
                  <div className='flex flex-col gap-[7px]'>
                    <p className='text-[14px] font-bold text-[#24252c]'>{etf.ticker}</p>
                    <p className='text-[11px] font-normal text-[#6e6a7c]'>{etf.name}</p>
                  </div>

                  {/* Favorites */}
                  <div className='flex flex-col items-center'>
                    <div className='w-[22px] h-[22px] text-red-500 leading-none'>♥</div>
                    <p className='text-[10px] text-[#575757]'>{etf.favorites}</p>
                  </div>
                </div>

                {/* Bottom Section: Dividends info and Price */}
                <div className='flex justify-between items-center'>
                  <p className='text-[13px] font-bold text-[#24252c]'>Dividends per share</p>
                  <p className='text-[19px] font-bold text-[#34c759]'>$ {etf.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default function MonthlyList() {
  return (
    <Suspense fallback={<div className='bg-white w-full min-h-screen' />}>
      <MonthlyListContent />
    </Suspense>
  )
}
