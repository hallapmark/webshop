import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography'
import { useState } from 'react';
import usersFile from '../../data/users.json'
import { useTranslation } from 'react-i18next';


function Users() {
    const [users, setUsers] = useState(usersFile.slice());
    const { t } = useTranslation();
      
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h1">{t('users.users')}</Typography>
        <Box display="flex" justifyContent="center">
          <List>
            {users.map((user) => (
              <ListItem key={user.id}>
                <ListItemText
                  primary={user.name}
                  secondary={user.email}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    )
}
export default Users