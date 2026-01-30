"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
  Button,
  Chip,
  Paper,
  LinearProgress,
  IconButton,
  Tooltip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ShoppingCart,
  Inventory,
  Build,
  LocalShipping,
  Assignment,
  Verified,
  TrendingUp,
  Receipt,
  People,
  Warning,
  FactCheck,
  Search,
  Notifications,
  CalendarMonth,
  AccessTime,
  ArrowForward,
  Info,
  Layers,
  Science,
  Description,
  Cancel,
  CheckCircle,
  AccountBalanceWallet,
  AutoGraph,
  ErrorOutline,
  KeyboardArrowRight,
  Timeline,
  Star,
  Settings,
  Store,
  Send,
  PrecisionManufacturing,
  Memory,
  SettingsSuggest,
  DoneAll,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

// --- Advanced UI Components ---

const StatCard = ({ title, value, icon, color, trend, percentage, subtitle }) => (
  <Card
    sx={{
      height: "100%",
      bgcolor: "white",
      borderRadius: 4,
      border: "1px solid #f1f5f9",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 12px 24px -10px rgba(0,0,0,0.1)",
      },
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2.5 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 3,
            bgcolor: `${color}15`,
            color: color,
            display: "flex",
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: trend.startsWith("+") ? "#10b981" : "#ef4444",
            fontWeight: 700,
            bgcolor: trend.startsWith("+") ? "#dcfce7" : "#fee2e2",
            px: 1.2,
            py: 0.6,
            borderRadius: 2,
            height: "fit-content",
          }}
        >
          {trend}
        </Typography>
      </Box>
      <Typography variant="h4" fontWeight={800} sx={{ color: "#1e293b", mb: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="#64748b" fontWeight={600}>
        {title}
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="caption" color="#94a3b8" fontWeight={500}>
            {subtitle}
          </Typography>
          <Typography variant="caption" fontWeight={700} color={color}>
            {percentage}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: `${color}10`,
            "& .MuiLinearProgress-bar": { borderRadius: 3, bgcolor: color },
          }}
        />
      </Box>
    </CardContent>
  </Card>
);

