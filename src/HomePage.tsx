import { Container, Typography, Box, Button, Link } from "@mui/material";

const HomePage = () => {
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Festival du jeu
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
            <Link href="/creneaux" color="inherit">
              Créneaux
            </Link>
          </Button>
        </Box>
      </Container>
    );
  };
  
  export default HomePage;
  