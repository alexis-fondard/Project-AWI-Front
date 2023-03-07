import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog({children,prenom,nom,id}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} color='secondary'>
        Affectations
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth={'xl'}
        
      >
        <DialogTitle id="responsive-dialog-title">
          {"Affectations du bénévole :" + prenom + " " + nom}
        </DialogTitle>
        <DialogContent>
          {children}
          {/* <DialogContentText>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            A voir ce qu'il faut en faire
          </Button>
          <Button onClick={handleClose} autoFocus>
            Pareil
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}