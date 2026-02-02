"use client";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Home from "@mui/icons-material/Home";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Inventory from "@mui/icons-material/Inventory";
import Assignment from "@mui/icons-material/Assignment";
import Store from "@mui/icons-material/Store";
import Build from "@mui/icons-material/Build";
import Send from "@mui/icons-material/Send";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Layers from "@mui/icons-material/Layers";
import People from "@mui/icons-material/People";
import Receipt from "@mui/icons-material/Receipt";
import Verified from "@mui/icons-material/Verified";
import Science from "@mui/icons-material/Science";
import Description from "@mui/icons-material/Description";
import LocalShipping from "@mui/icons-material/LocalShipping";
import Cancel from "@mui/icons-material/Cancel";
import NavigateNext from "@mui/icons-material/NavigateNext";
import Logout from "@mui/icons-material/Logout";
import { Breadcrumbs, Link as MuiLink, Typography as MuiTypography, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";
import Image from "next/image";
// import '../../styles/globals.css'

const menuItems = [
  { text: "Dashboard", icon: <Home />, path: "/" },
  { text: "Purchase", icon: <ShoppingCart />, path: "/purchase" },
  { text: "Goods Receipt Note (GRN)", icon: <Inventory />, path: "/grn" },
  {
    text: "Incoming Inspection",
    icon: <Assignment />,
    path: "/incoming-inspection",
  },
  { text: "Store", icon: <Store />, path: "/store" },
  { text: "Bill of Materials", icon: <Build />, path: "/bom" },
  { text: "Material Issue Request", icon: <Send />, path: "/material-issue" },
  {
    text: "After Production Inspection",
    icon: <CheckCircle />,
    path: "/production-inspection",
  },
  { text: "Batch", icon: <Layers />, path: "/batch" },
  { text: "Customer Orders", icon: <People />, path: "/orders" },
  { text: "Invoices", icon: <Receipt />, path: "/invoices" },
  { text: "Final Inspection", icon: <Verified />, path: "/final-inspection" },
  // { text: "Certificate Of Analysis", icon: <Science />, path: "/coa" },
  {
    text: "Standard Operating Procedures",
    icon: <Description />,
    path: "/sop",
  },
  { text: "Dispatch Details", icon: <LocalShipping />, path: "/dispatch" },
  { text: "Rejected Goods", icon: <Cancel />, path: "/rejected-goods" },
];

export default function Sidebar({ children }) {
  const { user, logout } = useAuth();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [currentPath, setCurrentPath] = React.useState("/");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [hasMounted, setHasMounted] = React.useState(false);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery('(min-width:1200px)');

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  const router = useRouter();
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleListItemClick = () => {
    if (hasMounted && !isLargeScreen) {
      setIsSidebarOpen(false);
    }
  };

  // Prevent hydration mismatch/flicker by assuming desktop on first render if that's the default
  // or just waiting for mount to apply responsive variants.
  const drawerVariant = hasMounted ? (isLargeScreen ? "persistent" : "temporary") : "persistent";
  const drawerOpen = hasMounted ? (isLargeScreen ? isSidebarOpen : isSidebarOpen) : true;

  if (pathname === "/login") {
    return <Box sx={{ minHeight: "100vh" }}>{children}</Box>;
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", maxWidth: "100vw", overflowX: "hidden" }}>
      <Drawer
        variant={drawerVariant}
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: (hasMounted ? isSidebarOpen : true) ? 264 : 0,
          flexShrink: 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          "& .MuiDrawer-paper": {
            width: 264,
            boxSizing: "border-box",
            borderRight: "1px solid var(--border-default)",
            backgroundColor: "var(--bg-surface)",
          },
        }}
      >
        {/* Profile Header Section */}

        <List
          className="sidebar-scroll"
          style={{
            padding: "var(--space-md) var(--space-sm)",
            overflowY: "auto",
          }}
        >
          <Box sx={{ p: "6px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Image src="/Scanbo_logo_new.png" alt="Logo" width={100} height={100} />
              <IconButton
                size="small"
                onClick={logout}
                sx={{
                  color: "var(--brand-primary)",
                  borderRadius: "8px",
                  padding: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(17, 114, 186, 0.08)",
                    color: "#0d5a94",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "2px" }}>
                  <Logout sx={{ fontSize: "20px" }} />
                  <Typography sx={{ fontSize: "10px", color: "inherit", fontWeight: 700, textTransform: "uppercase" }}>Logout</Typography>
                </Box>
              </IconButton>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: "18px", color: "var(--text-primary)", mb: 0.5, fontFamily: "var(--font-manrope)" }}>
                {user?.name || "Member"}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "var(--text-secondary)", mb: 0.2, fontFamily: "var(--font-manrope)" }}>
                Login ID: <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{user?.id || "N/A"}</span>
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-manrope)" }}>
                Current Profile: <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>{user?.role || "User"}</span>
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor: "var(--border-default)", mb: 1, }} />

          {menuItems.map((item, index) => {
            const isActive =
              pathname === item.path ||
              pathname?.startsWith(item.path + "/");

            return (
              <Link key={index} href={item.path} passHref legacyBehavior>
                <ListItemButton
                  selected={isActive}
                  onClick={handleListItemClick}
                  style={{
                    borderRadius: "8px",
                    marginBottom: "4px",
                    padding: "10px 12px",
                    backgroundColor: isActive ? "var(--brand-soft)" : "transparent",
                    color: isActive ? "var(--brand-primary)" : "var(--text-primary)",
                  }}
                >
                  <Box
                    style={{
                      marginRight: "12px",
                      display: "flex",
                      alignItems: "center",
                      color: isActive ? "var(--brand-primary)" : "rgb(17, 114, 186)",
                    }}
                  >
                    {React.cloneElement(item.icon, { fontSize: "small" })}
                  </Box>

                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "var(--size-body)",
                      fontWeight: isActive ? 600 : 500,
                      fontFamily: "var(--font-manrope)"
                    }}
                  />
                </ListItemButton>
              </Link>
            );
          })}
        </List>

      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflowY: 'auto',
          position: 'relative',
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {/* Global Breadcrumbs */}
        <TopNavbar onToggleSidebar={handleDrawerToggle} />
        <Box sx={{ padding: "6px", flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* {pathname !== "/" && (
            <Box sx={{ mb: 2, mt: 2 }}>
              <Breadcrumbs
                separator={<NavigateNext fontSize="small" sx={{ color: '#94a3b8' }} />}
                aria-label="breadcrumb"
              >
                <MuiLink
                  component={Link}
                  underline="hover"
                  color="inherit"
                  href="/"
                  sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#64748b' }}
                >
                  Home
                </MuiLink>
                {pathname.split('/').filter(x => x).map((part, index, array) => {
                  const path = `/${array.slice(0, index + 1).join('/')}`;
                  const menuItem = menuItems.find(item => item.path === path);
                  const isLast = index === array.length - 1;
                  const label = menuItem ? menuItem.text : part.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

                  return isLast ? (
                    <MuiTypography
                      key={path}
                      sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}
                    >
                      {label}
                    </MuiTypography>
                  ) : (
                    <MuiLink
                      key={path}
                      component={Link}
                      underline="hover"
                      color="inherit"
                      href={path}
                      sx={{ fontSize: '0.875rem', color: '#64748b' }}
                    >
                      {label}
                    </MuiLink>
                  );
                })}
              </Breadcrumbs>
            </Box>
          )} */}

          <Box sx={{ flexGrow: 1 }}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}