export default function Die({ id, number, isHeld, onHold }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white"
  }

  return (
    <button 
      onClick={onHold} 
      style={styles}
      aria-pressed={isHeld}
      aria-label={`Die with value ${number}, ${isHeld ? "held" : "not held"}`} >{number}
    </button>
  )
}
