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
  { id: 'label_zone', label: 'Zone', minWidth: 170 },
];

String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

export default function StickyHeadTable({jeu_affectations, setJeuAffectations, id}) {
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
  axios.get(API_URL +"jeux_zones/"+id+"/affectations")
  .then((response) => {
      // Get jeux DATA
      setJeuAffectations(jeu_affectations => response.data);
      setLoading(false);
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
            {jeu_affectations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((affectation) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={affectation.debut +""+ affectation.fin}>

                    {columns.map((column) => {
                      let value = affectation[column.id];
                      
                      if(column.id === "debut" || column.id === "fin"){
                        //Formatage parce que la valeur enregistré équivaut à H-1
                        value = value.substring(0,16).replace("T", " ").replaceAll("-","/")
                        if(value.charAt(11) === '2' && value.charAt(12) === '3'){
                          value = value.replaceAt(11,'0')
                          value = value.replaceAt(12,'0')
                        }else if(value.charAt(12) === '9' ){ 
                          if(value.charAt(11) === '1'){
                            value = value.replaceAt(11,'2')
                          }else{
                            value = value.replaceAt(11,'1')
                          }
                          value = value.replaceAt(12,'0')
                        }else{
                          let temp = Number(value.charAt(12))
                          temp = temp + 1
                          value = value.replaceAt(12,String(temp))
                        }
                      }
                      
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
        count={jeu_affectations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}