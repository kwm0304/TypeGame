import { useGame } from '@/context/GameContext'

const Timer = () => {
  const { timeLeft } = useGame();
  return (
    <div className='pl-44'>
      <h2 className='text-monkeyAccent text-3xl font-reddit-mono font-semibold'>{timeLeft}</h2>
    </div>
  )
}

export default Timer