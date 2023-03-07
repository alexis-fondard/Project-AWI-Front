import React,{useState} from 'react'
import AffectationCreateForm from './AffectationCreateForm';
import StickyHeadTable from './StickyHeadTable';

function AffectationsBenevole({id}){

  const [benevole_affectations, setBenevoleAffectations] = useState([])
  

  return (<React.Fragment>
    <div className={'contenu'} style={{'paddingTop':'20px'}}>
      <AffectationCreateForm benevole_affectations = {benevole_affectations} setBenevoleAffectations={setBenevoleAffectations} id={id}/>
      <StickyHeadTable benevole_affectations = {benevole_affectations} setBenevoleAffectations={setBenevoleAffectations} id={id}/>
    </div>
  </React.Fragment> 
  )
}

export default AffectationsBenevole;