import React, {useState} from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';

const API_URL = "http://localhost:3333/"

function JeuCreateForm({jeu, setJeu}) {
  const [inputNom, setNom] = useState('')
  const [inputType, setType] = useState('')
  const [options, setOptions] = useState([])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
        await axios.post(API_URL + "type_jeu/create", {
            nom: inputNom,
            type: inputType
        }).then((response) => {
          console.log(response)
          console.log("Le jeu a bien été créé")
          console.log(response.data)
          setNom("")
          setType("")
          setJeu(jeu => [...jeu,response.data])
        });
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div>
      <h1>Création de jeu </h1>
      <form onSubmit={(e) => handleCreate(e)} style={{'dispay':'flex'}}>
          <TextField type="text"
            placeholder="Nom"
            value={inputNom}
            onChange={(event) => setNom(event.target.value)}>
          </TextField>
          <FormControl>
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              value={inputType}
              label="Type de jeu"
              onChange={(event) => setType(event.target.value)}
            >
              {options.map(option => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" size="large" style={{'verticalAlign':'middle','margin-left':'10px','margin-right':'10px'}} color='secondary'>Créer</Button>
      </form>
    </div>
  );

}

export default JeuCreateForm;