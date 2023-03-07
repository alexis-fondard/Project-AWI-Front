import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './auth/AuthContext';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import './style/CommonToEveryWindow.css';

const Login: React.FC = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const response = await axios.post('http://localhost:3333/login', {
            nom,
            prenom,
            mail,
            password,
        });
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);
        login(token);
    //   const decoded = jwt_decode(token) as any;
    //   console.log(decoded);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate('/');
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <React.Fragment>
    <div className='contenu'>
        <h1>Veuillez vous connecter :</h1>
        <form onSubmit={handleLogin}>
            <TextField
                type="text"
                placeholder="Nom"
                value={nom}
                variant="outlined"
                onChange={(event) => setNom(event.target.value)}
            />
            <TextField
                type="text"
                placeholder="Prénom"
                value={prenom}
                variant="outlined"
                onChange={(event) => setPrenom(event.target.value)}
            />
            <TextField
                type="text"
                placeholder="Mail"
                value={mail}
                variant="outlined"
                onChange={(event) => setMail(event.target.value)}
            />
            <TextField
                type="password"
                placeholder="Password"
                value={password}
                variant="outlined"
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit" variant="contained" size="large" style={{'verticalAlign':'baseline','marginLeft':'10px','marginRight':'10px', 'marginTop':'0.5%'}} color='secondary'>Login</Button>
        </form>
    </div>
    </React.Fragment>
  );
};

export default Login;
