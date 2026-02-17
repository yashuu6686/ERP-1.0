"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Save from "@mui/icons-material/Save";
import Delete from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { APP_MENU } from "@/config/menuConfig";
import { useFormik } from "formik";
import * as Yup from "yup";
import CommonCard from "@/components/ui/CommonCard";
import axiosInstance from "@/axios/axiosInstance";
import {
    Grid,
    MenuItem,
    Select,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    FormControlLabel,
    Tooltip,
    Divider,
    Chip
} from "@mui/material";

const PRIVILEGES = [
    { label: "View", key: "view" },
    { label: "Create", key: "create" },
    { label: "Edit", key: "edit" }
];

export default function UserForm({ initialValues, onSubmit, loadingText, buttonText }) {
    const router = useRouter();
    const [selectedFlow, setSelectedFlow] = useState("");
    const [tempSelections, setTempSelections] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axiosInstance.get("/roles");
                setRoles(response.data);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };
        fetchRoles();
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required("Full Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required").min(6, "Min 6 characters"),
        roleId: Yup.string().required("Role is required"),
        roleName: Yup.string().required("Role Name is required"),
        additionalPermissions: Yup.object()
    });

    const formik = useFormik({
        initialValues: initialValues || {
            name: "",
            email: "",
            password: "",
            roleId: "",
            roleName: "",
            additionalPermissions: {},
            status: "active"
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: onSubmit,
    });

    const selectedRole = roles.find(r => r.id === formik.values.roleId);
    const rolePermissions = selectedRole?.permissions || {};

    const handleRoleChange = (e) => {
        const rId = e.target.value;
        const r = roles.find(item => item.id === rId);
        formik.setFieldValue("roleId", rId);
        formik.setFieldValue("roleName", r ? r.name : "");
        setSelectedFlow("");
        setTempSelections([]);
    };

    const getAvailableFeatures = () => {
        if (!selectedFlow) return [];
        const flow = APP_MENU.find(f => (f.name || f.text) === selectedFlow);
        if (!flow) return [];

        const features = [];
        const flowNodes = flow.items || [flow];
        flowNodes.forEach(menuItem => {
            PRIVILEGES.forEach(p => {
                if (menuItem.key === 'dashboard' && p.key !== 'view') return;

                // CRITICAL: Check if this permission is ALREADY in the role
                const isInRole = rolePermissions[menuItem.key]?.[p.key];
                const isAdditional = formik.values.additionalPermissions[menuItem.key]?.[p.key];

                if (!isInRole && !isAdditional) {
                    features.push({
                        moduleKey: menuItem.key,
                        moduleName: menuItem.text,
                        privilegeKey: p.key,
                        privilegeLabel: p.label,
                        flowName: flow.name,
                        icon: menuItem.icon
                    });
                }
            });
        });
        return features;
    };

    const handleTempToggle = (feature) => {
        const identifier = `${feature.moduleKey}:${feature.privilegeKey}`;
        if (tempSelections.includes(identifier)) {
            setTempSelections(tempSelections.filter(id => id !== identifier));
        } else {
            setTempSelections([...tempSelections, identifier]);
        }
    };

    const handleAssign = () => {
        const newPermissions = { ...formik.values.additionalPermissions };
        tempSelections.forEach(selection => {
            const [mKey, pKey] = selection.split(':');
            if (!newPermissions[mKey]) newPermissions[mKey] = {};
            newPermissions[mKey][pKey] = true;

            // AUTO-VIEW LOGIC: If 'create' or 'edit' is assigned as override, 'view' must be assigned too
            if (pKey === 'create' || pKey === 'edit') {
                newPermissions[mKey]['view'] = true;
            }
        });
        formik.setFieldValue("additionalPermissions", newPermissions);
        setTempSelections([]);
    };

    const handleRemove = (moduleKey, privilegeKey) => {
        const newPermissions = { ...formik.values.additionalPermissions };
        if (newPermissions[moduleKey]) {
            delete newPermissions[moduleKey][privilegeKey];

            // AUTO-CLEANUP LOGIC: If 'view' is removed from overrides, 'create' and 'edit' overrides must also be removed
            if (privilegeKey === 'view') {
                delete newPermissions[moduleKey]['create'];
                delete newPermissions[moduleKey]['edit'];
            }

            if (Object.keys(newPermissions[moduleKey]).length === 0) {
                delete newPermissions[moduleKey];
            }
        }
        formik.setFieldValue("additionalPermissions", newPermissions);
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            const available = getAvailableFeatures();
            setTempSelections(available.map(f => `${f.moduleKey}:${f.privilegeKey}`));
        } else {
            setTempSelections([]);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <CommonCard title="User Basic Information">
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--text-secondary)', mb: 1, display: 'block' }}>
                            FULL NAME <span style={{ color: 'var(--error)' }}>*</span>
                        </Typography>
                        <TextField
                            fullWidth size="small" name="name"
                            value={formik.values.name} onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: 'var(--bg-page)' } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--text-secondary)', mb: 1, display: 'block' }}>
                            EMAIL ADDRESS <span style={{ color: 'var(--error)' }}>*</span>
                        </Typography>
                        <TextField
                            fullWidth size="small" name="email"
                            value={formik.values.email} onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: 'var(--bg-page)' } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--text-secondary)', mb: 1, display: 'block' }}>
                            PASSWORD <span style={{ color: 'var(--error)' }}>*</span>
                        </Typography>
                        <TextField
                            fullWidth size="small" name="password" type="password"
                            value={formik.values.password} onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: 'var(--bg-page)' } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--text-secondary)', mb: 1, display: 'block' }}>
                            ASSIGNED ROLE <span style={{ color: 'var(--error)' }}>*</span>
                        </Typography>
                        <TextField
                            select fullWidth size="small" name="roleId"
                            value={formik.values.roleId} onChange={handleRoleChange}
                            error={formik.touched.roleId && Boolean(formik.errors.roleId)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: 'var(--bg-page)' } }}
                        >
                            {roles.map((r) => (
                                <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--text-secondary)', mb: 1, display: 'block' }}>
                            USER STATUS
                        </Typography>
                        <Box sx={{
                            px: 1.5, height: '40px', borderRadius: '10px', border: '1px solid var(--border-default)',
                            bgcolor: 'var(--bg-page)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                        }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '13px' }}>Active</Typography>
                            <Checkbox
                                size="small" checked={formik.values.status === "active"}
                                onChange={(e) => formik.setFieldValue("status", e.target.checked ? "active" : "inactive")}
                                sx={{ color: 'var(--brand-primary)', p: 0 }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button variant="outlined" onClick={() => router.push("/settings/users")} sx={{ textTransform: 'none', borderRadius: '8px' }}>Cancel</Button>
                    <Button type="submit" variant="contained" startIcon={<Save />} sx={{ textTransform: 'none', borderRadius: '8px', bgcolor: 'var(--brand-primary)' }}>
                        {loadingText || buttonText}
                    </Button>
                </Box>
            </CommonCard>

            <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

            <Grid container spacing={4}>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ borderRadius: '12px', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
                        <Box sx={{ p: 2, bgcolor: '#f8fafc', display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography sx={{ fontWeight: 800, fontSize: '0.8125rem' }}>ADD ADDITIONAL PERMISSIONS</Typography>
                            <FormControl size="small" sx={{ minWidth: 180, ml: 'auto' }}>
                                <Select
                                    value={selectedFlow}
                                    onChange={(e) => { setSelectedFlow(e.target.value); setTempSelections([]); }}
                                    displayEmpty sx={{ borderRadius: '8px', bgcolor: '#fff', fontSize: '0.8125rem' }}
                                    disabled={!formik.values.roleId}
                                >
                                    <MenuItem value="" disabled>-- Select Module --</MenuItem>
                                    {APP_MENU.map(f => <MenuItem key={f.name || f.text} value={f.name || f.text}>{f.name || f.text}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Box>
                        <TableContainer sx={{ height: 350 }}>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700, width: 40 }}>Select</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Feature</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getAvailableFeatures().map((f) => {
                                        const id = `${f.moduleKey}:${f.privilegeKey}`;
                                        const isSel = tempSelections.includes(id);
                                        return (
                                            <TableRow key={id} hover sx={{ cursor: 'pointer', bgcolor: isSel ? 'var(--brand-soft)' : 'transparent' }} onClick={() => handleTempToggle(f)}>
                                                <TableCell><Checkbox size="small" checked={isSel} /></TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Box sx={{ color: isSel ? 'var(--brand-primary)' : 'inherit' }}>{React.cloneElement(f.icon, { sx: { fontSize: 16 } })}</Box>
                                                        <Box>
                                                            <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>{f.moduleName}</Typography>
                                                            <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>Permission: {f.privilegeLabel}</Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {selectedFlow && getAvailableFeatures().length === 0 && (
                                        <TableRow><TableCell colSpan={2} align="center" sx={{ py: 10, color: 'text.disabled' }}>All available permissions for this flow are already assigned via the Role.</TableCell></TableRow>
                                    )}
                                    {!selectedFlow && (
                                        <TableRow><TableCell colSpan={2} align="center" sx={{ py: 10, color: 'text.disabled' }}>Select a flow to view unique permissions</TableCell></TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{ p: 1.5, bgcolor: '#f8fafc', borderTop: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between' }}>
                            <FormControlLabel control={<Checkbox size="small" onChange={(e) => handleSelectAll(e.target.checked)} />} label={<Typography sx={{ fontSize: '12px', fontWeight: 700 }}>Select All</Typography>} />
                            <Button size="small" variant="contained" onClick={handleAssign} disabled={tempSelections.length === 0} sx={{ borderRadius: '8px', textTransform: 'none' }}>Add Override</Button>
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ borderRadius: '12px', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
                        <Box sx={{ p: 2, bgcolor: '#f8fafc', display: 'flex', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontWeight: 800, fontSize: '0.8125rem' }}>USER-SPECIFIC OVERRIDES</Typography>
                            <Typography sx={{ fontSize: '10px', bgcolor: 'var(--brand-primary)', color: '#fff', px: 1, borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                                {Object.values(formik.values.additionalPermissions).reduce((acc, curr) => acc + Object.keys(curr).length, 0)} OVERRIDES
                            </Typography>
                        </Box>
                        <TableContainer sx={{ height: 410 }}>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700 }}>Flow / Module</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                                        <TableCell sx={{ width: 40 }}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(formik.values.additionalPermissions).length > 0 ? Object.keys(formik.values.additionalPermissions).map(mKey => {
                                        const privs = formik.values.additionalPermissions[mKey];
                                        let menuItem = null; let flow = null;
                                        for (const f of APP_MENU) {
                                            const item = f.items?.find(i => i.key === mKey) || (f.key === mKey ? f : null);
                                            if (item) { menuItem = item; flow = f; break; }
                                        }
                                        return Object.keys(privs).map(pKey => {
                                            const label = PRIVILEGES.find(pr => pr.key === pKey)?.label || pKey;
                                            return (
                                                <TableRow key={`${mKey}:${pKey}`} hover>
                                                    <TableCell>
                                                        <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>{flow?.name}</Typography>
                                                        <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>{menuItem?.text || mKey}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography component="span" sx={{ fontSize: '10px', fontWeight: 800, border: '1px solid #e2e8f0', px: 0.8, py: 0.2, borderRadius: '4px' }}>
                                                            {label.toUpperCase()}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton size="small" color="error" onClick={() => handleRemove(mKey, pKey)} sx={{ bgcolor: '#fef2f2', '&:hover': { bgcolor: '#fee2e2' } }}>
                                                            <Delete sx={{ fontSize: 14 }} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        });
                                    }) : (
                                        <TableRow><TableCell colSpan={3} align="center" sx={{ py: 15, color: 'text.disabled' }}>No specific overrides added for this user.</TableCell></TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </form>
    );
}
