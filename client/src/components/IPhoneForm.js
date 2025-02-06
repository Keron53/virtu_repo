import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IPhoneFormCard from "../cards/IPhoneFormCard";
import { Grid } from "@mui/material";

export default function IPhoneForm() {
  const [iphone, setIphone] = useState({
    imei: "",
    id_modelo: "",
    capacidad: "",
    color: "",
    bateria: "",
    vendido: false,
    sellado: false,
    fecha_llegada: new Date().toISOString().split("T")[0],
    fecha_salida: null,
  });

  const [modelos, setModelos] = useState([]);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const getToken = () => localStorage.getItem("token");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await fetch(`http://localhost:4000/iphone/put/${params.id_iphone}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(iphone),
      });
    } else {
      await fetch("http://localhost:4000/iphone/post", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(iphone),
      });
    }
    navigate("/iphone");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIphone({
      ...iphone,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const loadIphone = async (id) => {
    const res = await fetch("http://localhost:4000/iphone/get/" + id, {
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      setIphone({
        imei: data.imei,
        id_modelo: data.id_modelo,
        capacidad: data.capacidad,
        color: data.color,
        bateria: data.bateria,
        vendido: data.vendido,
        sellado: data.sellado,
        fecha_llegada: data.fecha_llegada ? new Date(data.fecha_llegada).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        fecha_salida: data.fecha_salida ? new Date(data.fecha_salida).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      });
      setEditing(true);
    } else {
      console.error("Error al cargar iPhone:", res.statusText);
    }
  };
  
  
  useEffect(() => {
    loadModelos();
    if (params.id_iphone) {
      loadIphone(params.id_iphone);
    }
  }, [params.id_iphone]);

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={3}>
        <IPhoneFormCard 
          iphone={iphone} 
          modelos={modelos} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
          editing={editing}
        />
      </Grid>
    </Grid>
  );
}
