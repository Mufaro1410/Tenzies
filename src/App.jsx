import { useEffect, useRef, useState } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import Die from "./components/Die"

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())
  const buttonRef = useRef(null)

  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.number === dice[0].number)

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => (
      {number: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()}
    ))
  }

  function rollDice() {
    if (!gameWon) {
      setDice(prevDice => prevDice.map(die => 
        die.isHeld ? die : {...die, number: Math.ceil(Math.random() * 6)}
      ))
    } else {
      setDice(generateAllNewDice())
    }
  }
  
  function hold(id) {
    setDice(prevDice => prevDice.map(die =>
      die.id === id ? {...die, isHeld: !die.isHeld} : die
    ))
  }
  
  const diceElements = dice.map((dieObj) => (
    <Die 
      key={dieObj.id}
      id={dieObj.id}
      number={dieObj.number} 
      isHeld={dieObj.isHeld} 
      onHold={() => hold(dieObj.id)}
    />)
  )

  return (
    <main className="main">
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press `New Game` to start again</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>{gameWon ? "New Game": "Roll"}</button>
    </main>
  )
}

export default App
