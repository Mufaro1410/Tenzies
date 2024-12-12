export default function Die({ id, number, isHeld, hold }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white"
  }

  return (
    <button onClick={() => hold(id)} style={styles} >{number}</button>
  )
}
