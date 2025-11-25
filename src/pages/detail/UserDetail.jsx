import { useNavigate, useParams } from "react-router-dom"
import usersFile from "../../data/users.json"

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const found = usersFile.find(employee => employee.id === id);

  if (found === undefined) {
    return <Typography variant="h6">Employee not found</Typography>
  }

  return (
    <Card sx={{ textAlign: "center" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{found.name}</Typography>
        <Typography variant="body2">{found.email}</Typography>
        <Button sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Back
        </Button>
      </CardContent>
    </Card>
  )
}

export default UserDetail