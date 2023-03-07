import React, {useState} from 'react';
import Background from '../Background';
import BenevoleCreateForm from './BenevoleCreateForm';
import '../../style/CommonToEveryWindow.css'

import BenevoleList2 from './BenevoleList2';

function BenevoleContenu(){
  const [benevoles,setBenevoles] = useState([])

  return (<React.Fragment>
    <div className={['contenu']}>
      <BenevoleCreateForm benevoles = {benevoles} setBenevoles = {setBenevoles}/>
      <BenevoleList2 benevoles = {benevoles} setBenevoles = {setBenevoles}/>
    </div>
  </React.Fragment>)
}
export default BenevoleContenu