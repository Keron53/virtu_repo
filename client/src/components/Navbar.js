import { AppBar, Box, Button, Container, Toolbar, Typography, Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleMenuClose();
  };

  const NavButton = ({ to, children }) => (
    <Button
      onClick={() => navigate(to)}
      sx={{
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '0.875rem',
        textTransform: 'none',
        px: 2,
        py: 1,
        minWidth: 'auto',
        borderRadius: '8px',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          transform: 'translateY(-1px)',
        },
      }}
    >
      {children}
    </Button>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1 }}>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: '1.25rem',
                letterSpacing: '-0.5px',
                background: 'linear-gradient(90deg, #000000 0%, #333333 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
              onClick={() => navigate("/")}
            >
              INVENTARIO APPLE
            </Typography>
            

            {user && (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {user.role === "admin" && (
                  <NavButton to="/modelo">Modelos</NavButton>
                )}
                <NavButton to="/iphone">iPhone</NavButton>
                <NavButton to="/ipad">iPad</NavButton>
                <NavButton to="/applewatch">Apple Watch</NavButton>
                <NavButton to="/macbook">MacBook</NavButton>
              </Box>
            )}

            {user ? (
              <>
                <IconButton
                  onClick={handleMenuClick}
                  sx={{
                    ml: 2,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      backgroundColor: '#000',
                      fontSize: '0.9rem',
                    }}
                  >
                    {user.email?.[0].toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      mt: 1.5,
                      borderRadius: 2,
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      '& .MuiMenuItem-root': {
                        fontSize: '0.875rem',
                        py: 1,
                        px: 2,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    Cerrar sesión
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{
                  backgroundColor: '#000',
                  color: '#fff',
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                }}
              >
                Iniciar Sesión
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </Box>
  );
}