import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: 2, md: 4 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: { xs: 4, md: 6 },
          borderRadius: 4,
          maxWidth: 1200,
          width: "100%",
          background: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: "linear-gradient(90deg, #000000 0%, #505050 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            letterSpacing: "1px",
            mb: 3,
          }}
        >
          Bienvenido a Inventario Apple 🍏
        </Typography>

        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: "#444",
            textAlign: "center",
            maxWidth: 800,
            mx: "auto",
            mb: 5,
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          Gestiona todos los productos Apple disponibles en nuestro inventario con facilidad.
        </Typography>

        <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
          {[
            { title: "Ver iPhones", path: "/iphone" },
            { title: "Ver iPads", path: "/ipad" },
            { title: "Ver AppleWatch", path: "/applewatch" },
            { title: "Ver MacBooks", path: "/macbook" },
            { title: "Ver Todos los Equipos", path: "/allitems" },
          ].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.path}>
              <Button
                variant="contained"
                onClick={() => navigate(item.path)}
                fullWidth
                sx={{
                  py: 2,
                  px: 4,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  background: "linear-gradient(145deg, #1c1c1c 0%, #3b3b3b 100%)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
                    background: "linear-gradient(145deg, #3b3b3b 0%, #1c1c1c 100%)",
                  },
                  "&:focus": {
                    boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                {item.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
