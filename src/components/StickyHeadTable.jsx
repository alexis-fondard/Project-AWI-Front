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
  { id: 'zone', label: 'Zone', minWidth: 170 },
  { id: 'debut', label: 'Début', minWidth: 100 },
  { id: 'fin', label: 'Fin', minWidth: 100 },
];

export default function StickyHeadTable({benevole_affectations, setBenevoleAffectations, id}) {
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
  axios.get(API_URL +"benevoles_zones/"+id+"/affectations")
  .then((response) => {
      // Get benevoles DATA
      setBenevoleAffectations(benevole_affectations => response.data); //set pokemon state
      setLoading(false); //set loading state
      console.log(benevole_affectations)
    });
   });
  }, []);

  if (isLoading) {
    return (
    <h1>We are loading elements ...</h1>
  );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
            {benevole_affectations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((affectation) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={affectation.debut +""+ affectation.fin}>
                    {columns.map((column) => {
                      const value = affectation[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={benevole_affectations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}