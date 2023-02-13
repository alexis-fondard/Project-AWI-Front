import React, {useState} from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios'
const API_URL = "http://localhost:3333/"

function Benevole({id,prenom,nom,email,benevoles,setBenevoles}){
  const [isEditing, setEditing] = useState(false)
  const [inputPrenom, setPrenom] = useState(prenom)
  const [inputNom, setNom] = useState(nom)
  const [inputEmail, setEmail] = useState(email)

  function handleClick(e){
    if(isEditing){
      try{
        axios.put(API_URL+'benevoles/'+id+'/update',{
          prenom: inputPrenom,
          nom: inputNom,
          email: inputEmail
        }).then(response => {
          console.log(response.data)
          //TODO: Trouver comment update l'item modifié
        })
      }catch(error){
        console.log(error)
      }
    }
    setEditing(!isEditing)
  }

  function handleCrossClick(e){
    axios.delete(API_URL+'benevoles/'+id+'/delete',{
    }).then(response => {
      console.log(response.data)
      let filteredArray = benevoles.filter(item => item.id !== id)
      console.log(filteredArray)
      setBenevoles(benevoles => filteredArray)
    }).then(error => {console.log(error)})
    
  }

  return (<React.Fragment>
<li key={id}>
    {isEditing ? <div>
        <input
            type="text"
            placeholder="Prenom"
            value={inputPrenom}
            onChange={(event) => setPrenom(event.target.value)}
        />
        <input
            type="text"
            placeholder="Nom"
            value={inputNom}
            onChange={(event) => setNom(event.target.value)}
        />
        <input
            type="text"
            placeholder="Email"
            value={inputEmail}
            onChange={(event) => setEmail(event.target.value)}
        />
        <CheckCircleOutlineIcon onClick={(e) => handleClick(e)}/>
        <CancelIcon/>
      </div>
      
        
    : <div>{inputPrenom} {inputNom}  {inputEmail} <ModeEditIcon onClick={(e) => handleClick(e)}/><CancelIcon onClick={(e) => handleCrossClick(e)}/></div>
    }
    
   </li>
  </React.Fragment>
    
  )
}

export default Benevole