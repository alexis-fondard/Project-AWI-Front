import React,{useState} from 'react'
import AffectationCreateForm from './AffectationCreateForm';
import AffectationList from './AffectationList';
import StickyHeadTable from './StickyHeadTable';

function AffectationsBenevole({id}){

  const [benevole_affectations, setBenevoleAffectations] = useState([])
  

  return (<React.Fragment>
    <AffectationCreateForm/>
    {/* <AffectationList id={id} benevole_affectations= {benevole_affectations} setBenevoleAffectations= {setBenevoleAffectations}/> */}
    <StickyHeadTable benevole_affectations = {benevole_affectations} setBenevoleAffectations={setBenevoleAffectations} id={id}/>
  </React.Fragment> 
  )
}

export default AffectationsBenevole;