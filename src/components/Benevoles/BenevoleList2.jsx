import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Benevole2 from './Benevole2';

import '../../style/CommonToEveryWindow.css'

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


const API_URL = "http://localhost:3333/"


function BenevoleList2({benevoles, setBenevoles}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortByNom, setSortByNom] = useState(false);
  const [sortByPrenom, setSortByPrenom] = useState(false);
  const [sortByEmail, setSortByEmail] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const sortBenevoles = (str,event) => {
    event.preventDefault();
    console.log(str)
    console.log('heeee')
    switch(str){
      case "nom":
        let mn = (sortByNom ? 1 : -1)

        benevoles.sort(function(a,b){ 
        if (a.nom > b.nom) {
          return 1 * mn;
        }
        if (b.nom > a.nom) {
            return -1 * mn;
        }
      return 0;})        
        setSortByNom(!sortByNom)
        break;
      case "prenom":
        const mp = (sortByPrenom ? 1 : -1)
          benevoles.sort(function(a,b){
            if (a.prenom > b.prenom) {
              return -1 * mp;
            }
            if (b.prenom > a.prenom) {
                return 1 * mp;
            }
          return 0;
          })
        
        setSortByPrenom(!sortByPrenom)
        break;
      case "email":
        const me = (sortByEmail ? 1 : -1)
        
        benevoles.sort(function(a,b){
          if (a.email > b.email) {
            return -1 * me;
          }
          if (b.email > a.email) {
              return 1 * me;
          }
        return 0;
        })
        setSortByEmail(!sortByEmail)
        break;
      default:
        break;

    }
    console.log(benevoles)

  }

  const [isLoading, setLoading] = useState(true); // Loading state
  
  
  useEffect(() => { // useEffect hook
  setTimeout(() => { // simulate a delay
  axios.get(API_URL +"benevoles")
  .then((response) => {
      // Get benevoles DATA
      setBenevoles(benevoles => response.data); //set pokemon state
      benevoles.sort(function(a,b){
        if (a.nom > b.nom) {
          return 1;
        }
        if (b.nom > a.nom) {
            return -1;
        }
        return 0;
      })
      setLoading(false); //set loading state
    });
   });
  }, []);

  if (isLoading) {
    return (
    <h1>We are loading elements ...</h1>
  );
  }
  
  return (
    <Paper sx={{ overflow: 'hidden' }} style={{'margin':'auto'}}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={'tableCell'} key={"nom"}>{"Nom"} {!sortByNom ? <ArrowDownwardIcon onClick={(e) => sortBenevoles("nom",e)} className={'iconArrow'}/>: <ArrowUpwardIcon onClick={(e) => sortBenevoles("nom",e)} className={'iconArrow'}/> } </TableCell>
              <TableCell className={'tableCell'} key={"prenom"}>{"Prenom"} {!sortByPrenom ? <ArrowDownwardIcon onClick={(e) => sortBenevoles("prenom", e)} className={'iconArrow'}/>: <ArrowUpwardIcon onClick={(e) => sortBenevoles("prenom", e)} className={'iconArrow'}/> } </TableCell>
              <TableCell className={'tableCell'} key={"email"}>{"Email"} {!sortByEmail ? <ArrowDownwardIcon onClick={(e) => sortBenevoles("email", e)} className={'iconArrow'}/>: <ArrowUpwardIcon onClick={(e) => sortBenevoles("email", e)} className={'iconArrow'}/> } </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {benevoles
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((benevole) => {
                return (
                  <Benevole2 id={benevole.id} prenom={benevole.prenom} nom={benevole.nom} email={benevole.email} benevoles={benevoles} setBenevoles={setBenevoles}/>

              )})}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={benevoles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default BenevoleList2