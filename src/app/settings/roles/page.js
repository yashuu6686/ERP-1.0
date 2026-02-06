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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import CommonCard from "../../../components/ui/CommonCard";
import axiosInstance from "@/axios/axiosInstance";
import { MENU_ITEMS } from "@/config/menuConfig";
import Loader from "../../../components/ui/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";

const FLOWS = [
    {
        name: "Purchase Flow",
        items: ["purchase", "grn", "incoming_inspection", "store"],
        color: "var(--brand-primary)"
    },
    {
        name: "Production Flow",
        items: ["bom", "material_issue", "production_inspection", "batch"],
        color: "var(--viz-2)"
    },
    {
        name: "Sales Flow",
        items: ["orders", "invoices", "final_inspection", "dispatch"],
        color: "var(--viz-3)"
    },
    {
        name: "General & Settings",
        items: ["dashboard", "sop", "rejected_goods", "role_management", "user_management"],
        color: "var(--viz-5)"
    }
];

export default function RoleManagement() {

    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editingRole, setEditingRole] = useState(null);

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

    const validationSchema = Yup.object({
        name: Yup.string().required("Role Name is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            permissions: [],
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (editingRole) {
                    await axiosInstance.put(`/roles/${editingRole.id}`, { ...editingRole, ...values });
                } else {
                    const newRole = {
                        ...values,
                        id: values.name.toLowerCase().replace(/\s+/g, '_')
                    };
                    await axiosInstance.post("/roles", newRole);
                }
                fetchRoles();
                handleClose();
            } catch (error) {
                console.error("Error saving role:", error);
                alert("Failed to save role");
            }
        },
    });

    const handleOpen = (role = null) => {
        if (role) {
            setEditingRole(role);
            formik.setValues({
                name: role.name || "",
                permissions: Array.isArray(role.permissions) ? role.permissions : [],
            });
        } else {
            setEditingRole(null);
            formik.resetForm();
            formik.setFieldValue("permissions", []);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingRole(null);
        formik.resetForm();
    };

    const handlePermissionChange = (key) => {
        const currentPermissions = formik.values.permissions;
        const newPermissions = currentPermissions.includes(key)
            ? currentPermissions.filter((p) => p !== key)
            : [...currentPermissions, key];
        formik.setFieldValue("permissions", newPermissions);
    };

    const handleFlowSelectAll = (flowItems, checked) => {
        const currentPermissions = formik.values.permissions || [];
        let newPermissions;
        if (checked) {
            newPermissions = Array.from(new Set([...currentPermissions, ...flowItems]));
        } else {
            newPermissions = currentPermissions.filter(p => !flowItems.includes(p));
        }
        formik.setFieldValue("permissions", newPermissions);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            formik.setFieldValue("permissions", MENU_ITEMS.map((item) => item.key));
        } else {
            formik.setFieldValue("permissions", []);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this role?")) {
            try {
                await axiosInstance.delete(`/roles/${id}`);
                fetchRoles();
            } catch (error) {
                console.error("Error deleting role:", error);
            }
        }
    };

    if (loading) return <Loader fullPage message="Loading Roles..." />;

    return (
        <Box>
            <CommonCard
                title="Role Management"
                onAdd={() => handleOpen()}
                addText="Add New Role"
            >
                <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0" }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#f8fafc" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, width: '80px' }}>Sr. No.</TableCell>
                                <TableCell sx={{ fontWeight: 600, pl: 4 }}>Role Name</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Permissions Count</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roles.map((role, index) => (
                                <TableRow key={role.id} hover>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell sx={{ pl: 4 }}>{role.name}</TableCell>
                                    <TableCell>{role.permissions?.length || 0} Modules</TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                                            <IconButton onClick={() => handleOpen(role)} color="primary" size="small">
                                                <Edit fontSize="small" />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(role.id)} color="error" size="small">
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {roles.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} align="center" sx={{ py: 3 }}>No roles found. Create one to get started.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CommonCard>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{editingRole ? "Edit Role" : "Add New Role"}</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent dividers>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Role Name"
                            fullWidth
                            variant="outlined"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            sx={{ mb: 3 }}
                        />

                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                            Permissions
                        </Typography>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.permissions && formik.values.permissions.length === MENU_ITEMS.length}
                                    indeterminate={
                                        formik.values.permissions &&
                                        formik.values.permissions.length > 0 &&
                                        formik.values.permissions.length < MENU_ITEMS.length
                                    }
                                    onChange={handleSelectAll}
                                />
                            }
                            label="Select All"
                            sx={{ mb: 1, borderBottom: '1px solid #eee', width: '100%', pb: 1 }}
                        />

                        {FLOWS.map((flow) => (
                            <Box key={flow.name} sx={{
                                mb: 3,
                                borderRadius: '12px',
                                border: '1px solid var(--border-default)',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                    borderColor: flow.color
                                }
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    bgcolor: '#f8fafc',
                                    p: '10px 20px',
                                    borderBottom: '1px solid var(--border-default)',
                                    borderLeft: `4px solid ${flow.color}`
                                }}>
                                    <Typography variant="subtitle2" sx={{
                                        fontWeight: 700,
                                        color: 'var(--text-primary)',
                                        fontFamily: 'var(--font-manrope)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}>
                                        {flow.name}
                                        <Typography component="span" sx={{
                                            fontSize: '10px',
                                            bgcolor: 'var(--brand-soft)',
                                            color: flow.color,
                                            px: 1,
                                            borderRadius: '10px',
                                            fontWeight: 800,
                                            textTransform: 'uppercase'
                                        }}>
                                            {flow.items.length} Modules
                                        </Typography>
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                size="small"
                                                sx={{ color: flow.color, '&.Mui-checked': { color: flow.color } }}
                                                checked={flow.items.every(itemKey => formik.values.permissions?.includes(itemKey))}
                                                indeterminate={
                                                    flow.items.some(itemKey => formik.values.permissions?.includes(itemKey)) &&
                                                    !flow.items.every(itemKey => formik.values.permissions?.includes(itemKey))
                                                }
                                                onChange={(e) => handleFlowSelectAll(flow.items, e.target.checked)}
                                            />
                                        }
                                        label={<Typography variant="caption" sx={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Select All</Typography>}
                                        sx={{ mr: 0 }}
                                    />
                                </Box>
                                <Box sx={{ p: 2, bgcolor: '#ffffff' }}>
                                    <FormGroup row>
                                        {flow.items.map((itemKey) => {
                                            const item = MENU_ITEMS.find(m => m.key === itemKey);
                                            if (!item) return null;
                                            const isChecked = formik.values.permissions?.includes(item.key);
                                            return (
                                                <Box key={item.key} sx={{
                                                    width: "33.33%",
                                                    p: '4px 8px',
                                                }}>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        p: '4px 8px',
                                                        borderRadius: '8px',
                                                        transition: 'background 0.2s',
                                                        bgcolor: isChecked ? 'var(--brand-soft)' : 'transparent',
                                                        '&:hover': {
                                                            bgcolor: isChecked ? 'var(--brand-soft)' : '#f9fafb',
                                                        }
                                                    }}>
                                                        <Checkbox
                                                            size="small"
                                                            checked={isChecked}
                                                            onChange={() => handlePermissionChange(item.key)}
                                                            sx={{
                                                                p: 0.5,
                                                                color: 'var(--border-strong)',
                                                                '&.Mui-checked': { color: 'var(--brand-primary)' }
                                                            }}
                                                        />
                                                        <Box sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 1.5,
                                                            ml: 1,
                                                            cursor: 'pointer'
                                                        }} onClick={() => handlePermissionChange(item.key)}>
                                                            <Box sx={{
                                                                color: isChecked ? 'var(--brand-primary)' : 'var(--text-muted)',
                                                                display: 'flex',
                                                                transition: 'color 0.2s'
                                                            }}>
                                                                {React.cloneElement(item.icon, { sx: { fontSize: 18 } })}
                                                            </Box>
                                                            <Typography sx={{
                                                                fontSize: '0.8125rem',
                                                                fontWeight: isChecked ? 600 : 500,
                                                                color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)',
                                                                transition: 'color 0.2s',
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis'
                                                            }}>
                                                                {item.text}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            )
                                        })}
                                    </FormGroup>
                                </Box>
                            </Box>
                        ))}
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
                            Save Role
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
