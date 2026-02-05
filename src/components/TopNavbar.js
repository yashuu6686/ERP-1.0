"use client";
import React from "react";
import {
    Box,
    IconButton,
    Badge,
    Avatar,
    Typography,
    Divider,
    Menu,
    MenuItem,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsNoneOutlined from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Schedule from "@mui/icons-material/Schedule";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NotificationService from "@/services/NotificationService";

const TopNavbar = ({ onToggleSidebar }) => {
    const router = useRouter();
    const { user } = useAuth();
    const [notifications, setNotifications] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const fetchNotifications = React.useCallback(async () => {
        if (user) {
            console.log("TopNavbar: Fetching notifications for role:", user.role);
            const data = await NotificationService.getNotifications(user.role);
            console.log("TopNavbar: Received notifications count:", data.length);
            setNotifications(data);
        } else {
            console.log("TopNavbar: No user logged in, skipping notification fetch.");
        }
    }, [user]);

    React.useEffect(() => {
        fetchNotifications();
        // Poll for notifications every 10 seconds for better responsiveness
        const interval = setInterval(fetchNotifications, 10000);
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    const handleNotificationClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setAnchorEl(null);
    };

    const handleSelectNotification = async (notification) => {
        handleNotificationClose();
        fetchNotifications();

        const targetLink = notification.link || (notification.poId ? `/purchase/view-purchase?id=${notification.poId}` : null);

        if (targetLink) {
            router.push(targetLink);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0px 12px",
                bgcolor: "rgba(246, 248, 251, 0.85)",
                backdropFilter: "blur(10px)",
                position: "sticky",
                top: 0,
                zIndex: 1100,
                minHeight: "64px",
                // borderBottom: "1px solid #e2e8f0"
            }}
        >
            {/* Left Side: Menu Icon */}
            <IconButton
                size="medium"
                sx={{ color: "#94a3b8" }}
                onClick={onToggleSidebar}
            >
                <MenuIcon />
            </IconButton>

            {/* Right Side: Actions and Profile */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

                {/* Shopping Cart with circular background */}
                {/* <IconButton
                    size="small"
                    sx={{
                        bgcolor: "#f0f7ff",
                        color: "#1172ba",
                        padding: "10px",
                        "&:hover": { bgcolor: "#e0efff" }
                    }}
                >
                    <ShoppingCartOutlined fontSize="small" />
                </IconButton> */}

                {/* Notifications Bell */}
                <IconButton
                    size="small"
                    onClick={handleNotificationClick}
                    sx={{ color: "#1172ba", padding: "10px" }}
                >
                    <Badge
                        badgeContent={notifications.length}
                        color="error"
                        sx={{
                            "& .MuiBadge-badge": {
                                fontSize: "10px",
                                height: "16px",
                                minWidth: "16px",
                                border: "2px solid #fff"
                            }
                        }}
                    >
                        <NotificationsNoneOutlined fontSize="small" />
                    </Badge>
                </IconButton>

                {/* Notifications Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleNotificationClose}
                    PaperProps={{
                        sx: {
                            width: 320,
                            maxHeight: 400,
                            borderRadius: "12px",
                            mt: 1.5,
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="subtitle1" fontWeight={700}>Notifications</Typography>
                        {notifications.length > 0 && (
                            <Typography variant="caption" sx={{ color: "var(--brand-primary)", cursor: "pointer" }}>Mark all as read</Typography>
                        )}
                    </Box>
                    <Divider />
                    {notifications.length === 0 ? (
                        <Box sx={{ p: 4, textAlign: "center" }}>
                            <Typography color="textSecondary">No new notifications</Typography>
                        </Box>
                    ) : (
                        <List sx={{ p: 0 }}>
                            {notifications.map((n) => (
                                <MenuItem
                                    key={n.id}
                                    onClick={() => handleSelectNotification(n)}
                                    sx={{
                                        borderBottom: "1px solid #f1f5f9",
                                        "&:last-child": { borderBottom: 0 },
                                        whiteSpace: "normal",
                                        py: 1.5
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: "var(--brand-soft)", color: "var(--brand-primary)" }}>
                                            <Schedule fontSize="small" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={n.title}
                                        secondary={n.message}
                                        primaryTypographyProps={{ fontSize: "13.5px", fontWeight: 600, mb: 0.5 }}
                                        secondaryTypographyProps={{ fontSize: "12px" }}
                                    />
                                </MenuItem>
                            ))}
                        </List>
                    )}
                </Menu>

                <Divider orientation="vertical" flexItem sx={{ mx: 1, height: "24px", alignSelf: "center", borderColor: "#e2e8f0" }} />

                {/* User Profile Section */}
                <Box
                    onClick={() => router.push("/profile")}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        cursor: "pointer",
                        "&:hover": { opacity: 0.8 },
                    }}
                >
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "10px",
                            bgcolor: "#257cd3ff"
                        }}
                    >
                        {user?.name?.charAt(0) || "U"}
                    </Avatar>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Typography
                            sx={{
                                color: "#64748b",
                                fontSize: "14px",
                                fontFamily: "var(--font-manrope)",
                                fontWeight: 500
                            }}
                        >
                            Welcome,
                        </Typography>
                        <Typography
                            sx={{
                                color: "#1e293b",
                                fontSize: "14px",
                                fontFamily: "var(--font-manrope)",
                                fontWeight: 700
                            }}
                        >
                            {user?.name || "Member"}
                        </Typography>
                        <KeyboardArrowDown sx={{ color: "#1e293b", fontSize: "18px", ml: 0.5 }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default TopNavbar;

