import { ButtonState } from '../hooks/useTimer'

interface ButtonProps {
  state: ButtonState
  onClick: () => void
}

const buttonLabels: Record<ButtonState, string> = {
  start: '시작',
  stop: '중단',
  restart: '재시작'
}

export default function Button({ state, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className='w-24 h-24 rounded-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-lg shadow-lg transition-colors duration-200'
    >
      {buttonLabels[state]}
    </button>
  )
}
