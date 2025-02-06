// src/cards/IPhoneUsedFormCard.js
import {
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
  } from "@mui/material";
  
  export default function IPhoneUsedFormCard({ iphoneUsed, modelos, handleChange, handleSubmit, editing }) {
    return (
      <Card sx={{ mt: 5 }} style={{ padding: "1rem" }}>
        <Typography variant="h5" textAlign="center">
          Añadir un iPhone Usado
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="filled"
              label="IMEI"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="imei"
              value={iphoneUsed.imei}
              onChange={handleChange}
              inputProps={{ maxLength: 15 }}
            />
            <FormControl fullWidth variant="filled" sx={{ margin: ".5rem 0" }}>
              <InputLabel>ID Modelo</InputLabel>
              <Select
                name="id_modelo"
                value={iphoneUsed.id_modelo}
                onChange={handleChange}
              >
                {modelos.filter((modelo) => modelo.nombre_modelo.startsWith("IPHONE"))
                .map((modelo) => (
                  <MenuItem key={modelo.id_modelo} value={modelo.id_modelo}>
                    {modelo.nombre_modelo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="filled" sx={{ margin: ".5rem 0" }}>
              <InputLabel>Capacidad (GB)</InputLabel>
              <Select
                name="capacidad"
                value={iphoneUsed.capacidad}
                onChange={handleChange}
              >
                <MenuItem value={32}>32</MenuItem>
                <MenuItem value={64}>64</MenuItem>
                <MenuItem value={128}>128</MenuItem>
                <MenuItem value={256}>256</MenuItem>
                <MenuItem value={512}>512</MenuItem>
                <MenuItem value={1024}>1024</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="filled"
              label="Color"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="color"
              value={iphoneUsed.color}
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              label="Batería (%)"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="bateria"
              type="number"
              inputProps={{ max: 100, min: 0 }}
              value={iphoneUsed.bateria}
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              label="Estado físico"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="estado_fisico"
              type="number"
              inputProps={{ max: 10, min: 1 }}
              value={iphoneUsed.estado_fisico}
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              label="Detalles"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="detalles"
              value={iphoneUsed.detalles}
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              label="Fecha de llegada"
              type="date"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="fecha_llegada"
              value={iphoneUsed.fecha_llegada}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {editing && (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={iphoneUsed.vendido}
                      onChange={handleChange}
                      name="vendido"
                      color="primary"
                    />
                  }
                  label="Vendido"
                />
                <TextField
                  variant="filled"
                  label="Fecha de salida"
                  type="date"
                  sx={{ display: "block", margin: ".5rem 0" }}
                  name="fecha_salida"
                  value={iphoneUsed.fecha_salida || ""}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </>
            )}
            <Button variant="contained" color="primary" type="submit">
              Guardar
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
  