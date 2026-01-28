import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {
  Home,
  ShoppingCart,
  Inventory,
  Assignment,
  Store,
  Build,
  Send,
  CheckCircle,
  Layers,
  People,
  Receipt,
  Verified,
  Science,
  Description,
  LocalShipping,
  Cancel,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  { text: "Certificate Of Analysis", icon: <Science />, path: "/coa" },
  {
    text: "Standard Operating Procedures",
    icon: <Description />,
    path: "/sop",
  },
  { text: "Dispatch Details", icon: <LocalShipping />, path: "/dispatch" },
  { text: "Rejected Goods", icon: <Cancel />, path: "/rejected-goods" },
];

export default function Sidebar({ children }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [currentPath, setCurrentPath] = React.useState("/");
  //   const [selectedIndex, setSelectedIndex] = React.useState(0);

  const router = useRouter();

  const handleListItemClick = (index, path) => {
    setSelectedIndex(index);
    setCurrentPath(path);
  };

  return (
    <Box style={{ display: "flex", minHeight: "110vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 290,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 290,
            boxSizing: "border-box",
          },
        }}
      >


        <Divider />

        <List
          className="sidebar-scroll"
          style={{
            padding: "12px 8px",
            overflowY: "auto",
            // flex: 1,
          }}
        >
          {menuItems.map((item, index) => {
            const isActive =
              router.pathname === item.path ||
              router.pathname.startsWith(item.path + "/");

            return (
              <Link key={index} href={item.path} passHref legacyBehavior>
                <ListItemButton
                  selected={isActive}
                  style={{
                    borderRadius: "8px",
                    marginBottom: "4px",
                    padding: "10px 10px",
                    backgroundColor: isActive ? "rgb(198, 228, 251)" : "transparent",
                    color: "#000000",
                  }}
                >
                  <Box
                    style={{
                      marginRight: "12px",
                      display: "flex",
                      alignItems: "center",
                      color: "rgb(17, 114, 186)",
                    }}
                  >
                    {item.icon}
                  </Box>

                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            );
          })}
        </List>

        <Divider />

        <Box
          style={{
            padding: "16px",
            textAlign: "center",
            backgroundColor: "#f9fafb",
          }}
        >
          <Typography
            variant="caption"
            style={{
              color: "#6b7280",
              fontSize: "11px",
            }}
          >
            © 2024 ERP System
          </Typography>
        </Box>
      </Drawer>

      <Box
        component="main"
        style={{
          flexGrow: 1,
          padding: "12px",
          // padding: 3,
          // backgroundColor: "#f9fafb",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
