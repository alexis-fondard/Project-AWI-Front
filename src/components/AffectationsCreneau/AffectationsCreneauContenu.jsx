import React, {useState} from 'react';
import AffectationsCreneauInput from './AffectationsCreneauInput';
import AffectationsCreneauList from './AffectationsCreneauList';

function AffectationCreneauContenu(){
  const [affectations, setAffectations] = useState([])

  return (<React.Fragment>
    <div className={'contenu'}>
      <AffectationsCreneauInput affectations={affectations} setAffectations={setAffectations}/>
      <AffectationsCreneauList affectations={affectations} setAffectations={setAffectations}/>
    </div>
  </React.Fragment>)
}

export default AffectationCreneauContenu;