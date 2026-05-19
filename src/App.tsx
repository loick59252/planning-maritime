import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// Remplace par TA configuration Firebase (copiée depuis Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAvzBdwVqiicoY-0gx8D5hGZzRjHU52Z4g",
  authDomain: "planning-maritime-loick.firebaseapp.com",
  projectId: "planning-maritime-loick",
  storageBucket: "planning-maritime-loick.firebasestorage.app",
  messagingSenderId: "432495659193",
  appId: "1:432495659193:web:10a4dca69937e58490f368",
  measurementId: "G-CFMB6Z73DG"
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [journee, setJournee] = useState<string>("");
  const [journees, setJournees] = useState<string[]>([]);

  // Charge les journées depuis Firestore
  useEffect(() => {
    const fetchJournees = async () => {
      const querySnapshot = await getDocs(collection(db, "journees"));
      const journeesList: string[] = [];
      querySnapshot.forEach((doc) => {
        journeesList.push(doc.data().text);
      });
      setJournees(journeesList);
    };
    fetchJournees();
  }, []);

  // Ajoute une journée à Firestore
  const ajouterJournee = async () => {
    if (journee.trim() === "") return;
    await addDoc(collection(db, "journees"), { text: journee });
    setJournee("");
    // Rafraîchit la liste
    const querySnapshot = await getDocs(collection(db, "journees"));
    const journeesList: string[] = [];
    querySnapshot.forEach((doc) => {
      journeesList.push(doc.data().text);
    });
    setJournees(journeesList);
  };

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
          placeholder="Ex: 19/05 - Capitaine - 8h-18h"
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
        <h2>Tes journées :</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {journees.map((j, index) => (
            <li key={index} style={{ margin: '5px 0' }}>{j}</li>
          ))}
        </ul>
      </div>
    </div>
    <p>test</p>
  );
}

export default App;