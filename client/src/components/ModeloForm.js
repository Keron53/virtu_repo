import {
  Typography,
  Card,
  Grid,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ModeloForm() {
  const [modelo, setModelo] = useState({
    nombre_modelo: ""
  });

  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const getToken = () => localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      await fetch(`http://localhost:4000/modelo/put/${params.id_modelo}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(modelo),
      });
    } else {
      await fetch("http://localhost:4000/modelo/post", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(modelo),
      });
    }
    navigate("/modelo");
  };

  const handleChange = (e) => {
    setModelo({ ...modelo, [e.target.name]: e.target.value });
  };

  const loadModelo = async (id) => {
    const res = await fetch("http://localhost:4000/modelo/get/" + id, {
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      setModelo({ nombre_modelo: data.nombre_modelo });
      setEditing(true);
    } else {
      console.error("Error al cargar modelo:", res.statusText);
    }
  };

  useEffect(() => {
    if (params.id_modelo) {
      loadModelo(params.id_modelo);
    }
  }, [params.id_modelo]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{ padding: "1rem" }}>
          <Typography variant="h5" textAlign="center">
            Añadir un Modelo de equipo Apple
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Añade el nombre del modelo"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="nombre_modelo"
                value={modelo.nombre_modelo}
                onChange={handleChange}
              />  
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!modelo.nombre_modelo}
              >
                Guardar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}