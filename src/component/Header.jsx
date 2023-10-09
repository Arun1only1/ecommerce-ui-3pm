import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, Badge, Stack } from "@mui/material";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import LogoutDialog from "./LogoutDialog";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useQuery } from "react-query";
import { $axios } from "../lib/axios";
import { getUserShortName } from "../utils/user.short.name";
import { isSeller } from "../utils/user.role";

const drawerWidth = 240;

const navItems = [
  {
    id: 1,
    name: "Home",
    path: "/home",
  },
  {
    id: 2,
    name: "Product",
    path: "/product",
  },
  {
    id: 3,
    name: "About",
    path: "/about",
  },
];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const userIsSeller = isSeller();

  // get cart count query
  const { data } = useQuery({
    queryKey: ["cart-count"],
    queryFn: async () => {
      return await $axios.get("/cart/count");
    },
    enabled: !userIsSeller, // controls query hit as per condition
  });

  const cartItemCount = data?.data?.count;
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Nepmart
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              {/* <ListItemText primary={item.name} /> */}
              <Link to={item.path}>{item.name}</Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        mb: {
          xs: "7rem",
          sm: "3rem",
        },
      }}
    >
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          background: "#5C5470",
          minHeight: "4rem",
          // display: "flex",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            NEP MART
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              mr: {
                xs: 0,
                sm: "5rem",
              },
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.id}
                sx={{ color: "#fff", textDecoration: "none" }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "navlink-active" : "navlink-pending"
                  }
                >
                  <Typography>{item.name}</Typography>
                </NavLink>
              </Button>
            ))}
          </Box>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            {!isSeller() && (
              <Badge badgeContent={cartItemCount} color="success">
                <AiOutlineShoppingCart
                  size={30}
                  style={{
                    cursor: "pointer",
                    color: pathname === "/cart" ? "orange" : null,
                  }}
                  onClick={() => navigate("/cart")}
                />
              </Badge>
            )}

            <Avatar sx={{ width: 45, height: 45, backgroundColor: "purple" }}>
              {getUserShortName()}
            </Avatar>
            <LogoutDialog />
          </Stack>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
