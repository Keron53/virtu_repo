import { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MacBookListCard from "../cards/MacbookListCard";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

export default function MacbookList() {
  const [macbooks, setMacBooks] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [clicked, setClicked] = useState(null);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  const loadMacBooks = async (filter) => {
    const response = await fetch(`http://localhost:4000/macbook/${filter}`, {
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setMacBooks(data);
    } else {
      console.error("Error al cargar MacBooks:", response.statusText);
    }
  };

  const loadModelos = async () => {
    const response = await fetch("http://localhost:4000/modelo/get", {
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setModelos(data);
    } else {
      console.error("Error al cargar modelos:", response.statusText);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/macbook/delete/${id}`, { 
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    });
    setMacBooks(macbooks.filter((macbook) => macbook.id_macbook !== id));
  };

  const handleToggleVendido = async (id) => {
    const macbookToToggle = macbooks.find((macbook) => macbook.id_macbook === id);
    const nuevaFechaSalida = !macbookToToggle.vendido ? new Date().toISOString() : null;
    const updatedMacBook = { 
      ...macbookToToggle, 
      vendido: !macbookToToggle.vendido, 
      fecha_salida: nuevaFechaSalida 
    };

    await fetch(`http://localhost:4000/macbook/put/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify(updatedMacBook),
    });

    setMacBooks(macbooks.map((macbook) => (macbook.id_macbook === id ? updatedMacBook : macbook)));
  };

  useEffect(() => {
    loadMacBooks('notsold');
    loadModelos();
  }, []);

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
          backdropFilter: "blur(10px)",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <h1 style={{ fontFamily: "SF Pro Display, Inter, sans-serif", fontSize: "24px" }}>
          Lista de MacBooks
        </h1>
        <Box display="flex" gap={1}>
          {[
            { label: "Agregar MacBook", color: "success", action: () => navigate('/macbook/new') },
            { label: "Vendidos", color: "primary", action: () => loadMacBooks('sold') },
            { label: "No vendidos", color: "primary", action: () => loadMacBooks('notsold') },
            { label: "Todos los equipos", color: "secondary", action: () => loadMacBooks('get') }
          ].map((btn, index) => (
            <Button
            key={index}
            variant="contained"
            color={btn.color}
            onClick={() => {
              setClicked(index);
              btn.action();
              setTimeout(() => setClicked(null), 200);
            }}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "16px",
              fontFamily: "SF Pro Display, Inter, sans-serif",
              boxShadow: clicked === index ? "none" : "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s ease-in-out",
              transform: clicked === index ? "scale(0.95)" : "scale(1)",
              "&:hover": {
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)"
              }
            }}
          >
              {btn.label}
            </Button>
          ))}
        </Box>
      </Box>
      {macbooks.map((macbook) => {
        const modeloEncontrado = modelos.find(
          (modelo) => modelo.id_modelo === macbook.id_modelo
        );

        const nombreModelo = modeloEncontrado
          ? modeloEncontrado.nombre_modelo
          : "Desconocido";

        const imageName = `${nombreModelo.replace(/\s+/g, '_').toUpperCase()}${macbook.color.toLowerCase()}.png`;
        const imageSrc = images[imageName];

        return (
          <MacBookListCard 
            key={macbook.id_macbook} 
            macbook={macbook} 
            modelos={modelos}
            imageSrc={imageSrc}
            onEdit={() => navigate(`/macbook/${macbook.id_macbook}/edit`)} 
            onDelete={() => handleDelete(macbook.id_macbook)} 
            onToggleVendido={() => handleToggleVendido(macbook.id_macbook)} 
          />
        );
      })}
    </>
  );
}
