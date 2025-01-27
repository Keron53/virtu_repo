import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";

export default function AllItems() {
  const [items, setItems] = useState([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const getToken = () => localStorage.getItem("token");

  const fetchAllItems = async () => {
    try {
      const response = await fetch("http://localhost:4000/getall", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        const errorMsg = await response.text();
        setError(errorMsg);
      }
    } catch (err) {
      setError("Error al conectar con el servidor.");
    }
  };

  const sendEmail = () => {
    // Crear el cuerpo del correo
    const emailBody = `
      Aquí están los dispositivos solicitados:

      ${items.map((item) => `
        Tipo de Dispositivo: ${item.tipo_dispositivo || "Desconocido"}
        Modelo: ${item.modelo || "Desconocido"}
        Vendido: ${item.vendido ? "Sí" : "No"}
        Identificador: ${item.identificador || "N/A"}
      `).join("\n")}
    `;

    // Utilizar el protocolo mailto para abrir el cliente de correo del usuario
    const mailtoLink = `mailto:${email}?subject=Datos%20de%20Dispositivos&body=${encodeURIComponent(emailBody)}`;

    // Abrir el cliente de correo predeterminado del usuario
    window.location.href = mailtoLink;

    setSuccessMessage("Los datos se han enviado al correo.");
    setError(null);
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4">Todos los Dispositivos</Typography>
        <Button variant="contained" onClick={fetchAllItems}>
          Recargar
        </Button>
      </Box>

      <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
        <TextField
          label="Correo"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mr: 2, flex: 1 }}
        />
        <Button variant="contained" onClick={sendEmail}>
          Enviar por correo
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {successMessage && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          {successMessage}
        </Typography>
      )}

      {items.length === 0 && !error ? (
        <Typography>No hay registros para mostrar.</Typography>
      ) : (
        items.map((item, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                Tipo de Dispositivo: {item.tipo_dispositivo || "Desconocido"}
              </Typography>
              <Typography>Modelo: {item.modelo || "Desconocido"}</Typography>
              <Typography>Vendido: {item.vendido ? "Sí" : "No"}</Typography>
              <Typography>
                Identificador: {item.identificador || "N/A"}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
