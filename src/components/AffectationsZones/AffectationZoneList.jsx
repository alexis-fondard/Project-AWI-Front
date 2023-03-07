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
import CancelIcon from '@mui/icons-material/Cancel';
const API_URL = "http://localhost:3333/"


const columns = [
  { id: 'nom', label: 'Nom', minWidth: 170 },
  { id: 'prenom', label: 'Prenom', minWidth: 100 },
  { id: 'zone', label: 'Zone', minWidth: 100},
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
  setTimeout(() => { 
  axios.get(API_URL +"benevoles_zones")
  .then((response) => {
      // Get benevoles DATA
      setAffectations(affectations => response.data);
      setLoading(false); //set loading state
      affectations.sort(function(a,b){ 
        
        return new Date(a.debut) < new Date(b.debut) ? 1 : -1})
      affectations.sort(function(a,b){ return a.zone.label > b.zone.label ? 1 : -1})
    });
   });
  }, []);


  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function formatDate(date){
    let formatedDate = date;
        
    //Formatage parce que la valeur enregistré équivaut à H-1
    formatedDate = formatedDate.substring(0,16).replace("T", " ").replaceAll("-","/")
    if(formatedDate.charAt(11) === '2' && formatedDate.charAt(12) === '3'){
      formatedDate = formatedDate.replaceAt(11,'0')
      formatedDate = formatedDate.replaceAt(12,'0')
      if(formatedDate.charAt(9) === '9'){
        formatedDate = formatedDate.replaceAt(8,String(Number(formatedDate.charAt(8))+1))
      }
      formatedDate = formatedDate.replaceAt(9,String(Number(formatedDate.charAt(9))+1))
      
    }else if(formatedDate.charAt(12) === '9' ){ 
      if(formatedDate.charAt(11) === '1'){
        formatedDate = formatedDate.replaceAt(11,'2')
      }else{
        formatedDate = formatedDate.replaceAt(11,'1')
      }
      formatedDate = formatedDate.replaceAt(12,'0')
    }else{
      let temp = Number(formatedDate.charAt(12))
      temp = temp + 1
      formatedDate = formatedDate.replaceAt(12,String(temp))
    }
    return formatedDate
  }

  /*NOT USED ANYMORE */
  // function reverseFormatDate(date){
  //   console.log(date)
  //   let formatedDate = String(date);
  //   //Formatage parce que la valeur enregistré équivaut à H+1
  //   if(formatedDate.charAt(11) === '0' && formatedDate.charAt(12) === '0'){
  //     formatedDate = formatedDate.replaceAt(11,'2')
  //     formatedDate = formatedDate.replaceAt(12,'3')
  //     if(formatedDate.charAt(9) === '0' && formatedDate.charAt(8) !== '0'){
  //       formatedDate = formatedDate.replaceAt(8,String(Number(formatedDate.charAt(8))-1))
  //     }
  //     formatedDate = formatedDate.replaceAt(9,'9')
  //   }else if(formatedDate.charAt(12) === '0' ){ 
  //     if(formatedDate.charAt(11) === '1'){
  //       formatedDate = formatedDate.replaceAt(11,'0')
  //     }else{
  //       formatedDate = formatedDate.replaceAt(11,'1')
  //     }
  //     formatedDate = formatedDate.replaceAt(12,'9')
  //   }else{
  //     let temp = Number(formatedDate.charAt(12))
  //     temp = temp - 1
  //     formatedDate = formatedDate.replaceAt(12,String(temp))
  //   }
  //   console.log(formatedDate)
  //   return formatedDate
  // }


  function handleCrossClick(id,label,debut,fin,e){
    e.preventDefault()
    let deb = new Date(debut)
    let f = new Date(fin)
    deb = Date.parse(deb)
    f = Date.parse(f)
  
    axios.delete(API_URL+'benevoles_zones/',{data:{
      benevole: {
        id: id,
        prenom : 'temp',
        nom: 'temp',
        email: 'temp'
      },
      zone: {
        label: label,
      },
      date_debut: deb,
      date_fin: f,
    }
    }).then(response => {
      let obj = response.data
      let filteredArray = affectations.filter(function(item){
        return !(item.benevole.id === obj.id_benevole && item.debut === obj.debut && item.zone.label === obj.label_zone)
      })
      setAffectations(affectations => filteredArray)
    }).then(error => {console.log(error)})
    
  }

  if (isLoading) {
    return (
    <h1>We are loading elements ...</h1>
  );
  }

  return (
    <Paper sx={{overflow: 'hidden' }}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={affectation.benevole.id +""+affectation.debut +""+ affectation.fin}>
                    <TableCell>{affectation.benevole.nom}</TableCell>
                    <TableCell>{affectation.benevole.prenom}</TableCell>
                    <TableCell>{affectation.zone.label}</TableCell>
                    <TableCell>{formatDate(affectation.debut)}</TableCell>
                    <TableCell>{formatDate(affectation.fin)}</TableCell>
                    <TableCell><CancelIcon onClick={(e) => handleCrossClick(affectation.benevole.id,affectation.zone.label,formatDate(affectation.debut),formatDate(affectation.fin), e)}/></TableCell>
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