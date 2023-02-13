import React, {useState} from 'react'
import axios from 'axios'
const API_URL = "http://localhost:3333/"

function BenevoleCreateForm({benevoles, setBenevoles}) {
  const [inputPrenom, setPrenom] = useState('')
  const [inputNom, setNom] = useState('')
  const [inputEmail, setEmail] = useState('')


  const handleCreate = async (e) => {
    e.preventDefault()
    try {
        await axios.post(API_URL+"benevoles/create", { 
            prenom: inputPrenom,
            nom: inputNom,
            email: inputEmail
        }).then((response) => {
          console.log(response)
          console.log("L'utilisateur a bien été créé")
          console.log(response.data)
          setBenevoles(benevoles => [...benevoles,response.data])
        });
    } catch (error) {
        console.error(error); //TODO: Refaire 
    }
  };

  return (
    <form onSubmit={(e) => handleCreate(e)}>
        <input
            type="text"
            placeholder="Nom"
            value={inputPrenom}
            onChange={(event) => setPrenom(event.target.value)}
        />
        <input
            type="text"
            placeholder="Prénom"
            value={inputNom}
            onChange={(event) => setNom(event.target.value)}
        />
        <input
            type="text"
            placeholder="Email"
            value={inputEmail}
            onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit">Créer</button>
    </form>
  );

}

export default BenevoleCreateForm;