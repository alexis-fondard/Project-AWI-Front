import React, {useState, useEffect} from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import '../../style/AffectationJeuCreateForm.css';

const API_URL = "http://localhost:3333/"

function AffectationCreateForm({id,jeu_affectations, setJeuAffectations}){
  const [inputZone, setZone] = useState("")
  const [zones, setZones] = useState([])
  
  const [isLoading, setLoading] = useState(true); // Loading state
  
  useEffect(() => { // useEffect hook
  setTimeout(() => { // simulate a delay
    axios.get(API_URL +"zones")
      .then((response) => {
        // Get jeux DATA
        setZones(zones => response.data);
        setLoading(false);
      });
   });
  }, []);

  const handleChangeZone = (event) => {
    setZone(event.target.value);
  };
  
  const handleCreate = async (e) => {
    e.preventDefault()
    
    try {
        await axios.post(API_URL+"jeux_zones/create", { 
            jeu: {
              id: id
            },
            zone:{
              label:inputZone
            }
        }).then((response) => {
          console.log("L'affectation a bien été créé " + response.data)
          setJeuAffectations(jeu_affectations => [...jeu_affectations,response.data])
        });
    } catch (error) {
        console.error(error);
    }
  };

  return (<React.Fragment>
    <form id="form1" onSubmit={(e) => handleCreate(e)} className={'flexbox-container'}>
      <FormControl fullWidth='fullWidth'>
        <InputLabel id="input-zone">Zones</InputLabel>
        <Select
          labelId="input-zone"
          id="select-zone"
          value={inputZone}
          label="Zones"
          onChange={handleChangeZone}
        >
          {zones.map((zone) => (
            <MenuItem
              key={zone.label}
              value={zone.label}
            >
              {zone.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <button type="submit">Créer</button>
    </form>
  </React.Fragment>)
}



export default AffectationCreateForm;