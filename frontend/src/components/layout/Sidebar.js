"use client";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Logout from "@mui/icons-material/Logout";
import { Link as MuiLink, Typography as MuiTypography, useMediaQuery, useTheme, Tooltip } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";
import Image from "next/image";
// import '../../styles/globals.css'

import { APP_MENU } from "@/config/menuConfig";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

const DRAWER_WIDTH = 264;
const MINI_DRAWER_WIDTH = 56;

export default function Sidebar({ children }) {
  const { user, logout, checkPermission } = useAuth();
  const [openStates, setOpenStates] = React.useState({});

  const filteredMenu = React.useMemo(() => {
    if (!user) return [];
    return APP_MENU.map(flow => {
      if (flow.items) {
        return {
          ...flow,
          items: flow.items.filter(item => checkPermission(item.key, 'view'))
        };
      }
      // If standalone item
      return checkPermission(flow.key, 'view') ? flow : null;
    }).filter(flow => flow && (!flow.items || flow.items.length > 0));
  }, [user, checkPermission]);

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

  const handleGroupClick = (groupName) => {
    if (!isSidebarOpen && isLargeScreen) {
      setIsSidebarOpen(true);
    }
    setOpenStates(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const handleListItemClick = () => {
    if (hasMounted && !isLargeScreen) {
      setIsSidebarOpen(false);
    }
  };

  // Auto-expand groups based on current path
  React.useEffect(() => {
    if (pathname === "/") {
      setOpenStates(prev => ({ ...prev, "Main": true }));
      return;
    }
    filteredMenu.forEach(flow => {
      const hasActiveChild = flow.items && flow.items.some(item =>
        pathname === item.path || pathname?.startsWith(item.path + "/")
      );
      if (hasActiveChild) {
        setOpenStates(prev => ({ ...prev, [flow.name]: true }));
      }
    });
  }, [pathname, filteredMenu]);

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
                <Image src="/logo.png" alt="Logo" width={80} height={100} style={{ objectFit: 'contain', cursor: "pointer" }} onClick={() => router.push("/")} />
              ) : (
                <Image src="/logo.png" alt="Logo" width={40} height={40} style={{ objectFit: 'contain', cursor: "pointer" }} onClick={() => router.push("/")} />
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

          {filteredMenu.map((flow, flowIndex) => {
            // Check if it's a standalone item or a flow group
            if (!flow.items) {
              const isActive = pathname === flow.path || pathname?.startsWith(flow.path + "/");
              return (
                <Tooltip
                  key={flowIndex}
                  title={!isSidebarOpen ? flow.text : ""}
                  placement="right"
                  arrow
                  enterDelay={100}
                >
                  <Box sx={{ width: '100%', mb: 0.5 }}>
                    <ListItemButton
                      component={Link}
                      href={flow.path}
                      selected={isActive}
                      onClick={handleListItemClick}
                      sx={{
                        position: 'relative',
                        borderRadius: "8px",
                        padding: isSidebarOpen ? "10px 12px" : "10px 0",
                        backgroundColor: isActive ? "var(--brand-soft)" : "transparent",
                        color: isActive ? "var(--brand-primary)" : "var(--text-primary)",
                        justifyContent: isSidebarOpen ? 'initial' : 'center',
                        minHeight: isSidebarOpen ? 'auto' : '48px',
                        '&:hover': {
                          backgroundColor: "rgba(17, 114, 186, 0.04)",
                        },
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
                        {React.cloneElement(flow.icon, { fontSize: "small" })}
                      </Box>

                      {isSidebarOpen && (
                        <ListItemText
                          primary={flow.text}
                          primaryTypographyProps={{
                            fontSize: "14px",
                            fontWeight: isActive ? 600 : 500,
                            fontFamily: "var(--font-manrope)",
                          }}
                        />
                      )}
                    </ListItemButton>
                  </Box>
                </Tooltip>
              );
            }

            const isExpanded = openStates[flow.name];

            return (
              <Box key={flowIndex} sx={{ width: '100%', mb: 1 }}>
                {/* Group Header */}
                <Tooltip
                  title={!isSidebarOpen ? flow.name : ""}
                  placement="right"
                  arrow
                  enterDelay={100}
                >
                  <ListItemButton
                    onClick={() => handleGroupClick(flow.name)}
                    sx={{
                      borderRadius: "8px",
                      padding: isSidebarOpen ? "10px 12px" : "10px 0",
                      justifyContent: isSidebarOpen ? 'initial' : 'center',
                      minHeight: isSidebarOpen ? 'auto' : '48px',
                      color: isExpanded ? "var(--brand-primary)" : "var(--text-primary)",
                      backgroundColor: isExpanded ? "rgba(17, 114, 186, 0.04)" : "transparent",
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
                        color: isExpanded ? "var(--brand-primary)" : "rgb(17, 114, 186)",
                      }}
                    >
                      {flow.icon ? React.cloneElement(flow.icon, { fontSize: "small" }) : React.cloneElement(flow.items[0].icon, { fontSize: "small" })}
                    </Box>

                    {isSidebarOpen && (
                      <>
                        <ListItemText
                          primary={flow.name}
                          primaryTypographyProps={{
                            fontSize: "14px",
                            fontWeight: isExpanded ? 600 : 500,
                            fontFamily: "var(--font-manrope)",
                          }}
                        />
                        {isExpanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                      </>
                    )}
                  </ListItemButton>
                </Tooltip>

                {/* Sub Items */}
                <Collapse in={isExpanded && isSidebarOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ mt: 0.5 }}>
                    {flow.items.map((item, itemIndex) => {
                      const isActive =
                        pathname === item.path ||
                        pathname?.startsWith(item.path + "/");

                      return (
                        <ListItemButton
                          key={itemIndex}
                          component={Link}
                          href={item.path}
                          selected={isActive}
                          onClick={handleListItemClick}
                          sx={{
                            position: 'relative',
                            borderRadius: "8px",
                            marginBottom: "2px",
                            ml: 2,
                            padding: "8px 12px",
                            backgroundColor: isActive ? "var(--brand-soft)" : "transparent",
                            color: isActive ? "var(--brand-primary)" : "var(--text-primary)",
                            '&:hover': {
                              backgroundColor: "rgba(17, 114, 186, 0.04)",
                            },
                            '&::before': isActive ? {
                              content: '""',
                              position: 'absolute',
                              left: 0,
                              top: '20%',
                              height: '60%',
                              width: '3px',
                              backgroundColor: 'var(--brand-primary)',
                              borderRadius: '0 4px 4px 0',
                            } : {}
                          }}
                        >
                          <Box
                            style={{
                              marginRight: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: 'center',
                              color: isActive ? "var(--brand-primary)" : "rgb(17, 114, 186)",
                            }}
                          >
                            {React.cloneElement(item.icon, { sx: { fontSize: "16px" } })}
                          </Box>

                          <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{
                              fontSize: "13px",
                              fontWeight: isActive ? 600 : 500,
                              fontFamily: "var(--font-manrope)",
                            }}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </Box>
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