// src/cards/IPhoneListCard.js
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function IPhoneListCard({
  iphone,
  modelos,
  imageSrc,
  onEdit,
  onDelete,
  onToggleVendido,
}) {
  const modeloEncontrado = modelos.find(
    (modelo) => modelo.id_modelo === iphone.id_modelo
  );

  const nombreModelo = modeloEncontrado
    ? modeloEncontrado.nombre_modelo
    : "Desconocido";

  return (
    
    <Card
      sx={{
        mb: 2,
        p: 2,
        borderRadius: "16px",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <img
          src={imageSrc}
          alt={`${nombreModelo} ${iphone.color}`}
          style={{ width: "100px", height: "auto", marginRight: "1rem" }}
        />
        <div style={{ flexGrow: 1 }}>
          <Typography sx={{ color: "blue" }}>IMEI: {iphone.imei}</Typography>
          <Typography>
            <strong>Modelo:</strong> {nombreModelo}
          </Typography>
          <Typography>Capacidad: {iphone.capacidad} GB</Typography>
          <Typography>Color: {iphone.color}</Typography>
          <Typography>Batería: {iphone.bateria} %</Typography>
          <Typography sx={{ color: iphone.vendido ? "red" : "green" }}>
            <strong>Vendido:</strong> {iphone.vendido ? "Sí" : "No"}
          </Typography>
          <Typography>Sellado: {iphone.sellado ? "Sí" : "No"}</Typography>
          <Typography>
            Fecha de llegada:{" "}
            {new Date(iphone.fecha_llegada).toLocaleDateString()}
          </Typography>
          <Typography>
            Fecha de salida:{" "}
            {iphone.fecha_salida
              ? new Date(iphone.fecha_salida).toLocaleDateString()
              : "N/A"}
          </Typography>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onEdit}
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
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onDelete}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "16px",
              fontFamily: "SF Pro Display, Inter, sans-serif",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                background: "rgba(255, 0, 0, 0.6)",
                boxShadow: "0px 6px 15px rgba(255, 0, 0, 0.2)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
          >
            Eliminar
          </Button>
          <Button
            variant="contained"
            color={iphone.vendido ? "default" : "warning"}
            onClick={onToggleVendido}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "16px",
              fontFamily: "SF Pro Display, Inter, sans-serif",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                background: iphone.vendido
                  ? "rgba(150, 150, 150, 0.6)"
                  : "rgba(255, 193, 7, 0.6)",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
          >
            {iphone.vendido ? "Marcar no vendido" : "Marcar vendido"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
