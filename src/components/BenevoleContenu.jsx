import React, { useState, useEffect } from 'react';
import BenevoleCreateForm from './BenevoleCreateForm';
import BenevoleList from './BenevoleList';

function BenevoleContenu(){
  const [benevoles,setBenevoles] = useState([])

  return (<React.Fragment>
    <BenevoleCreateForm benevoles = {benevoles} setBenevoles = {setBenevoles}/>
    <BenevoleList benevoles = {benevoles} setBenevoles = {setBenevoles}/>
  </React.Fragment>)
}
export default BenevoleContenu