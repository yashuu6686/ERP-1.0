"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import CommonCard from "../../../components/ui/CommonCard";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "../../../components/ui/Loader";
import { useRouter } from "next/navigation";
import { Tooltip, Chip } from "@mui/material";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [usersRes, rolesRes] = await Promise.all([
                axiosInstance.get("/users"),
                axiosInstance.get("/roles")
            ]);
            setUsers(usersRes.data);
            setRoles(rolesRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            try {
                await axiosInstance.delete(`/users/${id}`);
                fetchData();
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Failed to delete user");
            }
        }
    };

    const getRoleName = (roleId) => {
        const role = roles.find(r => r.id === roleId);
        return role ? role.name : roleId || 'N/A';
    };

    if (loading) return <Loader fullPage message="Loading Users..." />;

    return (
        <Box>
            <CommonCard
                title="User Management"
                addText="Create New User"
                onAdd={() => router.push("/settings/users/add")}
            >
                <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid var(--border-default)", borderRadius: '12px', overflow: 'hidden' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#f8fafc" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, width: '80px', color: '#64748b' }}>Sr. No.</TableCell>
                                <TableCell sx={{ fontWeight: 700, pl: 4, color: '#64748b' }}>Full Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Email & Account</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Primary Role</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Effective Scope</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700, pr: 4, color: '#64748b' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => {
                                const userRole = roles.find(r => r.id === user.roleId);
                                const rolePerms = userRole?.permissions || {};
                                const additionalPerms = user.additionalPermissions || {};

                                // Merge them to count unique modules
                                const allModules = new Set([
                                    ...Object.keys(rolePerms),
                                    ...Object.keys(additionalPerms)
                                ]);

                                return (
                                    <TableRow key={user.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell sx={{ pl: 4 }}>
                                            <Typography sx={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                                                {user.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                                                {user.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={(user.roleName || 'N/A').toUpperCase()}
                                                size="small"
                                                sx={{
                                                    fontWeight: 800, fontSize: '10px',
                                                    bgcolor: 'var(--brand-soft)', color: 'var(--brand-primary)',
                                                    borderRadius: '6px'
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                                                {allModules.size} Active Modules
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box sx={{
                                                    width: 8, height: 8, borderRadius: '50%',
                                                    bgcolor: user.status === 'active' ? 'var(--success)' : 'var(--text-muted)'
                                                }} />
                                                <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'capitalize' }}>
                                                    {user.status || 'inactive'}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right" sx={{ pr: 3 }}>
                                            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                                                <Tooltip title="Edit User">
                                                    <IconButton
                                                        onClick={() => router.push(`/settings/users/edit/${user.id}`)}
                                                        sx={{ color: "var(--brand-primary)", bgcolor: 'var(--brand-soft)', '&:hover': { bgcolor: '#dbeafe' } }}
                                                        size="small"
                                                    >
                                                        <Edit fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete User">
                                                    <IconButton
                                                        onClick={() => handleDelete(user.id)}
                                                        sx={{ color: "var(--error)", bgcolor: '#fef2f2', '&:hover': { bgcolor: '#fee2e2' } }}
                                                        size="small"
                                                    >
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {users.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 10 }}>
                                        <Typography variant="body2" color="text.secondary">No users found in the directory.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CommonCard>
        </Box>
    );
}
