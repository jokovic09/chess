import React, { useEffect, useState } from 'react'
import "./counter.css"

export const Counter = (props) => {
  const {
    turn,
    reset,
    opponentTeam,
    playing,
    setMessage,
    setPlaying,
    image
  } = props


  const [time, setTime] = useState(120)
  const [minutes, setMinutes] = useState(2)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setTime(120)
    setMinutes(2)
    setSeconds(0)
  }, [reset])

  useEffect(() => {
    if (turn && playing) {
      if (time > -1) {
        const interval = setInterval(() => {
          setTime(time - 1);
          setMinutes(Math.floor(time / 60))
          setSeconds(time % 60)
        }, 1000);

        return () => clearInterval(interval);
      } else {
        setPlaying(false)
        setMessage(`${opponentTeam} Wins!!`)

      }
    }

  }, [turn, seconds, minutes, time])

  let zero;
  if (seconds < 10) {
    zero = '0'
  } else {
    zero = null
  }

  return (
    <div className='timer'>
      <div className='image' style={{ "backgroundImage": `url(${image})` }}></div>
      <div className='counter'>{minutes}:{zero}{seconds}</div>
    </div>
  )
}
