import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { toast, ToastContainer } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
// mui seems to also have some built-in checks, this is in addition to those
// should guarantee anystring@anystring.anystring 
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const payload = {
      firstName,
      lastName,
      email,
      password,
      role: "user",
    };

    setLoading(true);
    fetch("http://localhost:8080/persons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => {
      setLoading(false);
      navigate("/");
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
      <Typography variant="h4" sx={{ textAlign: "center" }}>Sign up</Typography>
      <TextField
        label="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <TextField
        label="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Signing up..." : "Sign up"}
      </Button>

      <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
    </Box>
  );
}

export default Signup;
 