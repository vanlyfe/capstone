import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import Container from "@mui/material/Container";
import logo from "../assets/logo1.png";
import Avatar from "@mui/material/Avatar";

// added the following for the links


import { Link } from "react-router-dom";
import { positions } from "@mui/system";

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ display: { xs: "none", md: "flex" } }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <Link to="/">
              <img src={logo} width="100" height="50" />
            </Link>
          </IconButton>
        </Toolbar>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/listing/:id" color="inherit">Temp link to details</Button>

          <Button component={Link} to="/createlisting" color="inherit">
            Add Listing
          </Button>

          <Button component={Link} to="/register" color="inherit">
            Register
          </Button>
          <Avatar
            component={Link}
            to="/listing/:id/edit"
            alt="Travis Howard"
            src="/static/images/avatar/2.jpg"
            sx={{ width: 50, height: 50 }}
          />
        </Stack>
      </Container>
    </AppBar>
  );
};
