import { useState } from 'react'

function App() {
  const [journee, setJournee] = useState<string>("")

  const ajouterJournee = () => {
    if (journee.trim() === "") return
    alert(`✅ Journée ajoutée : ${journee}`)
    setJournee("")
  }

  return (
    <div style={{
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#1a1a1a',
      color: 'white',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>🚢 Planning Maritime</h1>
      <p>Gère tes journées de travail, Loick !</p>

      <div style={{ margin: '20px' }}>
        <input
          type="text"
          value={journee}
          onChange={(e) => setJournee(e.target.value)}
          placeholder="Ex: 15/05 - Capitaine - 8h-18h"
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '5px',
            border: 'none'
          }}
        />
        <button
          onClick={ajouterJournee}
          style={{
            marginLeft: '10px',
            padding: '10px 20px',
            backgroundColor: '#0078d4',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Ajouter
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <p>Prochaine étape : Sauvegarder dans Firebase !</p>
      </div>
    </div>
  )
}

export default App