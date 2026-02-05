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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import CommonCard from "../../../components/ui/CommonCard";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "../../../components/ui/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

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

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
        role: Yup.string().required("Role is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            role: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (editingUser) {
                    await axiosInstance.put(`/users/${editingUser.id}`, { ...editingUser, ...values });
                } else {
                    // Simple string ID generation for demo purposes
                    const newUser = {
                        ...values,
                        id: String(Date.now()),
                    };
                    await axiosInstance.post("/users", newUser);
                }
                fetchData();
                handleClose();
            } catch (error) {
                console.error("Error saving user:", error);
                alert("Failed to save user");
            }
        },
    });

    const handleOpen = (user = null) => {
        if (user) {
            setEditingUser(user);
            formik.setValues({
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
            });
        } else {
            setEditingUser(null);
            formik.resetForm();
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingUser(null);
        formik.resetForm();
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            try {
                await axiosInstance.delete(`/users/${id}`);
                fetchData();
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Failed to delete user");
            }
        }
    };

    if (loading) return <Loader fullPage message="Loading Users..." />;

    return (
        <Box>
            <CommonCard
                title="User Management"
                addText="Add New User"
                onAdd={() => handleOpen()}
            >
                <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0" }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#f8fafc" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, width: '80px' }}>Sr. No.</TableCell>
                                <TableCell sx={{ fontWeight: 600, pl: 4 }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={user.id} hover>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell sx={{ pl: 4 }}>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize' }}>{user.role}</TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                                            <IconButton onClick={() => handleOpen(user)} color="primary" size="small">
                                                <Edit fontSize="small" />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(user.id)} color="error" size="small">
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {users.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>No users found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CommonCard>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent dividers>
                        <TextField
                            margin="dense"
                            label="Name"
                            fullWidth
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            fullWidth
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            label="Password"
                            fullWidth
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            select
                            margin="dense"
                            label="Role"
                            fullWidth
                            name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            helperText={formik.touched.role && formik.errors.role}
                            sx={{ mb: 2 }}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role.id} value={role.name.toLowerCase()}>
                                    {role.name}
                                </MenuItem>
                            ))}
                            {/* Add Static Admin option if needed or ensure it comes from DB */}
                            {!roles.some(r => r.name.toLowerCase() === 'admin') && (
                                <MenuItem value="admin">Admin</MenuItem>
                            )}
                        </TextField>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={handleClose} variant="outlined" sx={{ textTransform: "none" }}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ backgroundColor: "#1172ba", textTransform: "none" }}
                        >
                            Save User
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
