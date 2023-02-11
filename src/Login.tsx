import React, { useState } from 'react';
import axios from 'axios';
// import jwt from 'jsonwebtoken';
// import jwt_decode from 'jwt-decode';

const Login: React.FC = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/login', { //TODO: Changer cet URL
            nom,
            prenom,
            mail,
            password,
        });
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);
    //   const decoded = jwt_decode(token) as any;
    //   console.log(decoded);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
        <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
        />
        <input
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(event) => setPrenom(event.target.value)}
        />
        <input
            type="text"
            placeholder="Mail"
            value={mail}
            onChange={(event) => setMail(event.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
    </form>
  );
};

export default Login;
