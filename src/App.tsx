import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './App.css';
import BenevoleContenu from './components/BenevoleContenu';

function App() {
  return (
    <div className="App">
      <Header />
      {/* Contenu de votre application */}
      <Footer />
    </div>
  );
}

export default App;
