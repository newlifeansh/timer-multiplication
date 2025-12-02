'use client'

import { useState, useEffect } from 'react'
import { useTimer, Stage } from '../hooks/useTimer'
import Timer from '../components/Timer'
import Button from '../components/Button'
import Records from '../components/Records'
import Result from '../components/Result'
import Header from '../components/Header'
import ResultScreen from '../components/ResultScreen'

export default function Home() {
  const [currentStage, setCurrentStage] = useState<Stage>('normal')
  const [showResultScreen, setShowResultScreen] = useState(false)

  const {
    time,
    records,
    buttonState,
    start,
    stop,
    restart,
    calculateResult,
    isSuccess
  } = useTimer(currentStage)

  const result = calculateResult()
  const success = isSuccess()

  useEffect(() => {
    if (result !== null && success !== null) {
      setShowResultScreen(true)
    }
  }, [result, success])

  const handleButtonClick = () => {
    if (buttonState === 'start') {
      start()
    } else if (buttonState === 'stop') {
      stop()
    } else if (buttonState === 'restart') {
      restart()
    }
  }

  const handleRetry = () => {
    setShowResultScreen(false)
    restart()
  }

  const handleHiddenStage = () => {
    setCurrentStage('hidden')
    setShowResultScreen(false)
    restart()
  }

  const handleHome = () => {
    setCurrentStage('normal')
    setShowResultScreen(false)
    restart()
  }

  if (showResultScreen && result !== null && success !== null) {
    return (
      <ResultScreen
        success={success}
        result={result}
        stage={currentStage}
        onRetry={handleRetry}
        onHiddenStage={handleHiddenStage}
        onHome={handleHome}
      />
    )
  }

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 p-4'>
      {/* 최상단 헤더 */}
      <Header stage={currentStage} />

      {/* 메인 컨텐츠 */}
      <div className='flex-1 flex items-center justify-center'>
        <div className='w-full max-w-md flex flex-col items-center gap-12'>
          {/* 타이머 영역 */}
          <div className='w-full flex justify-center'>
            <Timer time={time} />
          </div>

          {/* 버튼 영역 */}
          <div className='flex justify-center'>
            <Button state={buttonState} onClick={handleButtonClick} />
          </div>

          {/* 정보 및 결과 영역 */}
          <div className='w-full flex flex-col gap-6'>
            <Records records={records} />
            <Result result={result} />
          </div>
        </div>
      </div>
    </div>
  )
}
