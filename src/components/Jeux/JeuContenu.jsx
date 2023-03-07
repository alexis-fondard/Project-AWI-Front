import React, {useState} from 'react';
import JeuCreateForm from './JeuCreateForm';
import '../../style/CommonToEveryWindow.css'
import JeuList from './JeuList';

function JeuContenu(){
  const [jeux,setJeux] = useState([])

  return (
  <React.Fragment>
    <div className={['contenu']}>
      <JeuCreateForm jeu = {jeux} setJeu = {setJeux}/>
      <JeuList jeux = {jeux} setJeux = {setJeux}/>
    </div>
  </React.Fragment>)
}
export default JeuContenu