const ModuleQuickLink = ({ item, router }) => (
  <Paper
    onClick={() => router.push(item.path)}
    sx={{
      p: 2,
      borderRadius: 4,
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      cursor: "pointer",
      border: "1px solid #f1f5f9",
      transition: "0.2s",
      "&:hover": {
        bgcolor: "#f8fafc",
        borderColor: `${item.color}40`,
        transform: "translateY(-2px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      },
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: 2,
        bgcolor: `${item.color}15`,
        color: item.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {React.cloneElement(item.icon, { fontSize: "small" })}
    </Box>
    <Typography variant="caption" fontWeight={700} color="#334155" sx={{ whiteSpace: 'nowrap' }}>
      {item.name}
    </Typography>
  </Paper>
);

export default function ERPDashboard() {
  const router = useRouter();
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17) setGreeting("Good Evening");
  }, []);

  const metrics = [
    { title: "Daily Production", value: "842 Units", icon: <PrecisionManufacturing />, color: "#3b82f6", trend: "+12.5%", percentage: 84, subtitle: "Target: 1000 Units" },
    { title: "Active Batches", value: "24", icon: <Layers />, color: "#8b5cf6", trend: "+4 Units", percentage: 60, subtitle: "Lines Capacity" },
    { title: "Quality Yield", value: "99.2%", icon: <Verified />, color: "#10b981", trend: "+0.4%", percentage: 99, subtitle: "Rejection Rate: 0.8%" },
    { title: "Machine Uptime", value: "96.4%", icon: <SettingsSuggest />, color: "#f59e0b", trend: "-1.2%", percentage: 96, subtitle: "Idle Time: 2h 15m" },
  ];

  const modules = [
    { name: "Purchase", path: "/purchase", icon: <ShoppingCart />, color: "#3b82f6" },
    { name: "GRN", path: "/grn", icon: <Inventory />, color: "#6366f1" },
    { name: "Incoming QC", path: "/incoming-inspection", icon: <Assignment />, color: "#10b981" },
    { name: "Store", path: "/store", icon: <Store />, color: "#f59e0b" },
    { name: "BOM Master", path: "/bom", icon: <Build />, color: "#8b5cf6" },
    { name: "Issue Request", path: "/material-issue", icon: <Send />, color: "#0ea5e9" },
    { name: "APC QC", path: "/production-inspection", icon: <CheckCircle />, color: "#10b981" },
    { name: "Batching", path: "/batch", icon: <Layers />, color: "#f43f5e" },
    { name: "Final QC", path: "/final-inspection", icon: <Verified />, color: "#22c55e" },
    { name: "Dispatch", path: "/dispatch", icon: <LocalShipping />, color: "#f59e0b" },
  ];

  const activeProduction = [
    { id: "B-9902", product: "Logic Board XL", progress: 75, line: "Line 04", qty: 250, status: "Assembly" },
    { id: "B-9905", product: "Sensor Hub Pro", progress: 40, line: "Line 02", qty: 500, status: "Soldering" },
    { id: "B-9892", product: "D8 Enclosure", progress: 95, line: "Line 01", qty: 120, status: "Quality Check" },
    { id: "B-9910", product: "Power Unit S2", progress: 20, line: "Line 06", qty: 300, status: "Component Picking" },
  ];

  return (
    <Box sx={{ p: 1 }}>
      {/* Header with Production Overlays */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h4" fontWeight={900} color="#0f172a" sx={{ letterSpacing: "-0.02em" }}>
            Production <span style={{ color: "#3b82f6" }}>Dashboard</span>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 0.5 }}>
            <Typography variant="body2" color="#64748b" sx={{ fontWeight: 600 }}>
              Live Manufacturing Intelligence
            </Typography>
            <Chip
              icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981', ml: 1 }} />}
              label="System Operational"
              size="small"
              sx={{ bgcolor: '#dcfce7', color: '#166534', fontWeight: 800, border: 'none' }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            variant="outlined"
            onClick={() => router.push('/production-inspection')}
            sx={{
              borderRadius: 3, px: 3, py: 1, textTransform: "none", fontWeight: 700, borderColor: '#e2e8f0', color: '#475569'
            }}
          >
            QC Reports
          </Button>
          <Button
            variant="contained"
            startIcon={<Build />}
            onClick={() => router.push('/bom/create-bom')}
            sx={{
              bgcolor: "#1172ba", color: "white", borderRadius: 3, px: 3, py: 1, textTransform: "none", fontWeight: 700,
              "&:hover": { bgcolor: "#0d5a94" },
              boxShadow: '0 4px 12px rgba(17, 114, 186, 0.2)'
            }}
          >
            Create BOM
          </Button>
        </Box>
      </Box>

      {/* Primary Production Metrics */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {metrics.map((m, idx) => (
          <Grid item xs={12} sm={6} lg={3} key={idx} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...m} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Active Production Monitor */}
        <Grid item xs={12} lg={8} size={{ xs: 12, lg: 8 }}>
          <Card sx={{ borderRadius: 5, border: "1px solid #f1f5f9", mb: 5, overflow: 'hidden' }}>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
              <Typography variant="h6" fontWeight={800} color="#1e293b">
                Live Production Lines
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#3b82f6', cursor: 'pointer' }}>
                View All Lines
              </Typography>
            </Box>
            <Table size="medium">
              <TableHead>
                <TableRow sx={{ bgcolor: '#fff' }}>
                  <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Batch ID</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Product/Line</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Process Status</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#64748b' }} align="right">Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeProduction.map((p, idx) => (
                  <TableRow key={idx} hover sx={{ '&:last-child td': { border: 0 } }}>
                    <TableCell>
                      <Typography variant="body2" fontWeight={800} color="#1e293b">{p.id}</Typography>
                      <Typography variant="caption" color="#94a3b8">Qty: {p.qty}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={700} color="#334155">{p.product}</Typography>
                      <Chip label={p.line} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem', mt: 0.5 }} />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#3b82f6' }} />
                        <Typography variant="body2" fontWeight={600} color="#475569">{p.status}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: 'flex-end' }}>
                        <Typography variant="caption" fontWeight={900} color="#1e293b">{p.progress}%</Typography>
                        <Box sx={{ width: 80 }}>
                          <LinearProgress
                            variant="determinate"
                            value={p.progress}
                            sx={{ height: 6, borderRadius: 3, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: p.progress > 80 ? '#10b981' : '#3b82f6' } }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight={800} color="#1e293b" sx={{ mb: 3 }}>
              Enterprise Quick Access
            </Typography>
            <Grid container spacing={2}>
              {modules.map((mod, idx) => (
                <Grid item xs={6} sm={4} md={2.4} key={idx} size={{ xs: 6, sm: 4, md: 2.4 }}>
                  <ModuleQuickLink item={mod} router={router} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Action Panel & Performance */}
        <Grid item xs={12} lg={4} size={{ xs: 12, lg: 4 }}>
          {/* Machine Health Panel */}
          <Card sx={{ borderRadius: 5, border: "1px solid #f1f5f9", mb: 4 }}>
            <Box sx={{ p: 3, borderBottom: "1px solid #f1f5f9", bgcolor: "#f8fafc" }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight={800} color="#1e293b">Manual Stations</Typography>
                <Settings sx={{ color: '#94a3b8', fontSize: 20 }} />
              </Box>
            </Box>
            <CardContent sx={{ p: 3 }}>
              {[
                { name: "Assembly Station 1", status: "Active", load: 85, color: "#10b981" },
                { name: "Testing Bay A", status: "Idle", load: 0, color: "#94a3b8" },
                { name: "Final Pack Unit", status: "Active", load: 42, color: "#1172ba" },
              ].map((m, idx) => (
                <Box key={idx} sx={{ mb: 3, '&:last-child': { mb: 0 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" fontWeight={700} color="#334155">{m.name}</Typography>
                    <Typography variant="caption" fontWeight={800} color={m.color}>{m.status}</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={m.load} sx={{ height: 4, borderRadius: 2, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: m.color } }} />
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* SOP & Compliance Card */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 5,
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Box sx={{ mb: 3 }}>
                <Chip label="COMPLIANCE" size="small" sx={{ bgcolor: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', fontWeight: 900, mb: 2 }} />
                <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>SOP Adherence</Typography>
                <Typography variant="body2" sx={{ color: "#94a3b8", mb: 4 }}>
                  All production lines are currently operating under approved quality protocols.
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={900} color="#10b981">100%</Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>VERIFIED</Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={900}>14</Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>REPORTS</Typography>
                </Box>
              </Box>
            </Box>
            <DoneAll sx={{ position: "absolute", bottom: -20, right: -20, fontSize: 140, color: "rgba(255,255,255,0.03)" }} />
          </Paper>

          {/* Recent Quality Alerts */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" fontWeight={800} color="#1e293b" sx={{ mb: 2 }}>Attention Needed</Typography>
            {[
              { title: "BOM Update Required", desc: "Batch B-9910 needs BOM version 2.4", type: "Urgent", color: "#ef4444" },
              { title: "Calibration Due", desc: "Test Station Alpha calibration in 48h", type: "Info", color: "#3b82f6" },
            ].map((alert, idx) => (
              <Paper key={idx} sx={{ p: 2, borderRadius: 3, border: `1px solid ${alert.color}20`, mb: 2, display: 'flex', gap: 2 }}>
                <ErrorOutline sx={{ color: alert.color, fontSize: 24 }} />
                <Box>
                  <Typography variant="body2" fontWeight={800} color="#1e293b">{alert.title}</Typography>
                  <Typography variant="caption" color="#64748b" display="block">{alert.desc}</Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
