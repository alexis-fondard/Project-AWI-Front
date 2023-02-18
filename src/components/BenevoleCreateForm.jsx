import React, {useState} from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
          setPrenom("")
          setNom("")
          setEmail("")
          setBenevoles(benevoles => [...benevoles,response.data])
        });
    } catch (error) {
        console.error(error); //TODO: Refaire 
    }
  };

  return (
    <form onSubmit={(e) => handleCreate(e)}>
        <TextField type="text"
            placeholder="Prenom"
            value={inputPrenom}
            onChange={(event) => setPrenom(event.target.value)}>
        </TextField>
        <TextField type="text"
            placeholder="Nom"
            value={inputNom}
            onChange={(event) => setNom(event.target.value)}>
          </TextField>
        <TextField type="text"
            placeholder="Email"
            value={inputEmail}
            onChange={(event) => setEmail(event.target.value)}>
          </TextField> 
        <Button type="submit" variant="contained" size="large" style={{'verticalAlign':'middle'}}>Créer</Button>
    </form>
  );

}

export default BenevoleCreateForm;