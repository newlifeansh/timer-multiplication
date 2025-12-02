import { Stage } from '../hooks/useTimer'

interface ResultScreenProps {
  success: boolean
  result: number
  stage: Stage
  onRetry: () => void
  onHiddenStage?: () => void
  onHome?: () => void
}

export default function ResultScreen({
  success,
  result,
  stage,
  onRetry,
  onHiddenStage,
  onHome
}: ResultScreenProps) {
  // 히든 스테이지 실패 시 2개 버튼 표시
  const showTwoButtons = stage === 'hidden' && !success

  const getButtonText = () => {
    if (stage === 'normal' && success) {
      return '히든 스테이지 도전하기'
    }
    if (stage === 'hidden' && success) {
      return '홈으로 이동하기'
    }
    return '다시 시도하기'
  }

  const handleButtonClick = () => {
    if (stage === 'normal' && success && onHiddenStage) {
      onHiddenStage()
    } else if (stage === 'hidden' && success && onHome) {
      onHome()
    } else {
      onRetry()
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100' style={{ paddingLeft: '1cm', paddingRight: '1cm' }}>
      <div className='w-full flex flex-col items-center gap-8'>
        {/* 결과 텍스트 */}
        <div className='text-center'>
          <h1 className={`text-5xl font-bold mb-4 ${success ? 'text-green-600' : 'text-red-600'}`}>
            {success ? '미션 성공' : '미션 실패'}
          </h1>
          <p className='text-2xl text-gray-700'>
            결과: <span className='font-bold'>{result}</span>
          </p>
        </div>

        {/* 액션 버튼 */}
        {showTwoButtons ? (
          <div className='flex gap-4 w-full'>
            {/* 왼쪽: 나가기 버튼 (그레이) */}
            <button
              onClick={onHome}
              className='flex-1 px-6 py-4 bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-white font-bold text-lg rounded-full shadow-lg transition-colors duration-200'
            >
              나가기
            </button>
            {/* 오른쪽: 다시 시도하기 버튼 (파란색) */}
            <button
              onClick={onRetry}
              className='flex-1 px-6 py-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-lg rounded-full shadow-lg transition-colors duration-200'
            >
              다시 시도하기
            </button>
          </div>
        ) : (
          <button
            onClick={handleButtonClick}
            className='px-8 py-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-lg rounded-full shadow-lg transition-colors duration-200'
          >
            {getButtonText()}
          </button>
        )}
      </div>
    </div>
  )
}
