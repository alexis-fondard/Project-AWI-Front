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
import Button from '@mui/material/Button';

import '../../style/AffectationBenevoleCreateForm.css';

const API_URL = "http://localhost:3333/"


//PREPARATIFS POUR LE MODULE
const hours = []
const mins = []

for(let i=0; i<24; i++){
  if(i<10){
    hours.push("0"+i)
  }else{
    hours.push(""+i)
  }
}
for(let i=0; i<60; i++){
  if(i<10){
    mins.push("0"+i)
  }else{
    mins.push(""+i)
  }
}


const date = new Date()
const year = date.getFullYear()
const month = (date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : date.getMonth())
const day = (date.getDate() < 10 ? "0"+date.getDate() : date.getDate())
const finalDate = year+"-"+month+"-"+day
//FIN DES PREPARATIFS

function AffectationCreateForm({id,benevole_affectations, setBenevoleAffectations}){
  const [inputDebut, setDebut] = React.useState(dayjs(finalDate));
  const [inputHours, setHours] = useState((date.getHours() < 10 ? "0"+date.getHours() : ""+date.getHours()))
  const [inputMinutes, setMinutes] = useState(date.getMinutes() < 10 ? "0"+date.getMinutes() : ""+date.getMinutes())
  const [inputHours2, setHours2] = useState((date.getHours() < 10 ? "0"+date.getHours() : ""+date.getHours()))
  const [inputMinutes2, setMinutes2] = useState(date.getMinutes() < 10 ? "0"+date.getMinutes() : ""+date.getMinutes())

  const [inputZone, setZone] = useState("")
  const [zones, setZones] = useState([])
  
  const [isLoading, setLoading] = useState(true); // Loading state
  
  useEffect(() => { // useEffect hook
  setTimeout(() => { // simulate a delay
  axios.get(API_URL +"zones")
  .then((response) => {
      // Get benevoles DATA
      setZones(zones => response.data); //set pokemon state
      setLoading(false); //set loading state
    });
   });
  }, []);

  function transformDate(day1,month1,year1,hours1,mins1){
    const d = (day1 < 10 ? "0"+day1 : day1)
    const m = (month1 < 10 ? "0"+Number(Number(month1)+1) : Number(month1)+1)
    const y = year1
    const h = (hours1.startsWith("0") ? Number(hours1) : Number(hours1))
    const mi = mins1
  
    //const s = "1970-01-20 00:56" <=> Doit donner ce format
    console.log(y + "-" + m + "-" + d + " " + h + ":" + mi)
    return y + "-" + m + "-" + d + " " + h + ":" + mi
  }

  const handleChangeHours = (event) => {
    setHours(event.target.value);
  };

  const handleChangeMinutes = (event) => {
    setMinutes(event.target.value);
  };

  const handleChangeZone = (event) => {
    setZone(event.target.value);
  };

  const handleChangeHours2 = (event) => {
    setHours2(event.target.value);
  }

  const handleChangeMinutes2 = (event) => {
    setMinutes2(event.target.value);
  }
  

  const handleCreate = async (e) => {
    e.preventDefault()
    
    try {
        await axios.post(API_URL+"benevoles_zones", { 
            benevole: {
              id: id
            },
            zone:{
              label:inputZone
            },
            date_debut: Date.parse(transformDate(inputDebut.$D, inputDebut.$M, inputDebut.$y,inputHours,inputMinutes)),
            date_fin: Date.parse(transformDate(inputDebut.$D, inputDebut.$M, inputDebut.$y,inputHours2,inputMinutes2))
        }).then((response) => {
          console.log("L'affectation a bien été créé " + response.data)
          setBenevoleAffectations(benevole_affectations => [...benevole_affectations,response.data])
        });
    } catch (error) {
        console.error(error); //TODO: Refaire 
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
      
      <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth='fullWidth'>
          <DesktopDatePicker
                label=""
                value={inputDebut}
                minDate={dayjs(finalDate)}
                onChange={(newValue) => {
                  setDebut(newValue);
                  console.log(inputDebut)
                  console.log(newValue)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
        </LocalizationProvider>

      <FormControl fullWidth='fullWidth'>        
        <InputLabel id="input-hours">Heures</InputLabel>
        <Select
          labelId="input-hours"
          id="select-hours"
          value={inputHours}
          label="Heures"
          onChange={handleChangeHours}
        >
          {hours.map((hour) => (
            <MenuItem
              key={hour}
              value={hour}
            >
              {hour}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth='fullWidth'>
        <InputLabel id="input-mins">Minutes</InputLabel>
        <Select
          labelId="input-mins"
          id="select-mins"
          value={inputMinutes}
          label="Minutes"
          onChange={handleChangeMinutes}
        >
          {mins.map((min) => (
            <MenuItem
              key={min}
              value={min}
            >
              {min}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="secondary">Créer</Button>
    </form>
    
    <div style={{'height':10}}></div>

    <form id="form2" className={'flexbox-container'}>
    <FormControl fullWidth='fullWidth'>        
        <InputLabel id="input-hours">Heures</InputLabel>
        <Select
          labelId="input-hours"
          id="select-hours"
          value={inputHours2}
          label="Heures"
          onChange={handleChangeHours2}
        >
          {hours.map((hour) => (
            <MenuItem
              key={hour}
              value={hour}
            >
              {hour}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth='fullWidth'>
        <InputLabel id="input-mins">Minutes</InputLabel>
        <Select
          labelId="input-mins"
          id="select-mins"
          value={inputMinutes2}
          label="Minutes"
          onChange={handleChangeMinutes2}
        >
          {mins.map((min) => (
            <MenuItem
              key={min}
              value={min}
            >
              {min}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>  
  </React.Fragment>)
}



export default AffectationCreateForm;