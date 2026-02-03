"use client";
import React, { useState, useMemo } from "react";
import {
    Box,
    Typography,
    Grid,
    Avatar,
    Tab,
    Tabs,
    Paper,
    Button,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Alert,
    Stack
} from "@mui/material";
import {
    Person,
    Security,
    History,
    Settings,
    Edit,
    Badge,
    Email,
    Phone,
    LocationOn,
    Business,
    Shield,
    Verified,
    Lock,
    Notifications,
    Key,
    Devices,
    Language,
    Inventory,
    Assignment,
    LocalShipping,
    BarChart,
    Warning,
    CheckCircle,
    Share,
    Analytics
} from "@mui/icons-material";
import CommonCard from "../../components/CommonCard";

// Professional Corporate Palette - Mapped to Brand Variables
const COLORS = {
    primary: "#0f172a",    // deep slate
    secondary: "#64748b",  // muted slate
    accent: "#334155",     // medium slate
    border: "#e2e8f0",     // light gray border
    bg: "#f8fafc",         // off-white bg
    status: {
        success: "#059669",// emerald 600
        warning: "#d97706",// amber 600
        error: "#dc2626",  // red 600
        neutral: "#475569" // slate 600
    }
};

// Mock Data Generators based on Role
const getRoleData = (role) => {
    switch (role) {
        case "Store Manager":
            return {
                name: "Ramesh Patel",
                id: "EMP-STORE-042",
                role: "Store Manager",
                rank: "Level 4 Logistics",
                department: "Warehouse & Inventory",
                color: "var(--warning)",
                stats: [
                    { label: "Low Stock Alerts", value: "15", color: "var(--error)" },
                    { label: "Pending GRNs", value: "8", color: "var(--warning)" },
                    { label: "Dispatches Today", value: "24", color: "var(--success)" },
                    { label: "Stock Accuracy", value: "98.5%", color: "var(--brand-primary)" },
                ],
                recentActivity: [
                    { event: "Material Issue Approved", module: "Inventory", time: "10m ago", status: "Success" },
                    { event: "GRN Verification", module: "Receiving", time: "1h ago", status: "Pending" },
                    { event: "Stock Audit", module: "Warehouse A", time: "Yesterday", status: "Completed" }
                ]
            };
        case "Quality Manager":
            return {
                name: "Anjali Gupta",
                id: "EMP-QC-108",
                role: "Quality Manager",
                rank: "Senior QA Specialist",
                department: "Quality Assurance",
                color: "var(--success)",
                stats: [
                    { label: "Pending Inspections", value: "12", color: "var(--warning)" },
                    { label: "Rejected Batches", value: "3", color: "var(--error)" },
                    { label: "Approved Today", value: "45", color: "var(--success)" },
                    { label: "Avg. Test Time", value: "18m", color: "var(--brand-primary)" },
                ],
                recentActivity: [
                    { event: "Batch #4459 Rejected", module: "Final Inspection", time: "30m ago", status: "Rejected" },
                    { event: "SOP Update v2.1", module: "Compliance", time: "4h ago", status: "Approved" },
                    { event: "Lab Report Gen", module: "COA", time: "Yesterday", status: "Verified" }
                ]
            };
        case "Admin":
        default:
            return {
                name: "Jignesh Makvana",
                id: "EMP-2024-001",
                role: "System Administrator",
                rank: "Tier 5 Ops Lead",
                department: "IT & Operations",
                color: "var(--brand-primary)",
                stats: [
                    { label: "Active Users", value: "142", color: "var(--success)" },
                    { label: "System Alerts", value: "2", color: "var(--warning)" },
                    { label: "Pending Access", value: "5", color: "var(--brand-primary)" },
                    { label: "Server Status", value: "99.9%", color: "var(--success)" },
                ],
                recentActivity: [
                    { event: "User Role Update", module: "Admin Panel", time: "5m ago", status: "Success" },
                    { event: "Security Audit", module: "System", time: "2h ago", status: "Completed" },
                    { event: "Backup Restore", module: "Database", time: "2d ago", status: "Verified" }
                ]
            };
    }
};

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedRole, setSelectedRole] = useState("Admin");

    const userDetails = useMemo(() => getRoleData(selectedRole), [selectedRole]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
        setActiveTab(0); // Reset tab on role switch
    };

    const recentSessions = [
        { device: "MacBook Pro - Chrome", location: "Mumbai, India", time: "Just now", status: "Active" },
        { device: "iPhone 15 Pro - App", location: "Pune, India", time: "2 hours ago", status: "Closed" },
        { device: "Windows Desktop - Edge", location: "Mumbai, India", time: "Yesterday", status: "Closed" },
    ];

    return (
        <Box sx={{ p: "var(--space-lg)", maxWidth: "var(--content-max-width)", mx: "auto" }}>

            {/* DEV TOOL: Role Switcher */}
            {/* Professional Header */}
            <Box sx={{ bgcolor: "#fff", borderBottom: `1px solid ${COLORS.border}`, py: 1.5, px: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: COLORS.primary, letterSpacing: -0.5 }}>
                            Employee Profile
                        </Typography>
                        <Divider orientation="vertical" flexItem sx={{ height: 24, alignSelf: "center" }} />
                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <Select
                                value={selectedRole}
                                onChange={handleRoleChange}
                                sx={{
                                    height: 32,
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    bgcolor: COLORS.bg,
                                    "& .MuiOutlinedInput-notchedOutline": { border: "none" }
                                }}
                            >
                                <MenuItem value="Admin">Admin Simulator</MenuItem>
                                <MenuItem value="Store Manager">Store Manager Simulator</MenuItem>
                                <MenuItem value="Quality Manager">Quality Manager Simulator</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <Button startIcon={<Share />} sx={{ color: COLORS.secondary, textTransform: "none", fontWeight: 600 }}>Share</Button>
                        <Button variant="contained" disableElevation startIcon={<Edit />} sx={{ bgcolor: COLORS.primary, "&:hover": { bgcolor: COLORS.accent }, textTransform: "none", fontWeight: 700, px: 3 }}>
                            Edit Profile
                        </Button>
                    </Stack>
                </Box>
            </Box>

            {/* 1. Profile Identity Header */}
            <Paper
                elevation={0}
                sx={{
                    p: "var(--space-2xl)",
                    mb: "var(--space-xl)",
                    // borderRadius: "var(--card-radius)",
                    border: "1px solid var(--border-default)",
                    bgcolor: "var(--bg-surface)",
                    boxShadow: "var(--card-shadow)",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Decorative Background Element */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        mb: 2,
                        right: 0,
                        width: "300px",
                        height: "100%",
                        background: `linear-gradient(135deg, transparent 20%, ${userDetails.color.includes('var') ? 'rgba(15, 23, 42, 0.08)' : userDetails.color + '15'} 100%)`,
                        pointerEvents: "none"
                    }}
                />

                <Grid container spacing={4} alignItems="center" position="relative">
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                bgcolor: userDetails.color,
                                fontSize: "2.5rem",
                                fontWeight: 900,
                                border: "4px solid var(--bg-surface)",
                                boxShadow: `0 10px 20px -5px ${userDetails.color}40`, // dynamic shadow color
                            }}
                        >
                            {userDetails.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                    </Grid>
                    <Grid item xs={12} sm size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                            <Typography
                                sx={{
                                    fontSize: "var(--size-heading-md)",
                                    fontWeight: "var(--weight-bold)",
                                    color: "var(--text-primary)",
                                    fontFamily: "var(--font-manrope)"
                                }}
                            >
                                {userDetails.name}
                            </Typography>
                            <Chip
                                label={userDetails.status || "Active Duty"}
                                size="small"
                                icon={<Verified sx={{ fontSize: "14px !important" }} />}
                                sx={{
                                    bgcolor: userDetails.color.includes('var') ? 'rgba(15, 23, 42, 0.08)' : `${userDetails.color}15`,
                                    color: userDetails.color,
                                    fontWeight: 700,
                                    fontSize: "var(--size-caption)",
                                    border: "none",
                                    fontFamily: "var(--font-manrope)"
                                }}
                            />
                        </Box>
                        <Typography
                            sx={{
                                color: "var(--text-secondary)",
                                fontWeight: 600,
                                mb: 2,
                                fontSize: "var(--size-body)",
                                fontFamily: "var(--font-manrope)"
                            }}
                        >
                            {userDetails.role} • {userDetails.department}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Badge sx={{ color: "var(--text-muted)", fontSize: 18 }} />
                                <Typography sx={{ color: "var(--text-secondary)", fontWeight: 700, fontSize: "var(--size-caption)", fontFamily: "var(--font-manrope)" }}>ID: {userDetails.id}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Business sx={{ color: "var(--text-muted)", fontSize: 18 }} />
                                <Typography sx={{ color: "var(--text-secondary)", fontWeight: 700, fontSize: "var(--size-caption)", fontFamily: "var(--font-manrope)" }}>Rank: {userDetails.rank}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Language sx={{ color: "var(--text-muted)", fontSize: 18 }} />
                                <Typography sx={{ color: "var(--text-secondary)", fontWeight: 700, fontSize: "var(--size-caption)", fontFamily: "var(--font-manrope)" }}>Base: Mumbai HQ</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                        <Button
                            variant="contained"
                            startIcon={<Edit />}
                            sx={{
                                bgcolor: "var(--brand-primary)",
                                borderRadius: "var(--btn-radius)",
                                px: 3,
                                py: 1,
                                textTransform: "none",
                                fontWeight: 700,
                                fontFamily: "var(--font-manrope)",
                                boxShadow: "none",
                                "&:hover": { bgcolor: "#2557cc" }
                            }}
                        >
                            Edit Profile
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* 2. Unified Interface Selection */}
            <Box sx={{ mb: 4, borderBottom: "1px solid var(--border-default)" }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    sx={{
                        "& .MuiTab-root": {
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: "var(--size-body)",
                            minWidth: 120,
                            color: "var(--text-muted)",
                            fontFamily: "var(--font-manrope)"
                        },
                        "& .Mui-selected": { color: "var(--brand-primary) !important" },
                        "& .MuiTabs-indicator": { height: 3, borderRadius: "3px 3px 0 0", bgcolor: "var(--brand-primary)" }
                    }}
                >
                    <Tab icon={<Person sx={{ fontSize: 20 }} />} iconPosition="start" label="Overview" />
                    <Tab icon={<BarChart sx={{ fontSize: 20 }} />} iconPosition="start" label="Performance" />
                    <Tab icon={<Security sx={{ fontSize: 20 }} />} iconPosition="start" label="Access & Security" />
                    <Tab icon={<History sx={{ fontSize: 20 }} />} iconPosition="start" label="Activity Logs" />
                </Tabs>
            </Box>

            {/* 3. Dynamic Section Content */}
            <Box sx={{ mt: 4 }}>
                {activeTab === 0 && (
                    <Grid container spacing={4}>
                        {/* Overview Left: Personal Data */}
                        <Grid item xs={12} md={8} size={{ xs: 12, sm: 6, md: 8 }}>
                            <CommonCard title="Core Personal Information">
                                <Grid container spacing={4} sx={{ p: 1 }}>
                                    {[
                                        { label: "Full Official Name", value: userDetails.name, icon: <Person /> },
                                        { label: "Designated Email", value: "user@enterprise-erp.com", icon: <Email /> },
                                        { label: "Primary Phone", value: "+91 98765 43210", icon: <Phone /> },
                                        { label: "Role Authority", value: userDetails.role, icon: <Badge /> },
                                        { label: "Department", value: userDetails.department, icon: <Business /> },
                                        { label: "Primary Worksite", value: "Mumbai Sector 7", icon: <LocationOn /> }
                                    ].map((field, i) => (
                                        <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                                            <Typography sx={{ color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", fontSize: "var(--size-caption)", fontFamily: "var(--font-manrope)" }}>
                                                {field.label}
                                            </Typography>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1 }}>
                                                <Box sx={{ color: "var(--brand-primary)", display: "flex" }}>
                                                    {React.cloneElement(field.icon, { fontSize: "small" })}
                                                </Box>
                                                <Typography sx={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "var(--size-body)", fontFamily: "var(--font-manrope)" }}>
                                                    {field.value}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CommonCard>

                            <Box sx={{ mt: 4 }}>
                                <CommonCard title="Operational KPI Summary">
                                    <Box sx={{ p: 1 }}>
                                        <Typography sx={{ mb: 3, color: "var(--text-secondary)", fontSize: "var(--size-body)", fontFamily: "var(--font-manrope)" }}>
                                            Key performance metrics and daily operational stats for {userDetails.role}.
                                        </Typography>
                                        <Grid container spacing={3}>
                                            {userDetails.stats.map((stat, i) => (
                                                <Grid item xs={6} sm={3} size={{ xs: 12, sm: 3, md: 4 }} key={i}>
                                                    <Box sx={{ p: 2, bgcolor: "var(--bg-page)", borderRadius: "var(--card-radius)", textAlign: "center", border: "1px solid var(--border-default)" }}>
                                                        <Typography variant="h5" sx={{ fontWeight: 900, color: stat.color, fontFamily: "var(--font-manrope)" }}>{stat.value}</Typography>
                                                        <Typography sx={{ fontWeight: 700, color: "var(--text-muted)", fontSize: "var(--size-caption)", fontFamily: "var(--font-manrope)" }}>{stat.label}</Typography>
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </CommonCard>
                            </Box>
                        </Grid>

                        {/* Overview Right: Role Specific Quick Actions/Status */}
                        <Grid item xs={12} md={4} size={{ xs: 12, sm: 6, md: 4 }}>
                            <CommonCard title="Role Status">
                                <Box sx={{ textAlign: "center", p: 2 }}>
                                    <Shield sx={{ fontSize: 64, color: userDetails.color, mb: 2 }} />
                                    <Typography sx={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "var(--size-subtitle)", fontFamily: "var(--font-manrope)" }}>
                                        {userDetails.role} Access
                                    </Typography>
                                    <Typography sx={{ mb: 4, color: "var(--text-secondary)", fontSize: "var(--size-body)", fontFamily: "var(--font-manrope)" }}>
                                        Full privileges to {userDetails.department.toLowerCase()} modules.
                                    </Typography>
                                    <Divider sx={{ mb: 4, bgcolor: "var(--border-default)" }} />
                                    <List sx={{ textAlign: "left" }}>
                                        {userDetails.recentActivity.slice(0, 2).map((act, i) => (
                                            <ListItem key={i} sx={{ px: 0 }}>
                                                <ListItemIcon sx={{ minWidth: 40, color: userDetails.color }}>
                                                    {i === 0 ? <Notifications fontSize="small" /> : <History fontSize="small" />}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={<Typography sx={{ fontSize: "var(--size-body)", fontWeight: 700, fontFamily: "var(--font-manrope)" }}>{act.event}</Typography>}
                                                    secondary={act.time}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </CommonCard>
                        </Grid>
                    </Grid>
                )}

                {/* Placeholder for other tabs - preserving structure but simplifying for demo */}
                {activeTab === 1 && (
                    <Grid container spacing={4}>
                        <Grid item xs={12} size={{ xs: 12, sm: 6, md: 8 }}>
                            <CommonCard title="Detailed Performance Metrics">
                                <Typography sx={{ p: 4, textAlign: 'center', color: 'var(--text-muted)' }}>
                                    Detailed analytical graphs and charts for {userDetails.department} would appear here.
                                </Typography>
                            </CommonCard>
                        </Grid>
                    </Grid>
                )}


                {activeTab === 2 && (
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={7} size={{ xs: 12, sm: 6, md: 7 }}>
                            <CommonCard title="Authentication Preferences">
                                <List>
                                    {[
                                        { title: "Universal Login", desc: "Enable single-sign on via corporate ID", icon: <Key />, status: "Active" },
                                        { title: "Two-Step Verification", desc: "Require a code sent to your primary device", icon: <Shield />, status: "Enabled" },
                                        { title: "Application Password", desc: "Set a dedicated password for API access", icon: <Lock />, status: "Not Set" },
                                    ].map((item, i) => (
                                        <ListItem key={i} sx={{ py: 3, borderBottom: i === 2 ? "none" : "1px solid var(--border-default)" }}>
                                            <ListItemIcon sx={{ color: "var(--brand-primary)" }}>{item.icon}</ListItemIcon>
                                            <ListItemText
                                                primary={<Typography sx={{ fontWeight: 800, fontFamily: "var(--font-manrope)" }}>{item.title}</Typography>}
                                                secondary={item.desc}
                                            />
                                            <Button size="small" variant="text" sx={{ fontWeight: 800, color: "var(--brand-primary)", fontFamily: "var(--font-manrope)" }}>Manage</Button>
                                        </ListItem>
                                    ))}
                                </List>
                            </CommonCard>
                        </Grid>
                        <Grid item xs={12} md={5} size={{ xs: 12, sm: 6, md: 5 }}>
                            <CommonCard title="Session Activity">
                                <List>
                                    {recentSessions.map((session, i) => (
                                        <ListItem key={i} sx={{ px: 1 }}>
                                            <ListItemIcon><Devices sx={{ color: session.status === "Active" ? "var(--success)" : "var(--text-muted)" }} /></ListItemIcon>
                                            <ListItemText
                                                primary={<Typography sx={{ fontWeight: 800, fontSize: "var(--size-body)", fontFamily: "var(--font-manrope)" }}>{session.device}</Typography>}
                                                secondary={`${session.location} • ${session.time}`}
                                            />
                                            <Chip
                                                label={session.status}
                                                size="small"
                                                sx={{
                                                    fontSize: "var(--size-caption)",
                                                    fontWeight: 900,
                                                    bgcolor: session.status === "Active" ? "var(--brand-soft)" : "var(--bg-page)",
                                                    color: session.status === "Active" ? "var(--brand-primary)" : "var(--text-muted)",
                                                    fontFamily: "var(--font-manrope)"
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </CommonCard>
                        </Grid>
                    </Grid>
                )}

                {activeTab === 3 && (
                    <CommonCard title="System-Wide Operation Logs">
                        <TableContainer sx={{ mt: 2 }}>
                            <Table>
                                <TableHead sx={{ bgcolor: "var(--bg-page)" }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 800, color: "var(--text-secondary)", fontFamily: "var(--font-manrope)" }}>Operation Event</TableCell>
                                        <TableCell sx={{ fontWeight: 800, color: "var(--text-secondary)", fontFamily: "var(--font-manrope)" }}>Module</TableCell>
                                        <TableCell sx={{ fontWeight: 800, color: "var(--text-secondary)", fontFamily: "var(--font-manrope)" }}>Timestamp</TableCell>
                                        <TableCell sx={{ fontWeight: 800, color: "var(--text-secondary)", fontFamily: "var(--font-manrope)" }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userDetails.recentActivity.map((row, i) => (
                                        <TableRow key={i} hover>
                                            <TableCell sx={{ fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-manrope)" }}>{row.event}</TableCell>
                                            <TableCell sx={{ fontWeight: 600, color: "var(--text-secondary)", fontFamily: "var(--font-manrope)" }}>{row.module}</TableCell>
                                            <TableCell sx={{ color: "var(--text-secondary)", fontFamily: "var(--font-manrope)" }}>{row.time}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={row.status}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 800,
                                                        fontSize: "var(--size-caption)",
                                                        bgcolor: row.status === "Rejected" || row.status === "Error" ? "var(--error)" : "var(--bg-page)",
                                                        color: row.status === "Rejected" || row.status === "Error" ? "white" : "var(--text-primary)",
                                                        fontFamily: "var(--font-manrope)"
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CommonCard>
                )}
            </Box>
        </Box>
    );
};

export default ProfilePage;
