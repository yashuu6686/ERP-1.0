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
import Description from "@mui/icons-material/Description";
import LocalShipping from "@mui/icons-material/LocalShipping";
import Cancel from "@mui/icons-material/Cancel";
import Logout from "@mui/icons-material/Logout";
import { Link as MuiLink, Typography as MuiTypography, useMediaQuery, useTheme, Tooltip } from "@mui/material";
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

const DRAWER_WIDTH = 264;
const MINI_DRAWER_WIDTH = 56;

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

  const drawerVariant = hasMounted ? (isLargeScreen ? "persistent" : "temporary") : "persistent";
  const drawerOpen = hasMounted ? (isLargeScreen ? true : isSidebarOpen) : true;

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
          keepMounted: true,
        }}
        sx={{
          width: isLargeScreen ? (isSidebarOpen ? DRAWER_WIDTH : MINI_DRAWER_WIDTH) : (isSidebarOpen ? DRAWER_WIDTH : 0),
          flexShrink: 0,
          whiteSpace: isSidebarOpen ? 'normal' : 'nowrap',
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          "& .MuiDrawer-paper": {
            width: isLargeScreen ? (isSidebarOpen ? DRAWER_WIDTH : MINI_DRAWER_WIDTH) : (isSidebarOpen ? DRAWER_WIDTH : 0),
            boxSizing: "border-box",
            borderRight: "1px solid var(--border-default)",
            backgroundColor: "var(--bg-surface)",
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        {/* Profile Header Section */}

        <List
          className="sidebar-scroll"
          style={{
            padding: isSidebarOpen ? "var(--space-md) var(--space-sm)" : "var(--space-md) 4px",
            overflowY: "auto",
            overflowX: "hidden"
          }}
        >
          <Box sx={{ p: isSidebarOpen ? "6px" : "0px", display: 'flex', flexDirection: 'column', alignItems: isSidebarOpen ? 'stretch' : 'center' }}>
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
              width: '100%'
            }}>
              {isSidebarOpen ? (
                <img src="/logo.png" alt="Logo" style={{ width: '80px', height: '100px', objectFit: 'contain', cursor: "pointer" }} onClick={() => router.push("/")} />
              ) : (
                <img src="/logo.png" alt="Logo" style={{ width: '40px', height: '40px', objectFit: 'contain', cursor: "pointer" }} onClick={() => router.push("/")} />
              )}
            </Box>

            {isSidebarOpen && (
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
            )}
          </Box>

          <Divider sx={{ borderColor: "var(--border-default)", mb: 1, }} />

          {menuItems.map((item, index) => {
            const isActive =
              pathname === item.path ||
              pathname?.startsWith(item.path + "/");

            return (
              <Tooltip
                key={index}
                title={!isSidebarOpen ? item.text : ""}
                placement="right"
                arrow
                enterDelay={100}
              >
                <Box sx={{ width: '100%' }}>
                  <ListItemButton
                    component={Link}
                    href={item.path}
                    selected={isActive}
                    onClick={handleListItemClick}
                    sx={{
                      position: 'relative',
                      borderRadius: "8px",
                      marginBottom: "4px",
                      padding: isSidebarOpen ? "10px 12px" : "10px 0",
                      backgroundColor: isActive ? "var(--brand-soft)" : "transparent",
                      color: isActive ? "var(--brand-primary)" : "var(--text-primary)",
                      justifyContent: isSidebarOpen ? 'initial' : 'center',
                      minHeight: isSidebarOpen ? 'auto' : '48px',
                      '&::before': isActive ? {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '15%',
                        height: '70%',
                        width: '4px',
                        backgroundColor: 'var(--brand-primary)',
                        borderRadius: '0 4px 4px 0',
                      } : {}
                    }}
                  >
                    <Box
                      style={{
                        marginRight: isSidebarOpen ? "12px" : "0px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: 'center',
                        color: isActive ? "var(--brand-primary)" : "rgb(17, 114, 186)",
                      }}
                    >
                      {React.cloneElement(item.icon, { fontSize: "small" })}
                    </Box>

                    {isSidebarOpen && (
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontSize: "var(--size-body)",
                          fontWeight: isActive ? 600 : 500,
                          fontFamily: "var(--font-manrope)",
                          noWrap: false,
                          style: {
                            lineHeight: 1.2,
                            whiteSpace: 'normal',
                            wordBreak: 'break-word'
                          }
                        }}
                      />
                    )}
                  </ListItemButton>
                </Box>
              </Tooltip>
            );
          })}

          {/* Logout Button at Bottom */}
          <Divider sx={{ borderColor: "var(--border-default)", my: 1 }} />
          <Tooltip
            title={!isSidebarOpen ? "Logout" : ""}
            placement="right"
            arrow
            enterDelay={100}
          >
            <Box sx={{ width: '100%' }}>
              <ListItemButton
                onClick={logout}
                sx={{
                  borderRadius: "8px",
                  marginBottom: "4px",
                  padding: isSidebarOpen ? "10px 12px" : "10px 0",
                  backgroundColor: "transparent",
                  justifyContent: isSidebarOpen ? 'initial' : 'center',
                  minHeight: isSidebarOpen ? 'auto' : '48px',
                  "&:hover": {
                    backgroundColor: "var(--brand-soft)",
                  }
                }}
              >
                <Box
                  style={{
                    marginRight: isSidebarOpen ? "12px" : "0px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'center',
                    color: "rgb(17, 114, 186)",
                  }}
                >
                  <Logout fontSize="small" />
                </Box>

                {isSidebarOpen && (
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{
                      fontSize: "var(--size-body)",
                      fontWeight: 600,
                      fontFamily: "var(--font-manrope)",
                    }}
                  />
                )}
              </ListItemButton>
            </Box>
          </Tooltip>
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
        <Box sx={{ padding: "0px", flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1, p: { xs: 1.5, md: 2 } }}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}