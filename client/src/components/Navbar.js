import { AppBar, Box, Button, Container, Toolbar, Typography, Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Asegúrate de importar el contexto de autenticación

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Obtener el usuario y la función de logout del contexto
  const [anchorEl, setAnchorEl] = useState(null); // Estado para manejar el menú

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Abrir el menú
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Cerrar el menú
  };

  const handleLogout = () => {
    logout(); // Llamar a la función de logout
    navigate("/login"); // Redirigir a la página de login
    handleMenuClose(); // Cerrar el menú
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
          <Typography
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() => navigate("/allitems")}
            >
              INVENTARIO APPLE
            </Typography>
            {/* Mostrar botones solo si hay un usuario logueado */}
            {user && (
              <>
                {/* Mostrar todos los botones si es admin */}
                {user.role === "admin" && (
                  <>
                    <Button variant="contained" color="secondary" onClick={() => navigate("/modelo")} sx={{ mr: 2 }}> Modelos </Button>
                  </>
                )}
                <Button variant="contained" color="info" onClick={() => navigate("/iphone")} sx={{ mr: 2 }}> Iphone </Button>
                <Button variant="contained" color="info" onClick={() => navigate("/ipad")} sx={{ mr: 2 }}> Ipad </Button>
                <Button variant="contained" color="info" onClick={() => navigate("/applewatch")} sx={{ mr: 2 }}> Applewatch </Button>
                <Button variant="contained" color="info" onClick={() => navigate("/macbook")} sx={{ mr: 2 }}> MacBook </Button>
              </>
            )}

            {/* Menú de usuario */}
            {user ? (
              <>
                <Avatar 
                  onClick={handleMenuClick} 
                  sx={{ cursor: 'pointer', ml: 2 }} 
                />
                <Menu 
                  anchorEl={anchorEl} 
                  open={Boolean(anchorEl)} 
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                </Menu>
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={() => navigate("/login")}>
                Iniciar Sesión
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
