import { Link } from "@mui/material";
import React, {useEffect} from 'react'
import HomePageIcon from "./components/HomePage/HomePageIcon";
import './style/CommonToEveryWindow.css'



const HomePage = () => {

    useEffect(() => {
      document.getElementById('header')?.remove()
    },[])

    return (
    <React.Fragment>
      <div className={"background_homepage"}>
        <div id="website_logo">
          <img src={require("./assets/favicon/Festiland_BIG.png")} alt="Logo du site Festiland"/>
        </div>
        <div className="homepage_box">
          <Link underline="none" href="/jeux" color="inherit">
            <HomePageIcon src={require('./assets/Downgrade_VER/JEUX.png')} name="Jeux" alt="Icone de la section Jeux"/>
          </Link>
          <Link underline="none" href="/benevoles" color="inherit">
            <HomePageIcon src={require('./assets/Downgrade_VER/ZONES.png')} name="Zones" alt="Icone de la section Zones"/>
          </Link>
          <Link underline="none" href="/zones" color="inherit">
            <HomePageIcon src={require('./assets/Downgrade_VER/BENEVOLES.png')} name="Benevoles" alt="Icone de la section Benevoles"/>
          </Link>
          <Link underline="none" href="/affectationsZone" color="inherit">
            <HomePageIcon src={require('./assets/Downgrade_VER/AFFECTATIONS_ZONE.png')} name="Affectations par zone" alt="Icone de la section Affectation par zone"/>   
          </Link>
          <Link underline="none" href="/affectationsCreneau" color="inherit">
            <HomePageIcon src={require('./assets/Downgrade_VER/AFFECTATIONS_CRENEAU.png')} name="Affectations par creneau" alt="Icone de la section Affectation par créneau"/>
          </Link>
        </div>
      </div>

    </React.Fragment>
    );
  };
  
  export default HomePage;
  