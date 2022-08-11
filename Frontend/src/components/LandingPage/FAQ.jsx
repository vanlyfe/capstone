import React from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { Container } from "@mui/system";
import Typography from "./Typography";

export default function FAQ() {
  const [open, setOpen] = React.useState(0);

  return (
    <Container
      sx={{
        bgcolor: "secondary.light",
        padding: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        marked="center"
        component="h2"
        sx={{ ml: 25, mb: 5 }}
      >
        {" "}
        Frequently Asked Questions
      </Typography>

      <List>
        <ListItemButton onClick={() => setOpen(1)}>
          <ListItemText primary="How do I contact Vanlyfe Customer Support?" />
          {open === 1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open === 1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Sending an email is usually the quickest and easiest way to reach us." />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => setOpen(2)}>
          <ListItemText primary="Does Vanlyfe Do Background Checks?" />
          {open === 2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open === 2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="The simple answer is No. All users of Vanlyfe identify themselves by uploading a verified ID. Vanlyfe doesn't collect any background information on its users. Users of Vanlyfe should pick hosts or guests with positive reviews." />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => setOpen(3)}>
          <ListItemText primary="Who Can See My Vanlyfe Profile?" />
          {open === 3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open === 3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Everyone can see your Vanlyfe profile. It's public." />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => setOpen(4)}>
          <ListItemText primary="Should Vanlyfe Guests Clean On Check Out?" />
          {open === 4 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open === 4} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Yes, you should tidy the Vehicle and throw trashes before leaving. You are not expected to clean the Vehicle but to leave it in a reasonable condition." />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Container>
  );
}
