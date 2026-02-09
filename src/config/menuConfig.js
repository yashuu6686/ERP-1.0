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
import Settings from "@mui/icons-material/Settings";
import Business from "@mui/icons-material/Business";

export const APP_MENU = [
    {
        name: "Main",
        description: "Overview and analytics",
        items: [
            { text: "Dashboard", icon: <Home />, path: "/", key: "dashboard" },
        ]
    },
    {
        name: "Purchase Flow",
        description: "Procurement and inventory management",
        items: [
            { text: "Purchase", icon: <ShoppingCart />, path: "/purchase", key: "purchase" },
            { text: "Suppliers", icon: <Business />, path: "/suppliers", key: "suppliers" },
            { text: "Goods Receipt Note (GRN)", icon: <Inventory />, path: "/grn", key: "grn" },
            { text: "Incoming Inspection", icon: <Assignment />, path: "/incoming-inspection", key: "incoming_inspection" },
            { text: "Store", icon: <Store />, path: "/store", key: "store" },
        ]
    },
    {
        name: "Production Flow",
        description: "Manufacturing and production control",
        items: [
            { text: "Bill of Materials", icon: <Build />, path: "/bom", key: "bom" },
            { text: "Material Issue Request", icon: <Send />, path: "/material-issue", key: "material_issue" },
            { text: "After Production Inspection", icon: <CheckCircle />, path: "/production-inspection", key: "production_inspection" },
            { text: "Batch", icon: <Layers />, path: "/batch", key: "batch" },
        ]
    },
    {
        name: "Sales Flow",
        description: "Customer orders and invoicing",
        items: [
            { text: "Customer Orders", icon: <People />, path: "/orders", key: "orders" },
            { text: "Invoices", icon: <Receipt />, path: "/invoices", key: "invoices" },
            { text: "Final Inspection", icon: <Verified />, path: "/final-inspection", key: "final_inspection" },
            { text: "Standard Operating Procedures", icon: <Description />, path: "/sop", key: "sop" },
            { text: "Dispatch Details", icon: <LocalShipping />, path: "/dispatch", key: "dispatch" },
        ]
    },
    {
        name: "General & Settings",
        description: "Administration and general operations",
        items: [
            { text: "Rejected Goods", icon: <Cancel />, path: "/rejected-goods", key: "rejected_goods" },
            { text: "Role Management", icon: <Settings />, path: "/settings/roles", key: "role_management" },
            { text: "User Management", icon: <People />, path: "/settings/users", key: "user_management" },
        ]
    }
];

// Derived exports to maintain compatibility with existing code
export const MENU_ITEMS = APP_MENU.flatMap(flow => flow.items);

export const FLOWS = APP_MENU.map(flow => ({
    name: flow.name,
    items: flow.items.map(item => item.key)
}));
