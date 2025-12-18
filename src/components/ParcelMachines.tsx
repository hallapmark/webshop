import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

import { useEffect, useState } from "react";

function ParcelMachines() {
  const [country, setCountry] = useState("EE");
  const [selectedParcelMachine, setSelectedParcelMachine] = useState("");
  const [parcelMachines, setParcelMachines] = useState<any[]>([]);
  const [dbParcelMachines, setDbParcelMachines] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(json => {
        setParcelMachines(json);
        setDbParcelMachines(json);
      })
  }, []);

  useEffect(() => {
    const filtered = dbParcelMachines.filter(
      pm =>
        pm.A0_NAME === country &&
        pm.NAME.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setParcelMachines(filtered);
    setSelectedParcelMachine(filtered[0]?.NAME || ""); // first match
  }, [dbParcelMachines, country, searchTerm]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center", mb: 5}}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5 }}>
          <Button variant="contained" onClick={() => setCountry("EE")}>Eesti</Button>
          <Button variant="contained" onClick={() => setCountry("LV")}>Läti</Button>
          <Button variant="contained" onClick={() => setCountry("LT")}>Leedu</Button>
        </Box>
        <TextField 
            sx={{ minWidth: 200, maxWidth: 500}}
            id="outlined-search" 
            label="Search field" 
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl sx={{ minWidth: 220, maxWidth: 550 }}>
          <InputLabel id="parcel-locker-label">Parcel Locker</InputLabel>
          <Select
            labelId="parcel-locker-label"
            value={selectedParcelMachine}
            label="Parcel Locker"
            onChange={(e) => setSelectedParcelMachine(e.target.value)}
          >
            {parcelMachines
              .map(pm => (
                <MenuItem key={pm.ZIP} value={pm.NAME}>
                  {pm.NAME}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
  )
}
export default ParcelMachines