import { useEffect, useState } from "react";
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  TextField, 
  Typography 
} from "@mui/material";

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
    const emailBody = `
      Aquí están los dispositivos solicitados:
      ${items.map((item) => `
        Tipo de Dispositivo: ${item.tipo_dispositivo || "Desconocido"}
        Modelo: ${item.modelo || "Desconocido"}
        Vendido: ${item.vendido ? "Sí" : "No"}
        Identificador: ${item.identificador || "N/A"}
      `).join("\n")}
    `;

    const mailtoLink = `mailto:${email}?subject=Datos%20de%20Dispositivos&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;

    setSuccessMessage("Los datos se han enviado al correo.");
    setError(null);
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: "800px", mx: "auto", bgcolor: "#f4f6f8", borderRadius: 2 }}>
      {/* Title and Reload Button */}
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          📱 Todos los Dispositivos
        </Typography>
        <Button 
          variant="contained" 
          onClick={fetchAllItems} 
          sx={{ bgcolor: "#1976d2", "&:hover": { bgcolor: "#115293" } }}
        >
          Recargar 🔄
        </Button>
      </Box>

      {/* Email Input and Send Button */}
      <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
        <TextField
          label="Correo"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ flex: 1, mr: 2 }}
        />
        <Button 
          variant="contained" 
          onClick={sendEmail} 
          sx={{ bgcolor: "#28a745", "&:hover": { bgcolor: "#218838" } }}
        >
          ✉️ Enviar
        </Button>
      </Box>

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mb: 2, fontWeight: "bold" }}>
          ❌ {error}
        </Typography>
      )}

      {/* Success Message */}
      {successMessage && (
        <Typography sx={{ mb: 2, fontWeight: "bold", color: "green" }}>
          ✅ {successMessage}
        </Typography>
      )}

      {/* Device Cards */}
      {items.length === 0 && !error ? (
        <Typography sx={{ fontStyle: "italic", color: "#757575" }}>
          No hay registros para mostrar.
        </Typography>
      ) : (
        items.map((item, index) => (
          <Card key={index} sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                {item.tipo_dispositivo || "Desconocido"}
              </Typography>
              <Typography>
                📌 Modelo: <strong>{item.modelo || "Desconocido"}</strong>
              </Typography>
              <Typography>
                ✅ Vendido: <strong>{item.vendido ? "Sí" : "No"}</strong>
              </Typography>
              <Typography>
                🔢 Identificador: <strong>{item.identificador || "N/A"}</strong>
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
