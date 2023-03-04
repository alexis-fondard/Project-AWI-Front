import { Container, Typography, Box, Button, Link } from "@mui/material";

const HomePage = () => {
    return (
      <Container maxWidth="sm">
        <Box my={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            Festiland
          </Typography>
          <Button variant="contained" color="primary">
            <Link href="/jeux" color="inherit">
              Jeux
            </Link>
          </Button>
          <Button variant="contained" color="primary">
            <Link href="/benevoles" color="inherit">
              Bénévoles
            </Link>
          </Button>
          <Button variant="contained" color="primary">
            <Link href="/zones" color="inherit">
              Zones
            </Link>
          </Button>
          <Button variant="contained" color="primary">
            <Link href="/affectationsZone" color="inherit">
              Affectations à une zone
            </Link>
          </Button>
          <Button variant="contained" color="primary">
            <Link href="/affectationsCreneau" color="inherit">
              Affectations à partir d'un créneau
            </Link>
          </Button>
        </Box>
      </Container>
    );
  };
  
  export default HomePage;
  