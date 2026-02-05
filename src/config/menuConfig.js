import React from "react";
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
import Science from "@mui/icons-material/Science";
import Settings from "@mui/icons-material/Settings";

export const MENU_ITEMS = [
    { text: "Dashboard", icon: <Home />, path: "/", key: "dashboard" },
    { text: "Purchase", icon: <ShoppingCart />, path: "/purchase", key: "purchase" },
    { text: "Goods Receipt Note (GRN)", icon: <Inventory />, path: "/grn", key: "grn" },
    { text: "Incoming Inspection", icon: <Assignment />, path: "/incoming-inspection", key: "incoming_inspection" },
    { text: "Store", icon: <Store />, path: "/store", key: "store" },
    { text: "Bill of Materials", icon: <Build />, path: "/bom", key: "bom" },
    { text: "Material Issue Request", icon: <Send />, path: "/material-issue", key: "material_issue" },
    { text: "After Production Inspection", icon: <CheckCircle />, path: "/production-inspection", key: "production_inspection" },
    { text: "Batch", icon: <Layers />, path: "/batch", key: "batch" },
    { text: "Customer Orders", icon: <People />, path: "/orders", key: "orders" },
    { text: "Invoices", icon: <Receipt />, path: "/invoices", key: "invoices" },
    { text: "Final Inspection", icon: <Verified />, path: "/final-inspection", key: "final_inspection" },
    { text: "Standard Operating Procedures", icon: <Description />, path: "/sop", key: "sop" },
    { text: "Dispatch Details", icon: <LocalShipping />, path: "/dispatch", key: "dispatch" },
    { text: "Rejected Goods", icon: <Cancel />, path: "/rejected-goods", key: "rejected_goods" },
    { text: "Role Management", icon: <Settings />, path: "/settings/roles", key: "role_management" },
    { text: "User Management", icon: <People />, path: "/settings/users", key: "user_management" },
];
