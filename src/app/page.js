"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
  Chip,
  Paper,
  LinearProgress,
  IconButton,
  Tooltip,
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
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

// --- Advanced UI Components ---

const GlassMetric = ({ title, value, icon, color, trend, percentage, subtitle }) => (
  <Card
    sx={{
      height: "100%",
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: 5,
      position: 'relative',
      overflow: 'hidden',
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
      "&:hover": {
        transform: "scale(1.02) translateY(-8px)",
        boxShadow: `0 20px 40px -10px ${color}30`,
        "& .icon-blob": { transform: 'scale(1.5) rotate(15deg)' }
      },
    }}
  >
    <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 3.5,
            bgcolor: `${color}15`,
            color: color,
            display: 'flex',
            boxShadow: `inset 0 2px 4px ${color}20`
          }}
        >
          {icon}
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="caption" sx={{ color: trend.startsWith('+') ? '#10b981' : '#ef4444', fontWeight: 800, bgcolor: trend.startsWith('+') ? '#dcfce7' : '#fee2e2', px: 1, py: 0.5, borderRadius: 1.5, fontSize: '0.7rem' }}>
            {trend}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h4" fontWeight={900} sx={{ color: '#0f172a', mb: 0.5, letterSpacing: '-0.02em' }}>
        {value}
      </Typography>
      <Typography variant="body2" color="#64748b" fontWeight={700} sx={{ mb: 2 }}>{title}</Typography>

      <Box sx={{ mt: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'flex-end' }}>
          <Typography variant="caption" color="#94a3b8" fontWeight={600}>{subtitle}</Typography>
          <Typography variant="caption" fontWeight={900} color={color}>{percentage}%</Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 7,
            borderRadius: 4,
            bgcolor: `${color}10`,
            "& .MuiLinearProgress-bar": { borderRadius: 4, bgcolor: color }
          }}
        />
      </Box>
    </CardContent>
    {/* Decorative Background Blob */}
    <Box className="icon-blob" sx={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, bgcolor: `${color}08`, borderRadius: '50%', transition: '0.6s' }} />
  </Card>
);

