import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";


function Login() {
  const [loginCredentials, setLoginCredentials] = useState({"email": "", "password": ""});
  const [loading, setLoading] = useState(false);
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // enable loading
    fetch()
      .then(res => res.json())
      .then(json => {
        if (json.message && json.timestamp && json.status) {
          toast.error(`${json.message}\n Status: ${json.status}`);
        } else {
          login(json.token);
          navigate("/profile");
        }
        // disable loading
    })

    // default käitumine on et teeb refreshi, me tõkestame seda
    
    
    // siit saata json token sisse
    //login(json.token);
    
    navigate("/profile");
  }
  
  return (
    <Box
      component="form"
      onSubmit={(e) => handleSubmit(e)}
      sx={{
        maxWidth: 480,
        mx: "auto",
        mt: 6,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        px: 2,
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>Log in</Typography>
      <TextField
        label="Email"
        type="email"
        value={loginCredentials.email}
        onChange={(e) => setLoginCredentials({...loginCredentials, "email": e.target.value})}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={loginCredentials.password}
        onChange={(e) => setLoginCredentials({...loginCredentials, "password": e.target.value})}
        required
      />

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      <ToastContainer position="bottom-right" autoClose={1100} theme="dark" />
    </Box>
  );
}
export default Login