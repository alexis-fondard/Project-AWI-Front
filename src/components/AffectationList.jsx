import React, {useState, useEffect} from 'react'
import Affectation from './Affectation';
import axios from 'axios';
const API_URL = "http://localhost:3333/";

function AffectationList({id,benevole,benevole_affectations, setBenevoleAffectations}){

  const [isLoading, setLoading] = useState(true); // Loading state
  
  useEffect(() => { // useEffect hook
  setTimeout(() => { // simulate a delay
  axios.get(API_URL +"benevoles_zones/"+id+"/affectations")
  .then((response) => {
      // Get benevoles DATA
      setBenevoleAffectations(benevole_affectations => response.data); //set pokemon state
      setLoading(false); //set loading state
      console.log(benevole_affectations)
    });
   });
  }, []);

  if (isLoading) {
    return (
    <h1>We are loading elements ...</h1>
  );
  }

  //return un tableau d'affecation avec header puis on map une liste d'affectation 
  //qui prendrons en props une zone, un benevole, un créneau
  return (<React.Fragment>
    <table>
      <thead>
        <tr>
          <th>Bénevole : Prenom Nom</th>
        </tr>
        <tr>
          <th>Zone</th>
          <th>Date début</th>
          <th>Date fin</th>
        </tr>
      </thead>
      <tbody>
        <Affectation/>
      </tbody>
      <tfoot>
      </tfoot>
    </table>
  </React.Fragment>)
}

export default AffectationList;