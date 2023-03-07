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
import Jeu from './Jeu';

import '../../style/CommonToEveryWindow.css'

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


const API_URL = "http://localhost:3333/"


function JeuList2({jeux, setJeux}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortByNom, setSortByNom] = useState(false);
  const [sortByType, setSortByType] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const sortJeux = (str,event) => {
    event.preventDefault();
    console.log(str)
    switch(str){
      case "nom":
        let mn = (sortByNom ? 1 : -1)

        jeux.sort(function(a,b){ 
        if (a.nom > b.nom) {
          return 1 * mn;
        }
        if (b.nom > a.nom) {
            return -1 * mn;
        }
      return 0;})        
        setSortByNom(!sortByNom)
        break;
      case "type":
        const mt = (sortByType ? 1 : -1)
        
        jeux.sort(function(a,b){
          if (a.type > b.type) {
            return -1 * mt;
          }
          if (b.type > a.type) {
              return 1 * mt;
          }
        return 0;
        })
        setSortByType(!sortByType)
        break;
      default:
        break;

    }
    console.log(jeux)

  }

  const [isLoading, setLoading] = useState(true); // Loading state
  
  
  useEffect(() => { // useEffect hook
  setTimeout(() => { // simulate a delay
  axios.get(API_URL +"jeux")
  .then((response) => {
      // Get jeux DATA
      console.log(response.data)
      setJeux(jeux => response.data); //set pokemon state
      jeux.sort(function(a,b){
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
              <TableCell className={'tableCell'} key={"nom"}>{"Nom"} {!sortByNom ? <ArrowDownwardIcon onClick={(e) => sortJeux("nom",e)} className={'iconArrow'}/>: <ArrowUpwardIcon onClick={(e) => sortJeux("nom",e)} className={'iconArrow'}/> } </TableCell>
              <TableCell className={'tableCell'} key={"type"}>{"Type"} {!sortByType ? <ArrowDownwardIcon onClick={(e) => sortJeux("type", e)} className={'iconArrow'}/>: <ArrowUpwardIcon onClick={(e) => sortJeux("type", e)} className={'iconArrow'}/> } </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jeux
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((jeu) => {
                return (
                  <Jeu id={jeu.id} nom={jeu.nom} type={jeu.type} jeux={jeux} setJeux={setJeux}/>

              )})}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={jeux.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default JeuList2