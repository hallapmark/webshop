import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from '@mui/material/Typography';

// icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CallIcon from '@mui/icons-material/Call';
import PlaceIcon from '@mui/icons-material/Place';

import shopsFile from "../../data/tallinn_shops.json";

function Shops() {
  const [tabValue, setTabValue] = useState('tallinn');
  const tallinnShops = shopsFile.slice();

  return (
    <Box>
      {/* https://mui.com/material-ui/react-tabs/ */}
      <Tabs
        value={tabValue}
        onChange={(_event, newValue) => setTabValue(newValue)}
        centered
        textColor="primary"
        indicatorColor="primary"
        aria-label="City choice tabs"
      >
        {/* No onClick ... autowired ... calls the onChange of Tabs on Tab click */}
        <Tab value="tallinn" label="Tallinn" />
        <Tab value="tartu" label="Tartu" />
      </Tabs>

      <Box
        sx={{
          width: { xs: 'auto', md: '100%' },
          maxWidth: { xs: '100%', md: '50%' },
          mx: { xs: 1, md: 'auto' },
          my: 2,
        }}
      >
        { tabValue === "tallinn" &&
        tallinnShops.map((shop) =>
          // https://mui.com/material-ui/react-accordion/
          <Accordion key={shop.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ "&:hover": { backgroundColor: "action.hover" }}}>
              <Typography variant="h5">{shop.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display='flex' flexDirection="column" gap={2}>
                <Box display='flex' alignItems='center' gap={2}>
                  <PlaceIcon fontSize="small" />
                  <Typography variant="body1">{shop.address}</Typography>
                </Box>
                <Box display='flex' alignItems='center' gap={2}>
                  <CallIcon fontSize="small" />
                  <Typography variant="body1">(+372) {shop.telephone}</Typography>
                </Box>
                <Button component={RouterLink} to={`/shop/${shop.id}`}variant="contained" color="muted" sx={{ py: 1.2 }}>
                  Details
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        )}
        { tabValue === "tartu" &&
        <Typography variant="h4" sx={{ textAlign: 'center', mt: 4 }}>
            Our shop in Lõunakeskus will open soon
        </Typography>
        }
      </Box>
    </Box>
  )
}
export default Shops
