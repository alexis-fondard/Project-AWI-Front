import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Benevole from './Benevole'
const API_URL = "http://localhost:3333/"


function BenevoleList({benevoles, setBenevoles}){

  
  const [isLoading, setLoading] = useState(true); // Loading state
  
  useEffect(() => { // useEffect hook
  setTimeout(() => { // simulate a delay
  axios.get(API_URL +"benevoles")
  .then((response) => {
      // Get benevoles DATA
      setBenevoles(benevoles => response.data); //set pokemon state
      setLoading(false); //set loading state
    });
   });
  }, []);

  if (isLoading) {
    return (
    <h1>We are loading elements ...</h1>
  );
  }
  
  return (
    <div>
      <ul>
        {
           benevoles.map(({id,prenom,nom,email})=>(
            <Benevole id={id} prenom={prenom} nom={nom} email={email} benevoles={benevoles} setBenevoles={setBenevoles}/>
          ))
        }
      </ul>
    </div>
  );
}

export default BenevoleList