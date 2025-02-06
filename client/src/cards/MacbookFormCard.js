// src/cards/MacBookFormCard.js
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
  
  export default function MacbookFormCard({ macbook, modelos, handleChange, handleSubmit, editing }) {
    return (
      <Card sx={{ mt: 5 }} style={{ padding: "1rem" }}>
        <Typography variant="h5" textAlign="center">
          {editing ? "Editar MacBook" : "Añadir un MacBook"}
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="filled"
              label="Número de serie"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="serial_num"
              value={macbook.serial_num}
              onChange={handleChange}
            />
            <FormControl fullWidth variant="filled" sx={{ margin: ".5rem 0" }}>
              <InputLabel>ID Modelo</InputLabel>
              <Select name="id_modelo" value={macbook.id_modelo} onChange={handleChange}>
                {modelos.filter((modelo) => modelo.nombre_modelo.startsWith("MACBOOK"))
                .map((modelo) => (
                  <MenuItem key={modelo.id_modelo} value={modelo.id_modelo}>
                    {modelo.nombre_modelo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              variant="filled"
              label="Número de modelo"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="num_modelo"
              value={macbook.num_modelo}
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              label="Capacidad (GB)"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="capacidad"
              type="number"
              value={macbook.capacidad}
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              label="Color"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="color"
              value={macbook.color}
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              label="Tipo (Ej: M1, M2)"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="tipo"
              value={macbook.tipo}
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              label="Características"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="caracteristicas"
              value={macbook.caracteristicas}
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              label="Fecha de llegada"
              type="date"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="fecha_llegada"
              value={macbook.fecha_llegada}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            {editing && (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={macbook.vendido}
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
                  value={macbook.fecha_salida || ""}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
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
  