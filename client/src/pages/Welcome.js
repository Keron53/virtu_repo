import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        padding: 2,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography variant="h3" gutterBottom>
          Bienvenido a Inventario Apple
        </Typography>
        <Typography variant="h5" gutterBottom>
          Gestiona todos los productos Apple disponibles en nuestro inventario.
        </Typography>
        
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/iphone')}
            >
              Ver iPhones
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/ipad')}
            >
              Ver iPads
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/applewatch')}
            >
              Ver Apple Watches
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/macbook')}
            >
              Ver MacBooks
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
