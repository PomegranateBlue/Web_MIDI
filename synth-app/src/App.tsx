import { useEffect, useRef } from 'react'
import * as Tone from 'tone'
import './App.css'

const keyMap: Record<string, string> = {
  a: 'C4',
  s: 'D4',
  d: 'E4',
  f: 'F4',
  g: 'G4',
  h: 'A4',
  j: 'B4',
  k: 'C5',
}

function App() {
  const synthRef = useRef<Tone.Synth | null>(null)

  useEffect(() => {
    synthRef.current = new Tone.Synth().toDestination()
    const handleKeyDown = (e: KeyboardEvent) => {
      const note = keyMap[e.key]
      if (note && synthRef.current) {
        synthRef.current.triggerAttackRelease(note, '8n')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="App">
      <h1>Simple Synth</h1>
      <p>Press A S D F G H J K keys to play C4-D4-E4-F4-G4-A4-B4-C5</p>
    </div>
  )
}

export default App
