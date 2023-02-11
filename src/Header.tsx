import React from 'react';
import './App.css';
import logo from './logo.svg';

const Header: React.FC = () => {
  return (
    <header className="App-header">
      <nav>
        <h1>Gestion des bénévoles pour le festival du jeu de société</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          <li><a href="#">Accueil</a></li>
          <li><a href="#">Bénévoles</a></li>
          <li><a href="#">Jeux</a></li>
          <li><a href="#">Affectations</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
