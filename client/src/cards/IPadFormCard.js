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

export default function IPadFormCard({
  ipad,
  modelos,
  handleChange,
  handleSubmit,
  editing,
}) {
  return (
    <Card sx={{ mt: 5 }} style={{ padding: "1rem" }}>
      <Typography variant="h5" textAlign="center">
        {editing ? "Editar iPad" : "Añadir un iPad"}
      </Typography>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="filled"
            label="IMEI"
            sx={{ display: "block", margin: ".5rem 0" }}
            name="imei"
            value={ipad.imei}
            onChange={handleChange}
            inputProps={{ maxLength: 15 }}
          />
          <FormControl fullWidth variant="filled" sx={{ margin: ".5rem 0" }}>
            <InputLabel>Modelo</InputLabel>
            <Select
              name="id_modelo"
              value={ipad.id_modelo}
              onChange={handleChange}
            >
              {modelos.filter((modelo) => modelo.nombre_modelo.startsWith("IPAD"))
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
            value={ipad.num_modelo}
            onChange={handleChange}
            inputProps={{ maxLength: 6 }}
          />
          <FormControl fullWidth variant="filled" sx={{ margin: ".5rem 0" }}>
            <InputLabel>Capacidad (GB)</InputLabel>
            <Select
              name="capacidad"
              value={ipad.capacidad}
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
            value={ipad.color}
            onChange={handleChange}
          />
          <Select
            name="tipo"
            value={ipad.tipo}
            onChange={handleChange}
            style={{ display: "block", margin: ".5rem 0" }}
          >
            <option value="" disabled>
              Selecciona un tipo
            </option>
            <MenuItem value="OB">OB</MenuItem>
            <MenuItem value="USED">USED</MenuItem>
            <MenuItem value="NEW">NEW</MenuItem>
          </Select>
          <TextField
            variant="filled"
            label="Fecha de llegada"
            type="date"
            sx={{ display: "block", margin: ".5rem 0" }}
            name="fecha_llegada"
            value={ipad.fecha_llegada}
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
                    checked={ipad.vendido}
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
                value={ipad.fecha_salida || ""}
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
