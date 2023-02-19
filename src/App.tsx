import {
  BrowserRouter as Router,
  Routes, //Routes remplace Switch depuis la version 6 de React Router
  Route
} from "react-router-dom";
import './App.css';
import Header from './Header';
import Footer from './Footer';
import HomePage from "./HomePage";
import BenevoleContenu from './components/Benevoles/BenevoleContenu';
import AffectationZoneContenu from "./components/AffectationsZones/AffectationZoneContenu";
import AffectationCreneauContenu from "./components/AffectationsCreneau/AffectationsCreneauContenu";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/benevoles" element={<BenevoleContenu />} />
        <Route path="/jeux" element={<div>Jeux</div>} />
        <Route path="/affectations" element={<div>Affectations</div>} />
        <Route path="/affectationsZone" element={<AffectationZoneContenu/>} />
        <Route path="/affectationsCreneau" element={<AffectationCreneauContenu/>} />
      </Routes>
      </div>
      <Footer />
    </div>
  
  );
}

export default App;
