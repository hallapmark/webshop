// import employeesFile from "../../data/employees.json"

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";

function Profile() {
  // const { id } = useParams();
  // const person = employeesFile.find(employee => employee.id === id);

  // if (person === undefined) {
  //   return <Typography variant="h6">Employee not found</Typography>
  // }

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", textAlign: "center" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        {/* {person.firstName + person.lastName} */}
        <Typography variant="h6">Firstname Lastname</Typography>
        <Typography variant="body2">email@email.com</Typography>
        <Typography variant="body2">Role: role</Typography>
      </CardContent>
    </Card>
  )
}

export default Profile