const HeroCard = ({ time, router }) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 4, md: 6 },
      mb: 5,
      borderRadius: 7,
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    }}
  >
    <Box sx={{ position: 'relative', zIndex: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Chip
          label="Operational Excellence"
          size="small"
          sx={{ bgcolor: '#3b82f6', color: 'white', fontWeight: 800, px: 1 }}
        />
        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
          {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </Typography>
      </Box>

      <Typography variant="h2" fontWeight={900} sx={{ mb: 2, letterSpacing: '-0.03em', fontSize: { xs: '2.4rem', md: '3.5rem' } }}>
        Operational <span style={{ color: '#3b82f6' }}>Dashboard</span>
      </Typography>

      <Typography variant="h6" sx={{ color: '#94a3b8', fontWeight: 400, maxWidth: 600, mb: 5, fontSize: '1.1rem', lineHeight: 1.6 }}>
        Monitor production pipelines, inventory integrity, and dispatch logistics across the entire Scanbo manufacturing ecosystem.
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
        <Button
          variant="contained"
          onClick={() => router.push('/bom/create-bom')}
          sx={{ bgcolor: '#3b82f6', color: 'white', fontWeight: 800, borderRadius: 4, px: 4, py: 1.8, textTransform: 'none', boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)', '&:hover': { bgcolor: '#2563eb' } }}
        >
          Initialize Production
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push('/production-inspection')}
          sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 700, borderRadius: 4, px: 4, py: 1.8, textTransform: 'none', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.05)' } }}
        >
          System Authorization
        </Button>
      </Box>
    </Box>

    {/* Decorative Elements */}
    <Box sx={{ position: 'absolute', top: -200, right: -200, width: 600, height: 600, background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
    <Box sx={{ position: 'absolute', bottom: 40, right: 80, opacity: 0.1 }}>
      <Timeline sx={{ fontSize: 240, transform: 'rotate(-20deg)' }} />
    </Box>
  </Paper>
);

const ModuleCard = ({ item, router }) => (
  <Paper
    onClick={() => router.push(item.path)}
    sx={{
      p: 3,
      borderRadius: 5,
      bgcolor: 'white',
      border: '1px solid #f1f5f9',
      cursor: 'pointer',
      transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      '&:hover': {
        border: `1px solid ${item.color}40`,
        bgcolor: '#f8fafc',
        transform: 'translateY(-5px)',
        boxShadow: `0 20px 25px -5px ${item.color}15`
      }
    }}
  >
    <Box
      sx={{
        width: 56,
        height: 56,
        borderRadius: '20px',
        bgcolor: `${item.color}10`,
        color: item.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        boxShadow: `0 10px 15px -3px ${item.color}10`
      }}
    >
      {item.icon}
    </Box>
    <Box>
      <Typography variant="subtitle2" fontWeight={800} color="#1e293b">{item.name}</Typography>
      <Typography variant="caption" color="#94a3b8" fontWeight={600}>Control</Typography>
    </Box>
  </Paper>
);

const ActivityItem = ({ act, isLast }) => (
  <Box sx={{ display: 'flex', gap: 2.5, mb: isLast ? 0 : 4, position: 'relative' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar
        sx={{
          width: 44,
          height: 44,
          bgcolor: `${act.color}15`,
          color: act.color,
          border: `2px solid ${act.color}25`
        }}
      >
        {act.icon}
      </Avatar>
      {!isLast && <Box sx={{ width: 2, flexGrow: 1, bgcolor: '#f1f5f9', my: 1 }} />}
    </Box>
    <Box sx={{ flexGrow: 1, pt: 0.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body1" fontWeight={800} color="#1e293b">{act.title}</Typography>
        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>{act.time}</Typography>
      </Box>
      <Typography variant="body2" color="#64748b" sx={{ lineHeight: 1.5 }}>{act.desc}</Typography>
      <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
        <Chip label="Details" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, borderRadius: 1.5 }} />
        <Chip label="Action" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, borderRadius: 1.5 }} />
      </Box>
    </Box>
  </Box>
);

export default function DashboardPage() {
  const router = useRouter();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const metrics = [
    { title: "Net Revenue", value: "₹42.8L", icon: <AccountBalanceWallet />, color: "#3b82f6", trend: "+12.4%", percentage: 84, subtitle: "Fiscal Target" },
    { title: "Active Batches", value: "32", icon: <Layers />, color: "#8b5cf6", trend: "+5.2%", percentage: 68, subtitle: "Current Stage" },
    { title: "Dispatch Load", value: "114", icon: <LocalShipping />, color: "#f59e0b", trend: "+18.1%", percentage: 92, subtitle: "Transit Ratio" },
    { title: "Quality Score", value: "98.2%", icon: <Verified />, color: "#10b981", trend: "+0.4%", percentage: 98, subtitle: "QC Benchmark" },
  ];

  const quickNav = [
    { name: "BOM Creator", path: "/bom/create-bom", icon: <Build />, color: "#3b82f6" },
    { name: "QC Flow", path: "/production-inspection", icon: <FactCheck />, color: "#10b981" },
    { name: "SOP Core", path: "/sop", icon: <Description />, color: "#6366f1" },
    { name: "Analytics", path: "/coa", icon: <AutoGraph />, color: "#ec4899" },
    { name: "Logistics", path: "/dispatch", icon: <LocalShipping />, color: "#f59e0b" },
    { name: "Rejections", path: "/rejected-goods", icon: <Cancel />, color: "#ef4444" },
    { name: "Inventory", path: "/store", icon: <Inventory />, color: "#f43f5e" },
    { name: "Orders", path: "/orders", icon: <People />, color: "#0ea5e9" },
  ];

  const activities = [
    { title: "Production Authorized", desc: "Batch #SCAN-2026-X8 authorized by Systems Admin for Mumbai Unit.", time: "14m ago", color: "#3b82f6", icon: <Verified fontSize="small" /> },
    { title: "Material Shortage", desc: "Scanbo Precision Enclosures (Raw) below critical threshold in Store A.", time: "42m ago", color: "#ef4444", icon: <ErrorOutline fontSize="small" /> },
    { title: "Dispatch Sequence", desc: "Route optimized for INV-990-2 logistics sequence to City Hospital.", time: "2h ago", color: "#f59e0b", icon: <LocalShipping fontSize="small" /> },
    { title: "System Sync", desc: "Cloud integrity check completed for all QC and COA endpoints.", time: "5h ago", color: "#10b981", icon: <Science fontSize="small" /> },
  ];

  return (
    <Box sx={{ p: { xs: 1, md: 2 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <HeroCard time={time} router={router} />

      {/* Statistics Section */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {metrics.map((m, idx) => (
          <Grid item size={{ xs: 12, sm: 6, lg: 3 }} key={idx}>
            <GlassMetric {...m} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Left: System Control & Activity */}
        <Grid item xs={12} lg={8}>
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight={900} color="#0f172a" sx={{ letterSpacing: '-0.02em' }}>
                System <span style={{ color: '#3b82f6' }}>Modules</span>
              </Typography>
              <Button size="small" endIcon={<KeyboardArrowRight />} sx={{ textTransform: 'none', fontWeight: 800 }}>Explore All</Button>
            </Box>
            <Grid container spacing={2.5}>
              {quickNav.map((item, idx) => (
                <Grid item size={{ xs: 6, sm: 4, md: 3 }} key={idx}>
                  <ModuleCard item={item} router={router} />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={900} color="#0f172a" sx={{ letterSpacing: '-0.02em', mb: 3.5 }}>
              Precision <span style={{ color: '#3b82f6' }}>Timeline</span>
            </Typography>
            <Paper sx={{ p: 4, borderRadius: 6, border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
              {activities.map((act, idx) => (
                <ActivityItem key={idx} act={act} isLast={idx === activities.length - 1} />
              ))}
            </Paper>
          </Box>
        </Grid>

        {/* Right: Risk Management & Performance */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" fontWeight={900} color="#0f172a" sx={{ letterSpacing: '-0.02em', mb: 3 }}>
              Risk <span style={{ color: '#ef4444' }}>Monitors</span>
            </Typography>
            <Card sx={{ borderRadius: 6, border: '1px solid #f1f5f9', p: 1 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                  <Avatar sx={{ bgcolor: '#fee2e2', color: '#ef4444' }}><Warning /></Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={800}>Inventory Criticality</Typography>
                    <Typography variant="caption" color="#94a3b8">2 Material Items Alert</Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" fontWeight={800} color="#475569">Precision Sensors</Typography>
                    <Typography variant="caption" fontWeight={900} color="#ef4444">12%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={12} sx={{ height: 6, borderRadius: 3, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: '#ef4444' } }} />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" fontWeight={800} color="#475569">D8 Enclosures</Typography>
                    <Typography variant="caption" fontWeight={900} color="#f59e0b">24%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={24} sx={{ height: 6, borderRadius: 3, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: '#f59e0b' } }} />
                </Box>

                <Button fullWidth variant="contained" sx={{ bgcolor: '#0f172a', color: 'white', borderRadius: 4, py: 1.5, fontWeight: 800, textTransform: 'none', '&:hover': { bgcolor: '#1e293b' } }}>
                  Automate Procurement
                </Button>
              </CardContent>
            </Card>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={900} color="#0f172a" sx={{ letterSpacing: '-0.02em', mb: 3 }}>
              Unit <span style={{ color: '#10b981' }}>Health</span>
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 6,
                background: 'linear-gradient(to bottom, #ffffff, #f0fdf4)',
                border: '1px solid #dcfce7',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 3,
                      bgcolor: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                    }}
                  >
                    <Timeline sx={{ color: '#10b981' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={800} color="#065f46">Production Sync</Typography>
                    <Typography variant="caption" color="#10b981" fontWeight={700}>Active Phase 4</Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="#64748b" sx={{ lineHeight: 1.6, display: 'block' }}>
                  Centralized manufacturing nodes are currently achieving 99.8% precision with synchronized dispatch latencies.
                </Typography>
              </Box>
              <Box sx={{ position: 'absolute', top: -20, right: -20, opacity: 0.2 }}>
                <Science sx={{ fontSize: 100, color: '#10b981' }} />
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
