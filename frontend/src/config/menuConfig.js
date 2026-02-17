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
import RateReview from "@mui/icons-material/RateReview";
import Assessment from "@mui/icons-material/Assessment";
import EventNote from "@mui/icons-material/EventNote";
import PrecisionManufacturing from "@mui/icons-material/PrecisionManufacturing";
import Thermostat from "@mui/icons-material/Thermostat";
import FactCheck from "@mui/icons-material/FactCheck";

export const APP_MENU = [
    {
        text: "Dashboard",
        icon: <Home />,
        path: "/",
        key: "dashboard"
    },
    {
        name: "Supplier",
        description: "Supplier management flow",
        items: [
            { text: "Supplier Survey", icon: <RateReview />, path: "/supplier-survey", key: "supplier_survey" },
            { text: "Risk Assessment", icon: <Assessment />, path: "/risk-assessment", key: "risk_assessment" },
            { text: "Initial Evaluation", icon: <Business />, path: "/initial-evaluation", key: "initial_evaluation" },
            { text: "Approved Suppliers", icon: <Verified />, path: "/approved-suppliers", key: "approved_suppliers" },


            { text: "Ongoing Evaluation", icon: <FactCheck />, path: "/ongoing-evaluation", key: "ongoing_evaluation" },
        ]
    },
    {
        name: "Purchase",
        description: "Procurement and inventory management",
        items: [
            { text: "Purchase Orders", icon: <ShoppingCart />, path: "/purchase", key: "purchase" },
            { text: "Goods Receipt Note (GRN)", icon: <Inventory />, path: "/grn", key: "grn" },
            { text: "Incoming Inspection", icon: <Assignment />, path: "/incoming-inspection", key: "incoming_inspection" },
            { text: "Store", icon: <Store />, path: "/store", key: "store" },
            { text: "Rejected Goods", icon: <Cancel />, path: "/rejected-goods", key: "rejected_goods" },
        ]
    },
    {
        name: "Production",
        description: "Manufacturing and production control",
        items: [
            { text: "Line Clearance Checklist", icon: <Assignment />, path: "/line-clearance-checklist", key: "line_clearance_checklist" },
            { text: "Batch Manufacturing Record (BMR)", icon: <Assignment />, path: "/production/bmr", key: "bmr" },
            { text: "Bill of Materials", icon: <Build />, path: "/bom", key: "bom" },
            { text: "Production Plan", icon: <EventNote />, path: "/production-plan", key: "production_plan" },
            // { text: "Material Issue Request", icon: <Send />, path: "/material-issue", key: "material_issue" },
            { text: "After Production Inspection", icon: <CheckCircle />, path: "/production-inspection", key: "production_inspection" },
            { text: "Batch", icon: <Layers />, path: "/batch", key: "batch" },
            { text: "Certificate of Analysis", icon: <Assessment />, path: "/coa", key: "coa" },
            { text: "Rejection Material Transfer Slip", icon: <Description />, path: "/rejection-transfer-slip", key: "rejection_transfer_slip" },
        ]
    },
    {
        name: "Sales",
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
        name: "Quality & Compliance",
        description: "Standards and equipment control",
        items: [
            { text: "Calibration", icon: <PrecisionManufacturing />, path: "/calibration", key: "calibration" },
        ]
    },
    {
        name: "Environment",
        description: "Monitoring and managing environment conditions",
        items: [
            { text: "Daily Monitoring Log", icon: <Assignment />, path: "/environment/monitoring-log", key: "environment_log" },
        ]
    },
    {
        name: "General & Settings",
        description: "Administration and general operations",
        items: [

            { text: "Role Management", icon: <Settings />, path: "/settings/roles", key: "role_management" },
            { text: "User Management", icon: <People />, path: "/settings/users", key: "user_management" },
        ]
    },

];


export const MENU_ITEMS = APP_MENU.flatMap(flow => flow.items ? flow.items : [flow]);

export const FLOWS = APP_MENU.map(flow => ({
    name: flow.name || flow.text,
    items: flow.items ? flow.items.map(item => item.key) : [flow.key]
}));
