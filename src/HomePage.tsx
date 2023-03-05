import { Link } from "@mui/material";
import LoginImage from "./components/Login/LoginImage";
import './style/CommonToEveryWindow.css'


const HomePage = () => {
    return (
      <div className="homepage_box">
        <Link style={{'transform': 'translateY(100)'}} href="/jeux" color="inherit">
          <LoginImage src={require('./assets/Downgrade_VER/JEUX.png')} name="Jeux" alt="Icone de la section Jeux"/>
        </Link>
        <Link href="/benevoles" color="inherit">
          <LoginImage src={require('./assets/Downgrade_VER/ZONES.png')} name="Zones" alt="Icone de la section Zones"/>
        </Link>
        <Link href="/zones" color="inherit">
          <LoginImage src={require('./assets/Downgrade_VER/BENEVOLES.png')} name="Benevoles" alt="Icone de la section Benevoles"/>
        </Link>
        <Link href="/affectationsZone" color="inherit">
          <LoginImage src={require('./assets/Downgrade_VER/AFFECTATIONS_ZONE.png')} name="Affectations par zone" alt="Icone de la section Affectation par zone"/>   
        </Link>
        <Link href="/affectationsCreneau" color="inherit">
          <LoginImage src={require('./assets/Downgrade_VER/AFFECTATIONS_CRENEAU.png')} name="Affectations par creneau" alt="Icone de la section Affectation par créneau"/>
        </Link>
      </div>
    );
  };
  
  export default HomePage;
  