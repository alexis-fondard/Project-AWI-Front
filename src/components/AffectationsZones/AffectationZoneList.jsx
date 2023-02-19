import React, {useState, useEffect} from 'react'; 
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
const API_URL = "http://localhost:3333/"


const columns = [
  { id: 'nom', label: 'Nom', minWidth: 170 },
  { id: 'prenom', label: 'Prenom', minWidth: 100 },
  { id: 'debut', label: 'Debut', minWidth: 100 },
  { id: 'fin', label: 'Fin', minWidth: 100 },
];

function AffectationZoneList({affectations, setAffectations}){

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [isLoading, setLoading] = useState(true); // Loading state
  
  useEffect(() => { // useEffect hook
  setTimeout(() => { // simulate a delay
  axios.get(API_URL +"benevoles_zones/")
  .then((response) => {
      // Get benevoles DATA
      setAffectations(affectations => response.data);
      setLoading(false); //set loading state
      //console.log(response.data)
    });
   });
  }, []);

  if (isLoading) {
    return (
    <h1>We are loading elements ...</h1>
  );
  }

  return (
    <Paper sx={{ width: '70%', overflow: 'hidden' }} style={{'margin':'auto'}}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {affectations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((affectation) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={affectation.debut +""+ affectation.fin}>
                    <TableCell>{affectation.benevole.nom}</TableCell>
                    <TableCell>{affectation.benevole.prenom}</TableCell>
                    <TableCell>{affectation.debut.substring(0,16).replace("T", " ").replaceAll("-","/")}</TableCell>
                    <TableCell>{affectation.fin.substring(0,16).replace("T", " ").replaceAll("-","/")}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={affectations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>);
}

export default AffectationZoneList;