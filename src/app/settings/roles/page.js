"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
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
import { Tooltip, Typography } from "@mui/material";

export default function RoleManagement() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/roles");
            setRoles(response.data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this role? This might affect users assigned to this role.")) {
            try {
                await axiosInstance.delete(`/roles/${id}`);
                fetchRoles();
            } catch (error) {
                console.error("Error deleting role:", error);
                alert("Failed to delete role");
            }
        }
    };

    if (loading) return <Loader fullPage message="Loading Roles..." />;

    return (
        <Box>
            <CommonCard
                title="Role Management"
                onAdd={() => router.push("/settings/roles/add")}
                addText="Create New Role"
            >
                <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: '12px', overflow: 'hidden' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#f8fafc" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, width: '80px', color: '#64748b' }}>Sr. No.</TableCell>
                                <TableCell sx={{ fontWeight: 700, pl: 4, color: '#64748b' }}>Role Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Description</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Permissions</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700, pr: 4, color: '#64748b' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roles.map((role, index) => (
                                <TableRow key={role.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell sx={{ pl: 4 }}>
                                        <Typography sx={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                                            {role.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {role.description || <span style={{ opacity: 0.5 }}>No description provided</span>}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography component="span" sx={{
                                                fontSize: '11px',
                                                bgcolor: 'var(--brand-soft)',
                                                color: 'var(--brand-primary)',
                                                px: 1.5,
                                                py: 0.25,
                                                borderRadius: '10px',
                                                fontWeight: 700
                                            }}>
                                                {(() => {
                                                    const perms = role.permissions || {};
                                                    if (Array.isArray(perms)) {
                                                        const modules = new Set(perms.map(p => p.split(':')[0]));
                                                        return modules.size;
                                                    }
                                                    return Object.keys(perms).length;
                                                })()} Modules
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right" sx={{ pr: 3 }}>
                                        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                                            <Tooltip title="Edit Role">
                                                <IconButton
                                                    onClick={() => router.push(`/settings/roles/edit/${role.id}`)}
                                                    sx={{
                                                        color: "var(--brand-primary)",
                                                        bgcolor: 'var(--brand-soft)',
                                                        '&:hover': { bgcolor: '#dbeafe' }
                                                    }}
                                                    size="small"
                                                >
                                                    <Edit fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete Role">
                                                <IconButton
                                                    onClick={() => handleDelete(role.id)}
                                                    sx={{
                                                        color: "#ef4444",
                                                        bgcolor: '#fef2f2',
                                                        '&:hover': { bgcolor: '#fee2e2' }
                                                    }}
                                                    size="small"
                                                >
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {roles.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                                        <Typography variant="body2" color="text.secondary">No roles found. Create one to get started.</Typography>
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
