import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import iphoneImage from '../images/defaults/iphone.png';
import applewatchImage from '../images/defaults/applewatch.png';
import ipadImage from '../images/defaults/ipad.png';
import macbookImage from '../images/defaults/macbook.png';

export default function ModeloList() {
  const [modelo, setModelo] = useState([]);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  const loadModelo = async () => {
    const response = await fetch("http://localhost:4000/modelo/get", {
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setModelo(data);
    } else {
      console.error("Error al cargar modelos:", response.statusText);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/modelo/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    });

    setModelo(modelo.filter((modelos) => modelos.id_modelo !== id));
  };

  useEffect(() => {
    loadModelo();
  }, []);

  const getIconPath = (nombre_modelo) => {
    if (nombre_modelo.startsWith("IPHONE")) {
      return iphoneImage;
    } else if (nombre_modelo.startsWith("APPLEWATCH")) {
      return applewatchImage;
    } else if (nombre_modelo.startsWith("IPAD")) {
      return ipadImage;
    } else if (nombre_modelo.startsWith("MACBOOK")) {
      return macbookImage;
    }
    return null;
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          mb: 2,
          p: 2,
          borderRadius: "16px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <h1 style={{ fontFamily: "SF Pro Display, Inter, sans-serif" }}>
          Lista de Modelos
        </h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/modelo/new')}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontSize: "16px",
            fontFamily: "SF Pro Display, Inter, sans-serif",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.6)",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
            },
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
        >
          Agregar Modelo
        </Button>
      </Box>
      {modelo.map((modelos) => (
        <Card
          key={modelos.id_modelo}
          sx={{
            mb: 2,
            p: 2,
            borderRadius: "16px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {getIconPath(modelos.nombre_modelo) && (
                <img
                  src={getIconPath(modelos.nombre_modelo)}
                  alt={modelos.nombre_modelo}
                  style={{ width: "24px", height: "24px", marginRight: "8px" }}
                />
              )}
              <Typography sx={{ fontFamily: "SF Pro Display, Inter, sans-serif" }}>
                {modelos.nombre_modelo}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/modelo/${modelos.id_modelo}/edit`)}
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontFamily: "SF Pro Display, Inter, sans-serif",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    background: "rgba(200, 200, 200, 0.6)",
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                }}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(modelos.id_modelo)}
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontFamily: "SF Pro Display, Inter, sans-serif",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    background: "rgba(255, 193, 7, 0.6)",
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                }}
              >
                Eliminar
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
