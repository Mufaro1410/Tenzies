import { useState } from "react"
import { nanoid } from "nanoid"
import Die from "./components/Die"

function App() {
  const [dice, setDice] = useState(generateAllNewDice())


  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      number: Math.ceil(Math.random() * 6), 
      isHeld: false, 
      id: nanoid()
    }))
  }

  function rollDice() {
    setDice(generateAllNewDice())
  }
  
  function hold(id) {
    // console.log(id);
    setDice(prevDice => prevDice.map(item => {
      if (item.id === id) {
        item.isHeld = !item.isHeld
      }      
    }))    
  }
  
  const diceElements = dice.map((dieObj) => (
    <Die 
      key={dieObj.id}
      id={dieObj.id}
      number={dieObj.number} 
      isHeld={dieObj.isHeld} 
      hold={hold} 
    />)
  )

  return (
    <main className="main">
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App
