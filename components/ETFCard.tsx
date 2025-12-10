'use client'

import React from 'react'

export interface ETF {
    fundName: string
    fundSymbol: string
    annualYield: number
    annualDividendPerShare: number
    paymentMonths: number[]
    detailPageUrl: string
}

interface ETFCardProps {
    etf: ETF
    metricType: 'ranking' | 'amount'
}

export default function ETFCard({ etf, metricType }: ETFCardProps) {
    const handleClick = () => {
        window.open(`https://finance.yahoo.com/quote/${etf.fundSymbol}/profile`, '_blank')
    }

    const isRanking = metricType === 'ranking'

    return (
        <div
            onClick={handleClick}
            className='bg-white rounded-[15px] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.04)] p-[20px] relative cursor-pointer hover:shadow-lg transition-shadow'
        >
            {/* Card Content - Figma gap-[16px] between sections */}
            <div className='flex flex-col gap-[16px]'>
                {/* Top Section: Ticker/Name */}
                <div className='flex items-center justify-between'>
                    {/* Ticker and name - Figma gap-[7px] */}
                    <div className='flex flex-col gap-[7px] overflow-hidden'>
                        <p className='text-[14px] font-bold text-[#24252c]'>{etf.fundSymbol}</p>
                        <p className='text-[11px] font-normal text-[#6e6a7c] truncate'>
                            {etf.fundName}
                        </p>
                    </div>
                    {/* Likes section removed */}
                </div>

                {/* Bottom Section: Dividends info and Price */}
                <div className='flex justify-between items-center'>
                    <p className='text-[13px] font-bold text-[#24252c]'>
                        {isRanking ? 'Annual Yield' : 'Dividends per share'}
                    </p>
                    <p className='text-[19px] font-bold text-[#34c759]'>
                        {isRanking
                            ? `${etf.annualYield.toFixed(2)}%`
                            : `$ ${etf.annualDividendPerShare.toFixed(2)}`
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}
