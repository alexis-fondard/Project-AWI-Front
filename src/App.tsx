import {
  BrowserRouter as Router,
  Routes, //Routes remplace Switch depuis la version 6 de React Router
  Route
} from "react-router-dom";
import './App.css';
import Header from './Header';
import Footer from './Footer';
import HomePage from "./HomePage";
import Login from "./Login";
import BenevoleContenu from './components/Benevoles/BenevoleContenu';
import PrivateRoute from "./auth/PrivateRoute";
import { PrivateRouteProps } from "./auth/PrivateRoute";
import { AuthContext } from "./auth/AuthContext";
import { useContext } from "react";
import AffectationZoneContenu from "./components/AffectationsZones/AffectationZoneContenu";
import AffectationCreneauContenu from "./components/AffectationsCreneau/AffectationsCreneauContenu";

const defaultProtectedRouteProps: Omit<PrivateRouteProps, 'outlet'> = {
  isAuthenticated: useContext(AuthContext).isAuthenticated,
  authenticationPath: "/login",
};

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/benevoles" element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<BenevoleContenu />} /> } />
          <Route path="/jeux" element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<div>Jeux</div>} /> } />
          <Route path="/affectations" element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<div>Affectations</div>} /> } />
          <Route path="/affectationsZone" element={<AffectationZoneContenu/>}/>
          <Route path="/affectationsCreneau" element={<AffectationCreneauContenu/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
  
  );
}

export default App;
