import { useEffect, useState } from "react"; 
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppleWatchListCard from "../cards/ApplewatchListCard";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
  return images;
};

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

export default function ApplewatchList() {
  const [appleWatches, setAppleWatches] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [clicked, setClicked] = useState(null);
  const navigate = useNavigate();

  // Función para obtener el token del localStorage
  const getToken = () => localStorage.getItem("token");

  const loadAppleWatches = async (filter) => {
    const response = await fetch(`http://localhost:4000/applewatch/${filter}`, {
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    if (response.ok) {
      const data = await response.json();
      setAppleWatches(data);
    } else {
      console.error("Error al cargar Apple Watches:", response.statusText);
    }
  };

  const loadModelos = async () => {
    const response = await fetch("http://localhost:4000/modelo/get", {
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
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
    await fetch(`http://localhost:4000/applewatch/delete/${id}`, { 
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    setAppleWatches(appleWatches.filter((appleWatch) => appleWatch.id_applewatch !== id));
  };

  const handleToggleVendido = async (id) => {
    const appleWatchToToggle = appleWatches.find((appleWatch) => appleWatch.id_applewatch === id);
    const nuevaFechaSalida = !appleWatchToToggle.vendido ? new Date().toISOString() : null;
    const updatedAppleWatch = { 
      ...appleWatchToToggle, 
      vendido: !appleWatchToToggle.vendido, 
      fecha_salida: nuevaFechaSalida 
    };

    await fetch(`http://localhost:4000/applewatch/put/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      },
      body: JSON.stringify(updatedAppleWatch),
    });

    setAppleWatches(appleWatches.map((appleWatch) =>
      appleWatch.id_applewatch === id ? updatedAppleWatch : appleWatch
    ));
  };

  useEffect(() => {
    loadAppleWatches('notsold');
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
        transition: "all 0.3s ease-in-out"
      }}
    >
      <h1 style={{ fontFamily: "SF Pro Display, Inter, sans-serif", fontSize: "24px" }}>
        Lista de AppleWatch
      </h1>
      <Box display="flex" gap={1}>
        {[
          { label: "Agregar Applewatch", color: "success", action: () => navigate('/applewatch/new') },
          { label: "Vendidos", color: "primary", action: () => loadAppleWatches('sold') },
          { label: "No vendidos", color: "primary", action: () => loadAppleWatches('notsold') },
          { label: "Todos los equipos", color: "secondary", action: () => loadAppleWatches('get') }
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
      {appleWatches.map((appleWatch) => {
        const modeloEncontrado = modelos.find(
          (modelo) => modelo.id_modelo === appleWatch.id_modelo
        );

        const nombreModelo = modeloEncontrado
          ? modeloEncontrado.nombre_modelo
          : "Desconocido";

        const imageName = `${nombreModelo.replace(/\s+/g, '_').toUpperCase()}${appleWatch.color.toLowerCase()}.png`;
        const imageSrc = images[imageName];

        return (
          <AppleWatchListCard 
            key={appleWatch.id_applewatch} 
            appleWatch={appleWatch} 
            modelos={modelos}
            imageSrc={imageSrc}
            onEdit={() => navigate(`/applewatch/${appleWatch.id_applewatch}/edit`)} 
            onDelete={() => handleDelete(appleWatch.id_applewatch)} 
            onToggleVendido={() => handleToggleVendido(appleWatch.id_applewatch)} 
          />
        );
      })}
    </>
  );
}
