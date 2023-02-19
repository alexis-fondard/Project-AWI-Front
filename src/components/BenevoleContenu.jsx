import React, { useState, useEffect } from 'react';
import BenevoleCreateForm from './BenevoleCreateForm';
import BenevoleList from './BenevoleList';
import BenevoleList2 from './BenevoleList2';

function BenevoleContenu(){
  const [benevoles,setBenevoles] = useState([])

  return (<React.Fragment>
    <BenevoleCreateForm benevoles = {benevoles} setBenevoles = {setBenevoles}/>
    {/* <BenevoleList benevoles = {benevoles} setBenevoles = {setBenevoles}/> */}
    <BenevoleList2 benevoles = {benevoles} setBenevoles = {setBenevoles}/>
  </React.Fragment>)
}
export default BenevoleContenu