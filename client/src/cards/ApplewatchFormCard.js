// src/cards/AppleWatchFormCard.js
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
  
  export default function ApplewatchFormCard({
    appleWatch,
    modelos,
    handleChange,
    handleSubmit,
    editing,
  }) {
    return (
      <Card sx={{ mt: 5 }} style={{ padding: "1rem" }}>
        <Typography variant="h5" textAlign="center">
          {editing ? "Editar Apple Watch" : "Añadir un Apple Watch"}
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="filled"
              label="Número de Serie"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="serial_num"
              value={appleWatch.serial_num}
              onChange={handleChange}
              inputProps={{ maxLength: 12 }}
            />
            <FormControl fullWidth variant="filled" sx={{ margin: ".5rem 0" }}>
              <InputLabel>ID Modelo</InputLabel>
              <Select
                name="id_modelo"
                value={appleWatch.id_modelo}
                onChange={handleChange}
              >
                {modelos.filter((modelo) => modelo.nombre_modelo.startsWith("APPLEWATCH"))
                .map((modelo) => (
                  <MenuItem key={modelo.id_modelo} value={modelo.id_modelo}>
                    {modelo.nombre_modelo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              variant="filled"
              label="Número de Modelo"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="num_modelo"
              value={appleWatch.num_modelo}
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              label="Color"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="color"
              value={appleWatch.color}
              onChange={handleChange}
            />
 <FormControl fullWidth variant="filled" sx={{ margin: ".5rem 0" }}>
      <InputLabel id="tipo-label">Tipo</InputLabel>
      <Select
        labelId="tipo-label"
        name="tipo"
        value={appleWatch.tipo}
        onChange={handleChange}
      >
        <MenuItem value="OB">OB</MenuItem>
        <MenuItem value="USADO">USADO</MenuItem>
        <MenuItem value="NEW">NEW</MenuItem>
      </Select>
    </FormControl>
            <FormControl fullWidth variant="filled" sx={{ margin: ".5rem 0" }}>
              <InputLabel>LTE/GPS</InputLabel>
              <Select
                name="lte_gps"
                value={appleWatch.lte_gps}
                onChange={handleChange}
              >
                <MenuItem value="LTE">LTE</MenuItem>
                <MenuItem value="GPS">GPS</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="filled"
              label="Fecha de llegada"
              type="date"
              sx={{ display: "block", margin: ".5rem 0" }}
              name="fecha_llegada"
              value={appleWatch.fecha_llegada}
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
                      checked={appleWatch.vendido}
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
                  value={appleWatch.fecha_salida || ""}
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
  