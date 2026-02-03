"use client";
import React from "react";
import { Box, Typography, Grid, Card, CardContent, Paper, IconButton, Button, Divider, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Receipt,
  Inventory,
  LocalShipping,
  Assignment,
  Verified,
  Factory,
  Description,
  Science,
  Store,
  CallSplit,
  Layers,
  Cancel,
  ArrowForward,
  Notifications,
  Search,
  Add,
  TrendingUp,
  Warning,
  CheckCircle,
  Schedule
} from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";

// --- Components ---

const StatCard = ({ title, value, icon, color, trend }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      border: "1px solid #e2e8f0",
      borderRadius: 3,
      height: "100%",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      transition: "transform 0.2s",
      "&:hover": { transform: "translateY(-2px)", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }
    }}
  >
    <Box>
      <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="h4" fontWeight={700} sx={{ color: "#0f172a", mb: 1 }}>
        {value}
      </Typography>
      {trend && (
        <Typography variant="caption" sx={{ color: trend.positive ? "success.main" : "error.main", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
          {trend.value} <span style={{ color: "#64748b", fontWeight: 400 }}>vs last month</span>
        </Typography>
      )}
    </Box>
    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${color}15`, color: color }}>
      {icon}
    </Box>
  </Paper>
);

const WorkflowStep = ({ title, icon, path, color, isLast }) => {
  const router = useRouter();
  return (
    <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
      <Card
        elevation={0}
        onClick={() => router.push(path)}
        sx={{
          flex: 1,
          border: "1px solid #e2e8f0",
          borderRadius: 3,
          cursor: "pointer",
          transition: "all 0.2s",
          position: "relative",
          overflow: "visible",
          "&:hover": {
            borderColor: color,
            boxShadow: `0 4px 12px ${color}15`,
            transform: "translateY(-2px)"
          }
        }}
      >
        <CardContent sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${color}15`, color: color, display: "flex" }}>
            {icon}
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} sx={{ lineHeight: 1.2 }}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              View Details
            </Typography>
          </Box>
        </CardContent>
      </Card>
      {!isLast && (
        <Box sx={{ mx: 2, color: "#cbd5e1", display: { xs: "none", md: "block" } }}>
          <ArrowForward />
        </Box>
      )}
    </Box>
  );
};

const WorkflowSection = ({ title, steps, color }) => (
  <Box sx={{ mb: 5 }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 2.5 }}>
      <Box sx={{ width: 4, height: 24, bgcolor: color, mr: 1.5, borderRadius: 1 }} />
      <Typography variant="h6" fontWeight={700} color="text.primary">
        {title}
      </Typography>
    </Box>
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 2, md: 0 } }}>
      {steps.map((step, index) => (
        <WorkflowStep
          key={index}
          {...step}
          color={color}
          isLast={index === steps.length - 1}
        />
      ))}
    </Box>
  </Box>
);

// --- Main Page ---

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  const procurementFlow = [
    { title: "Purchase Orders", icon: <ShoppingCart />, path: "/purchase" },
    { title: "Goods Receipt Note", icon: <Inventory />, path: "/grn" },
    { title: "Incoming Quality", icon: <Verified />, path: "/incoming-inspection" },
    { title: "Store Inventory", icon: <Store />, path: "/store" },
  ];

  const productionFlow = [
    { title: "Material Issue", icon: <CallSplit />, path: "/material-issue" },
    { title: "Batch / BOM", icon: <Layers />, path: "/batch" },
    { title: "Production QC", icon: <Factory />, path: "/production-inspection" },
    { title: "Final Inspection", icon: <CheckCircle />, path: "/final-inspection" },
  ];

  const salesFlow = [
    { title: "Customer Orders", icon: <Assignment />, path: "/orders" },
    { title: "Dispatch Planning", icon: <LocalShipping />, path: "/dispatch" },
    { title: "Invoices", icon: <Receipt />, path: "/invoices" },
  ];

  const otherModules = [
    { title: "Standard Operating Procedures", icon: <Description />, path: "/sop", color: "#64748b" },
    { title: "Certificates of Analysis", icon: <Description />, path: "/coa", color: "#8b5cf6" },
    { title: "Rejected Goods", icon: <Cancel />, path: "/rejected-goods", color: "#ef4444" },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1600, mx: "auto" }}>

      {/* Header & Quick Actions */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "start", md: "center" }, mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ color: "#0f172a", mb: 0.5 }}>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Overview of your manufacturing workflows and metrics.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push('/orders/create-new-order')}
            sx={{ bgcolor: "#F59E0B", "&:hover": { bgcolor: "#D97706" }, textTransform: "none", borderRadius: 2 }}
          >
            New Order
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push('/purchase/create-purchase')}
            sx={{ bgcolor: "#2563EB", "&:hover": { bgcolor: "#1D4ED8" }, textTransform: "none", borderRadius: 2 }}
          >
            New Purchase
          </Button>
        </Box>
      </Box>

      {/* Stats Row */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Revenue"
            value="₹42.5L"
            icon={<TrendingUp />}
            color="#16a34a"
            trend={{ value: "+12%", positive: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Pending Orders"
            value="24"
            icon={<Assignment />}
            color="#d97706"
            trend={{ value: "+4", positive: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Open Purchases"
            value="12"
            icon={<ShoppingCart />}
            color="#2563eb"
            trend={{ value: "-2", positive: false }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="QC Pending"
            value="8"
            icon={<Warning />}
            color="#dc2626"
            trend={{ value: "Urgent", positive: false }}
          />
        </Grid>
      </Grid>

      {/* Workflows */}
      <WorkflowSection title="Procurement & Inward Flow" steps={procurementFlow} color="#2563eb" />
      <WorkflowSection title="Production & Quality Flow" steps={productionFlow} color="#059669" />
      <WorkflowSection title="Sales & Fulfillment Flow" steps={salesFlow} color="#d97706" />
      <WorkflowSection title="Other Modules" steps={otherModules} color="#64748b" />


    </Box>
  );
}
