import React,{useState} from 'react'
import AffectationCreateForm from './AffectationCreateForm';
import StickyHeadTable from './StickyHeadTable';

function AffectationsJeu({id}){

  const [jeu_affectations, setJeuAffectations] = useState([])
  

  return (
  <React.Fragment>
    <div className={'contenu'}>
      <AffectationCreateForm jeu_affectations = {jeu_affectations} setJeuAffectations={setJeuAffectations} id={id}/>
      <StickyHeadTable jeu_affectations = {jeu_affectations} setJeuAffectations={setJeuAffectations} id={id}/>
    </div>
  </React.Fragment> 
  )
}

export default AffectationsJeu;