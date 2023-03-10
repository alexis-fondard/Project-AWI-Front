import React, {useState, useEffect} from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios'
import AffectationsBenevole from '../AffectationsBenevole/AffectationsBenevole';
import ResponsiveDialog from './ResponsiveDialog';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
const API_URL = "http://localhost:3333/"

function Benevole2({id,prenom,nom,email,benevoles,setBenevoles}){
  const [isEditing, setEditing] = useState(false)
  const [inputPrenom, setPrenom] = useState(prenom)
  const [inputNom, setNom] = useState(nom)
  const [inputEmail, setEmail] = useState(email)


  useEffect(() => {
    setPrenom(prenom)
    setNom(nom)
    setEmail(email)
  },[])

  function handleClick(e){
    if(isEditing){
      try{
        axios.put(API_URL+'benevoles/'+id,{
          prenom: inputPrenom,
          nom: inputNom,
          email: inputEmail
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
    axios.delete(API_URL+'benevoles/'+id,{
    }).then(response => {
      let filteredArray = benevoles.filter(item => item.id !== id)
      setBenevoles(benevoles => filteredArray)
    }).then(error => {console.log(error)})
    
  }

  return (<React.Fragment>
    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
    {isEditing ? <React.Fragment>
      <TableCell key={"nom"}><input
            type="text"
            placeholder="Prenom"
            value={inputPrenom}
            onChange={(event) => setPrenom(event.target.value)}
        /></TableCell>
      <TableCell key={"prenom"}><input
            type="text"
            placeholder="Nom"
            value={inputNom}
            onChange={(event) => setNom(event.target.value)}
        /></TableCell>
      <TableCell key={"email"}><input
            type="text"
            placeholder="Email"
            value={inputEmail}
            onChange={(event) => setEmail(event.target.value)}
        /></TableCell> 
        
        <TableCell key={"popup"}><CheckCircleOutlineIcon onClick={(e) => handleClick(e)} />
        <CancelIcon/></TableCell>
        
      </React.Fragment>
      
    : <React.Fragment>
      <TableCell key={"nom"}>{inputNom}</TableCell>
      <TableCell key={"prenom"}>{inputPrenom}</TableCell>
      <TableCell key={"email"}>{inputEmail}</TableCell> 
      <TableCell key={"popup"}><ResponsiveDialog id={id} prenom={inputPrenom} nom={inputNom} ><AffectationsBenevole id={id}></AffectationsBenevole></ResponsiveDialog><ModeEditIcon onClick={(e) => handleClick(e)} className={'iconArrow'}/><CancelIcon onClick={(e) => handleCrossClick(e)} className={'iconArrow'}/></TableCell>
      </React.Fragment> 

    }
    </TableRow>
  </React.Fragment>
    
  );
}

export default Benevole2