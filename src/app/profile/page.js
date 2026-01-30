"use client";
import React, { useState } from "react";
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
} from "@mui/icons-material";
import CommonCard from "../../components/CommonCard";

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const userDetails = {
        name: "Jignesh Makvana",
        id: "EMP-2024-001",
        role: "System Administrator",
        rank: "Tier 5 Ops Lead",
        joinedDate: "14 Jan 2024",
        status: "Service Active",
        email: "jignesh.v@enterprise-erp.com",
        phone: "+91 98765 43210",
        location: "Mumbai HQ - Sector 7",
        department: "Quality & Process Control",
    };

    const recentSessions = [
        { device: "MacBook Pro - Chrome", location: "Mumbai, India", time: "Just now", status: "Active" },
        { device: "iPhone 15 Pro - App", location: "Pune, India", time: "2 hours ago", status: "Closed" },
        { device: "Windows Desktop - Edge", location: "Mumbai, India", time: "Yesterday", status: "Closed" },
    ];

    return (
        <Box sx={{ p: { xs: 1, md: 3 } }}>
            {/* 1. Profile Identity Header */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    mb: 4,
                    borderRadius: 4,
                    border: "1px solid #e2e8f0",
                    background: "linear-gradient(to right, #ffffff, #f8fafc)",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    <Grid item>
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                bgcolor: "#1172ba",
                                fontSize: "2.5rem",
                                fontWeight: 900,
                                border: "4px solid #fff",
                                boxShadow: "0 10px 20px -5px rgba(17, 114, 186, 0.3)",
                            }}
                        >
                            JM
                        </Avatar>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                            <Typography variant="h4" fontWeight={900} color="#1e293b">
                                {userDetails.name}
                            </Typography>
                            <Chip
                                label={userDetails.status}
                                size="small"
                                icon={<Verified sx={{ fontSize: "14px !important" }} />}
                                sx={{
                                    bgcolor: "#dcfce7",
                                    color: "#166534",
                                    fontWeight: 800,
                                    fontSize: "0.75rem",
                                    border: "none"
                                }}
                            />
                        </Box>
                        <Typography variant="body1" sx={{ color: "#64748b", fontWeight: 600, mb: 2 }}>
                            {userDetails.role} • {userDetails.department}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Badge sx={{ color: "#94a3b8", fontSize: 18 }} />
                                <Typography variant="caption" sx={{ color: "#475569", fontWeight: 700 }}>ID: {userDetails.id}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Business sx={{ color: "#94a3b8", fontSize: 18 }} />
                                <Typography variant="caption" sx={{ color: "#475569", fontWeight: 700 }}>Rank: {userDetails.rank}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Language sx={{ color: "#94a3b8", fontSize: 18 }} />
                                <Typography variant="caption" sx={{ color: "#475569", fontWeight: 700 }}>Joined: {userDetails.joinedDate}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            startIcon={<Edit />}
                            sx={{
                                bgcolor: "#1172ba",
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                                textTransform: "none",
                                fontWeight: 700,
                                "&:hover": { bgcolor: "#0d5a94" }
                            }}
                        >
                            Update Profile
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* 2. Unified Interface Selection */}
            <Box sx={{ mb: 4, borderBottom: "1px solid #e2e8f0" }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    sx={{
                        "& .MuiTab-root": {
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            minWidth: 120,
                            color: "#94a3b8",
                        },
                        "& .Mui-selected": { color: "#1172ba !important" },
                        "& .MuiTabs-indicator": { height: 3, borderRadius: "3px 3px 0 0", bgcolor: "#1172ba" }
                    }}
                >
                    <Tab icon={<Person sx={{ fontSize: 20 }} />} iconPosition="start" label="Overview" />
                    <Tab icon={<Security sx={{ fontSize: 20 }} />} iconPosition="start" label="Access & Security" />
                    <Tab icon={<History sx={{ fontSize: 20 }} />} iconPosition="start" label="Audit Logs" />
                    <Tab icon={<Settings sx={{ fontSize: 20 }} />} iconPosition="start" label="Global Settings" />
                </Tabs>
            </Box>

            {/* 3. Dynamic Section Content */}
            <Box sx={{ mt: 4 }}>
                {activeTab === 0 && (
                    <Grid container spacing={4}>
                        {/* Overview Left: Personal Data */}
                        <Grid item xs={12} md={8}>
                            <CommonCard title="Core Personal Information">
                                <Grid container spacing={4} sx={{ p: 1 }}>
                                    {[
                                        { label: "Full Official Name", value: userDetails.name, icon: <Person /> },
                                        { label: "Designated Email", value: userDetails.email, icon: <Email /> },
                                        { label: "Primary Phone", value: userDetails.phone, icon: <Phone /> },
                                        { label: "Job Description", value: userDetails.role, icon: <Badge /> },
                                        { label: "Assigned Department", value: userDetails.department, icon: <Business /> },
                                        { label: "Primary Worksite", value: userDetails.location, icon: <LocationOn /> }
                                    ].map((field, i) => (
                                        <Grid item xs={12} sm={6} key={i}>
                                            <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
                                                {field.label}
                                            </Typography>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1 }}>
                                                <Box sx={{ color: "#1172ba", display: "flex" }}>
                                                    {React.cloneElement(field.icon, { fontSize: "small" })}
                                                </Box>
                                                <Typography variant="body1" sx={{ fontWeight: 700, color: "#1e293b" }}>
                                                    {field.value}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CommonCard>

                            <Box sx={{ mt: 4 }}>
                                <CommonCard title="Operational Performance Summary">
                                    <Box sx={{ p: 1 }}>
                                        <Typography variant="body2" color="#64748b" sx={{ mb: 3 }}>
                                            Summary of system engagements and quality performance metrics for the current fiscal cycle.
                                        </Typography>
                                        <Grid container spacing={3}>
                                            {[
                                                { label: "QC Clearances", value: "482", color: "#10b981" },
                                                { label: "Pending Approvals", value: "12", color: "#f59e0b" },
                                                { label: "SOP Submissions", value: "84", color: "#6366f1" },
                                                { label: "Critical Incidents", value: "0", color: "#ef4444" },
                                            ].map((stat, i) => (
                                                <Grid item xs={6} sm={3} key={i}>
                                                    <Box sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 3, textAlign: "center", border: "1px solid #f1f5f9" }}>
                                                        <Typography variant="h5" fontWeight={900} color={stat.color}>{stat.value}</Typography>
                                                        <Typography variant="caption" fontWeight={700} color="#64748b">{stat.label}</Typography>
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </CommonCard>
                            </Box>
                        </Grid>

                        {/* Overview Right: Actionable Security Box */}
                        <Grid item xs={12} md={4}>
                            <CommonCard title="Access Status">
                                <Box sx={{ textAlign: "center", p: 2 }}>
                                    <Shield sx={{ fontSize: 64, color: "#10b981", mb: 2 }} />
                                    <Typography variant="h6" fontWeight={800} color="#1e293b">Account Secured</Typography>
                                    <Typography variant="body2" color="#64748b" sx={{ mb: 4 }}>
                                        Your enterprise identity is protected with Multi-Factor Authentication.
                                    </Typography>
                                    <Divider sx={{ mb: 4, borderStyle: "dashed" }} />
                                    <List sx={{ textAlign: "left" }}>
                                        <ListItem sx={{ px: 0 }}>
                                            <ListItemIcon sx={{ minWidth: 40, color: "#10b981" }}><Lock fontSize="small" /></ListItemIcon>
                                            <ListItemText primary={<Typography sx={{ fontSize: "0.875rem", fontWeight: 700 }}>Encryption: AES-256</Typography>} />
                                        </ListItem>
                                        <ListItem sx={{ px: 0 }}>
                                            <ListItemIcon sx={{ minWidth: 40, color: "#10b981" }}><Notifications fontSize="small" /></ListItemIcon>
                                            <ListItemText primary={<Typography sx={{ fontSize: "0.875rem", fontWeight: 700 }}>Alerts: Real-time Active</Typography>} />
                                        </ListItem>
                                    </List>
                                </Box>
                            </CommonCard>
                        </Grid>
                    </Grid>
                )}

                {activeTab === 1 && (
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={7}>
                            <CommonCard title="Authentication Preferences">
                                <List>
                                    {[
                                        { title: "Universal Login", desc: "Enable single-sign on via corporate ID", icon: <Key />, status: "Active" },
                                        { title: "Two-Step Verification", desc: "Require a code sent to your primary device", icon: <Shield />, status: "Enabled" },
                                        { title: "Application Password", desc: "Set a dedicated password for API access", icon: <Lock />, status: "Not Set" },
                                    ].map((item, i) => (
                                        <ListItem key={i} sx={{ py: 3, borderBottom: i === 2 ? "none" : "1px solid #f1f5f9" }}>
                                            <ListItemIcon sx={{ color: "#1172ba" }}>{item.icon}</ListItemIcon>
                                            <ListItemText
                                                primary={<Typography fontWeight={800}>{item.title}</Typography>}
                                                secondary={item.desc}
                                            />
                                            <Button size="small" variant="text" sx={{ fontWeight: 800 }}>Manage</Button>
                                        </ListItem>
                                    ))}
                                </List>
                            </CommonCard>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <CommonCard title="Session Activity">
                                <Typography variant="caption" color="#64748b" sx={{ px: 1, mb: 2, display: "block" }}>
                                    Monitor all active terminals where your account is authorized.
                                </Typography>
                                <List>
                                    {recentSessions.map((session, i) => (
                                        <ListItem key={i} sx={{ px: 1 }}>
                                            <ListItemIcon><Devices sx={{ color: session.status === "Active" ? "#10b981" : "#94a3b8" }} /></ListItemIcon>
                                            <ListItemText
                                                primary={<Typography variant="body2" fontWeight={800}>{session.device}</Typography>}
                                                secondary={`${session.location} • ${session.time}`}
                                            />
                                            <Chip label={session.status} size="small" variant="soft" sx={{ fontSize: "0.65rem", fontWeight: 900 }} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CommonCard>
                        </Grid>
                    </Grid>
                )}

                {activeTab === 2 && (
                    <CommonCard title="System-Wide Operation Logs">
                        <TableContainer sx={{ mt: 2 }}>
                            <Table>
                                <TableHead sx={{ bgcolor: "#F8FAFC" }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 800, color: "#475569" }}>Operation Event</TableCell>
                                        <TableCell sx={{ fontWeight: 800, color: "#475569" }}>Module</TableCell>
                                        <TableCell sx={{ fontWeight: 800, color: "#475569" }}>Terminal IP</TableCell>
                                        <TableCell sx={{ fontWeight: 800, color: "#475569" }}>Timestamp</TableCell>
                                        <TableCell sx={{ fontWeight: 800, color: "#475569" }}>Trace Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[
                                        { event: "Create Final Inspection", module: "Quality", ip: "192.168.1.104", time: "12m ago", status: "Verified" },
                                        { event: "Update BOM Master", module: "Production", ip: "192.168.1.104", time: "2h ago", status: "Verified" },
                                        { event: "Authorize Batch Release", module: "Logistics", ip: "192.168.5.21", time: "5h ago", status: "Verified" },
                                        { event: "System Pref Change", module: "Admin", ip: "10.0.0.42", time: "1d ago", status: "Success" },
                                    ].map((row, i) => (
                                        <TableRow key={i} hover>
                                            <TableCell sx={{ fontWeight: 700, color: "#1e293b" }}>{row.event}</TableCell>
                                            <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>{row.module}</TableCell>
                                            <TableCell sx={{ fontFamily: "monospace", color: "#1172ba" }}>{row.ip}</TableCell>
                                            <TableCell sx={{ color: "#64748b" }}>{row.time}</TableCell>
                                            <TableCell><Chip label={row.status} size="small" sx={{ fontWeight: 800, fontSize: "0.7rem", bgcolor: "#f1f5f9" }} /></TableCell>
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
