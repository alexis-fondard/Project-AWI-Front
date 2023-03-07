import React, {useState} from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios'
import AffectationsJeu from '../AffectationsJeu/AffectationsJeu';
import ResponsiveDialog from './ResponsiveDialog';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
const API_URL = "http://localhost:3333/"

function Jeu({id,nom,type,jeux,setJeux}){
  const [isEditing, setEditing] = useState(false)
  const [inputNom, setNom] = useState(nom)
  const [inputType, setType] = useState(type)

  function handleClick(e){
    if(isEditing){
      try{
        axios.put(API_URL+'jeu/'+id+'/update',{
          nom: inputNom,
          type: inputType
        }).then(response => {
          //TODO: Trouver comment update l'item modifié
        })
      }catch(error){
        console.log(error)
      }
    }
    setEditing(!isEditing)
  }

  function handleCrossClick(e){
    axios.delete(API_URL+'jeux/'+id+'/delete',{
    }).then(response => {
      let filteredArray = jeux.filter(item => item.id !== id)
      setJeux(jeux => filteredArray)
    }).then(error => {console.log(error)})
    
  }

  return (
  <React.Fragment>
    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
    {isEditing ? <React.Fragment>
      <TableCell key={"nom"}><input
            type="text"
            placeholder="Nom"
            value={inputNom}
            onChange={(event) => setNom(event.target.value)}
        /></TableCell>
      <TableCell key={"type"}><input
            type="text"
            placeholder="Type"
            value={inputType}
            onChange={(event) => setType(event.target.value)}
        /></TableCell> 
        
        <TableCell key={"popup"}><CheckCircleOutlineIcon onClick={(e) => handleClick(e)} className={'iconArrow'}/>
        <CancelIcon/></TableCell>
        
      </React.Fragment>
      
    : <React.Fragment>
      <TableCell key={"nom"}>{nom}</TableCell>
      <TableCell key={"type"}>{type}</TableCell> 
      <TableCell key={"popup"}><ResponsiveDialog id={id} nom={nom} ><AffectationsJeu id={id}></AffectationsJeu></ResponsiveDialog><ModeEditIcon onClick={(e) => handleClick(e)} className={'iconArrow'}/><CancelIcon onClick={(e) => handleCrossClick(e)} className={'iconArrow'}/></TableCell>
      </React.Fragment> 

    }
    </TableRow>
  </React.Fragment>
    
  );
}

export default Jeu