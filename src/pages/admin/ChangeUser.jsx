import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import usersFile from "../../data/users.json"
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

function ChangeUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(usersFile.find(item => item.id === id));

  const update = () => {
    if (user.name.length < 2) {
      toast.error("The name is too short");
      return;
    }
    if (user.email.length < 7) {
      toast.error("The email is too short");
      return;
    }
    if (!(user.email.includes("@"))) {
      toast.error("The email has an incorrect format");
      return;
      }
    const index = usersFile.findIndex((item) => item.id === id);
    usersFile[index] = user;
    navigate("/manage-users");
  };

  if (user === undefined) {
    return <Typography variant="h6">Shop not found</Typography>
  }

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center" }}>Edit User</Typography>
      <TextField
        label="Name"
        value={user.name}
        onChange={(e) => setUser({...user, name: e.target.value })}
      />
      <TextField
        label="Email"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value })}
      />
      
      <Button variant="contained" onClick={update}>Update</Button>
      <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
    </Box>
  );
}

export default ChangeUser