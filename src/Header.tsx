import React,{ useEffect } from 'react';
import { makeStyles } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './style/CommonToEveryWindow.css'

const Header = () => {

  // useEffect(() => {
  //   let actualW : String = String(window.location.pathname);
  //   console.log(actualW)
  //   actualW = actualW.substring(1,actualW.length)
  //   console.log(actualW)
  //   let x = document.getElementById(actualW.toString()) 

  //   if(x != null){
  //    x.style.color = "grey";
  //   }
    
  // },[])

  return (
    <div className="root">
      <AppBar position="static" id="header" color='secondary'>
        <Toolbar className={"navbar"}>
          {/* <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className="title">
            <RouterLink to="/">
              <img src={require('./assets/favicon/Festiland.png')} alt="Logo" />
            </RouterLink>
          </Typography>
          {/* <Typography variant="h6">
            <RouterLink to="/">Accueil</RouterLink>
          </Typography> */}
          <Typography variant="h6">
            <RouterLink to="/jeux" id='jeux'>Jeux</RouterLink>
          </Typography>
          <Typography variant="h6">
            <RouterLink to="/benevoles" id='benevoles'>Bénévoles</RouterLink>
          </Typography>
          <Typography variant="h6">
            <RouterLink to="/affectationsZone" id='affectationsZone'>Affectations par Zone</RouterLink>
          </Typography>
          <Typography variant="h6">
            <RouterLink to="/affectationsCreneau" id='affectationsCreneau'>Affectations pour un Créneau</RouterLink>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
