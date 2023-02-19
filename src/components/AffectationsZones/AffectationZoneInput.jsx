import React, {useState, useEffect} from 'react'
import axios from 'axios'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const API_URL = "http://localhost:3333/"

function AffectationZoneInput({affectations, setAffectations}){
  const [selectedZone, setSelectedZone] = useState('Aucun')
  const [zones, setZones] = useState([])
  const [isLoading, setLoading] = useState(true); // Loading state

  const handleChangeZone = (event) => {
    setSelectedZone(event.target.value);
  };


  useEffect(() => { // useEffect hook
    setTimeout(() => { // simulate a delay
    axios.get(API_URL +"zones")
    .then((response) => {
        // Get benevoles DATA
        setZones(zones => response.data);
        setLoading(false); //set loading state
      });
     });
    }, []);

    useEffect(() => {
      if(selectedZone !== 'Aucun'){
        axios.get(API_URL + "benevoles_zones/" + selectedZone).then((response) => {setAffectations(affectations => response.data)}).then((error) => {console.log(error)})
      }else{
        axios.get(API_URL + "benevoles_zones/").then((response) => {setAffectations(affectations => response.data)}).then((error) => {console.log(error)})
      }
    }, [selectedZone])

  if(isLoading){
    return <div> We are loading elements please wait</div>
  }

  return (<React.Fragment>
    <FormControl style={{'magin':'auto', 'margin-top':8}}>
      <InputLabel id="input-zone">Zones</InputLabel>
        <Select
          labelId="input-zone"
          id="select-zone"
          value={selectedZone}
          label="Zones"
          onChange={handleChangeZone}
        >
          <MenuItem value={'Aucun'}>Aucune zone spécifique</MenuItem>
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
  </React.Fragment>)

}

export default AffectationZoneInput;