// import employeesFile from "../../data/employees.json"

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

function Profile() {
  const [person, setPerson] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/person?token=" + sessionStorage.getItem("token"))
      .then(res => res.json())
      .then(json => {
        setPerson(json);
        console.log(json);
        // TODO: Display alert/toast if user not found / upon error
      })
  }, []);

  if (!person || Object.keys(person).length === 0) {
    return <div>Loading....</div>
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", p: 2 }}>
      <Card elevation={3} sx={{ 
        width: "100%", 
        maxWidth: 480, 
        p: 2,
        borderRadius: 2 
        }}>
        <CardContent sx={{ 
          flexGrow: 1, 
          display: "flex", 
          flexDirection: "column", 
          textAlign: "center", 
          gap: 1
          }}>
          <Stack spacing={1} alignItems="center">
            {/* <Avatar sx={{ width: 72, height: 72, bgcolor: 'primary.main' }}>
              { (person.firstName?.[0] || '') + (person.lastName?.[0] || '') }
            </Avatar> */}
            <Typography variant="h4" mb={2}>Profile</Typography>
            { !editMode ? (
              <Typography variant="h6">{person.firstName} {person.lastName}</Typography>
            ) : (
              <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                <TextField
                  label="First name"
                  value={editedFirstName}
                  onChange={(e) => setEditedFirstName(e.target.value)}
                  required
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Last name"
                  value={editedLastName}
                  onChange={(e) => setEditedLastName(e.target.value)}
                  required
                  fullWidth
                  size="small"
                />
              </Stack>
            ) }
          { person.role && person.role !== 'user' && 
          <Typography variant="body2">{person.role}</Typography>}
          <Typography variant="body2">{person.email}</Typography>
          { editMode && <Typography variant="caption" color="text.secondary">Email cannot be changed from here</Typography>}
          </Stack>
        </CardContent>
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
            Profile updated
          </Alert>
        </Snackbar>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          { !editMode ? (
            <IconButton size="small" onClick={() => {
              setEditedFirstName(person.firstName || '');
              setEditedLastName(person.lastName || '');
              setEditMode(true);
            }}>
              <EditIcon />
            </IconButton>
          ) : (
            <>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                size="small"
                // don't allow save when first or last is empty, or when both are unchanged
                disabled={editedFirstName.trim() === '' || editedLastName.trim() === '' ||
                  (editedFirstName.trim() === person.firstName && editedLastName.trim() === person.lastName)}
                onClick={() => {
                  if (!editedFirstName.trim() || !editedLastName.trim()) {
                    return;
                  }
                  setPerson(prev => ({ ...prev, firstName: editedFirstName.trim(), lastName: editedLastName.trim() }));
                  setEditMode(false);
                  setSnackbarOpen(true);
                }}
              >
                Save
              </Button>
              <Button
                startIcon={<CloseIcon />}
                variant="outlined"
                size="small"
                onClick={() => {
                  setEditMode(false);
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}

export default Profile