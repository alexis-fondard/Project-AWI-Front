import React, {useState} from 'react';
import AffectationZoneInput from './AffectationZoneInput';
import AffectationZoneList from './AffectationZoneList';

function AffectationZoneContenu(){
  const [affectations, setAffectations] = useState([])

  return (<React.Fragment>
    <div className={'contenu'}>
      <AffectationZoneInput affectations={affectations} setAffectations={setAffectations}/>
      <AffectationZoneList affectations={affectations} setAffectations={setAffectations}/>
    </div>
  </React.Fragment>)
}

export default AffectationZoneContenu;