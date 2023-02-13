import React from 'react';
import { makeStyles } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Header = () => {

  return (
    <div className="root">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="title">
            <RouterLink to="/">
              <img src={require('./BG_Ultime.png')} alt="Logo" />
            </RouterLink>
          </Typography>
          <Typography variant="h6">
            <RouterLink to="/">Accueil</RouterLink>
          </Typography>
          <Typography variant="h6">
            <RouterLink to="/benevoles">Bénévoles</RouterLink>
          </Typography>
          <Typography variant="h6">
            <RouterLink to="/jeux">Jeux</RouterLink>
          </Typography>
          <Typography variant="h6">
            <RouterLink to="/affectations">Affectations</RouterLink>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
