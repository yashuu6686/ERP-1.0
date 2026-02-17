"use client";
import React, { useState } from "react";
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
    Tooltip
} from "@mui/material";

const PRIVILEGES = [
    { label: "View", key: "view" },
    { label: "Create", key: "create" },
    { label: "Edit", key: "edit" }
];

export default function RoleForm({ initialValues, onSubmit, title, loadingText, buttonText }) {
    const router = useRouter();
    const [selectedFlow, setSelectedFlow] = useState("");
    const [tempSelections, setTempSelections] = useState([]);

    const validationSchema = Yup.object({
        name: Yup.string().required("Role Name is required"),
        description: Yup.string().required("Description is required").max(200, "Description is too long"),
        permissions: Yup.object().test('at-least-one', 'At least one privilege must be assigned', (value) => {
            return value && Object.values(value).some(privs => Object.values(privs).some(v => v === true));
        })
    });

    const formik = useFormik({
        initialValues: initialValues || {
            name: "",
            description: "",
            permissions: {},
            status: "active"
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: onSubmit,
    });

    const getAvailableFeatures = () => {
        if (!selectedFlow) return [];
        const flow = APP_MENU.find(f => f.name === selectedFlow);
        if (!flow) return [];

        const features = [];
        flow.items.forEach(menuItem => {
            PRIVILEGES.forEach(p => {
                // Dashboard only supports 'view' privilege
                if (menuItem.key === 'dashboard' && p.key !== 'view') return;

                const isAssigned = formik.values.permissions[menuItem.key]?.[p.key];
                if (!isAssigned) {
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
        const newPermissions = { ...formik.values.permissions };

        tempSelections.forEach(selection => {
            const [mKey, pKey] = selection.split(':');
            if (!newPermissions[mKey]) newPermissions[mKey] = {};
            newPermissions[mKey][pKey] = true;

            // AUTO-VIEW LOGIC: If 'create' or 'edit' is assigned, 'view' must be assigned too
            if (pKey === 'create' || pKey === 'edit') {
                newPermissions[mKey]['view'] = true;
            }
        });

        formik.setFieldValue("permissions", newPermissions);
        setTempSelections([]);
    };

    const handleRemove = (moduleKey, privilegeKey) => {
        const newPermissions = { ...formik.values.permissions };
        if (newPermissions[moduleKey]) {
            delete newPermissions[moduleKey][privilegeKey];

            // AUTO-CLEANUP LOGIC: If 'view' is removed, 'create' and 'edit' must also be removed
            if (privilegeKey === 'view') {
                delete newPermissions[moduleKey]['create'];
                delete newPermissions[moduleKey]['edit'];
            }

            if (Object.keys(newPermissions[moduleKey]).length === 0) {
                delete newPermissions[moduleKey];
            }
        }
        formik.setFieldValue("permissions", newPermissions);
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            const available = getAvailableFeatures();
            setTempSelections(available.map(f => `${f.moduleKey}:${f.privilegeKey}`));
        } else {
            setTempSelections([]);
        }
    };

    const getTotalAssignedPrivileges = () => {
        let count = 0;
        for (const moduleKey in formik.values.permissions) {
            count += Object.keys(formik.values.permissions[moduleKey]).length;
        }
        return count;
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <CommonCard title="Role Details">
                <Grid container spacing={2} alignItems="flex-start">
                    {/* Role Name */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--text-secondary)', mb: 1, display: 'block' }}>
                                ROLE NAME <span style={{ color: 'var(--error)' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="e.g. Purchase Manager"
                                size="small"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 'var(--input-radius)',
                                        bgcolor: 'var(--bg-page)',
                                        height: '45px'
                                    }
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Description */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--text-secondary)', mb: 1, display: 'block' }}>
                                DESCRIPTION <span style={{ color: 'var(--error)' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Briefly describe responsibilities..."
                                size="small"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 'var(--input-radius)',
                                        bgcolor: 'var(--bg-page)',
                                        height: '45px'
                                    }
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Status & Actions */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--text-secondary)', display: 'block' }}>
                                ROLE STATUS
                            </Typography>
                            <Box sx={{
                                px: 2,
                                height: '45px',
                                borderRadius: 'var(--input-radius)',
                                border: '1px solid var(--border-default)',
                                bgcolor: 'var(--bg-page)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem' }}>Active Status</Typography>
                                <Checkbox
                                    size="small"
                                    name="status"
                                    checked={formik.values.status === "active"}
                                    onChange={(e) => formik.setFieldValue("status", e.target.checked ? "active" : "inactive")}
                                    sx={{ color: 'var(--brand-primary)', '&.Mui-checked': { color: 'var(--brand-primary)' }, p: 0 }}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, mt: 3, justifyContent: 'flex-end' }}>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => router.push("/settings/roles")}
                                sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 700, borderColor: 'var(--border-strong)', height: '36px' }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size="small"
                                variant="contained"
                                startIcon={<Save />}
                                disabled={loadingText ? true : false}
                                sx={{
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    bgcolor: 'var(--brand-primary)',
                                    height: '36px',
                                    '&:hover': { bgcolor: '#0d5a94' }
                                }}
                            >
                                {loadingText || buttonText}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </CommonCard>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{
                        p: 0,
                        borderRadius: 'var(--card-radius)',
                        border: '1px solid var(--border-default)',
                        overflow: 'hidden',
                        boxShadow: 'var(--card-shadow)'
                    }}>
                        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography sx={{ fontWeight: 800, fontSize: '0.875rem' }}>ASSIGN PRIVILEGES</Typography>
                            <FormControl size="small" sx={{ minWidth: 200, ml: 'auto' }}>
                                <Select
                                    value={selectedFlow}
                                    onChange={(e) => {
                                        setSelectedFlow(e.target.value);
                                        setTempSelections([]);
                                    }}
                                    displayEmpty
                                    sx={{
                                        borderRadius: '8px',
                                        bgcolor: '#fff',
                                        fontSize: '0.8125rem',
                                        fontWeight: 600
                                    }}
                                >
                                    <MenuItem value="" disabled>-- Select Module --</MenuItem>
                                    {APP_MENU.map(flow => (
                                        <MenuItem key={flow.name} value={flow.name}>{flow.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <TableContainer sx={{ height: 420 }}>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ bgcolor: '#fff', fontWeight: 700, width: 60 }}>Select</TableCell>
                                        <TableCell sx={{ bgcolor: '#fff', fontWeight: 700 }}>Feature / Privilege</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getAvailableFeatures().map((feature) => {
                                        const isSelected = tempSelections.includes(`${feature.moduleKey}:${feature.privilegeKey}`);
                                        return (
                                            <TableRow key={`${feature.moduleKey}:${feature.privilegeKey}`} hover
                                                onClick={() => handleTempToggle(feature)}
                                                sx={{ cursor: 'pointer', bgcolor: isSelected ? 'var(--brand-soft)' : 'transparent' }}>
                                                <TableCell>
                                                    <Checkbox
                                                        size="small"
                                                        checked={isSelected}
                                                        sx={{ color: 'var(--border-strong)', '&.Mui-checked': { color: 'var(--brand-primary)' } }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                        <Box sx={{ display: 'flex', color: isSelected ? 'var(--brand-primary)' : 'var(--text-muted)' }}>
                                                            {React.cloneElement(feature.icon, { sx: { fontSize: 18 } })}
                                                        </Box>
                                                        <Box>
                                                            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: isSelected ? 'var(--brand-primary)' : 'var(--text-primary)' }}>
                                                                {feature.moduleName}
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '0.75rem', color: isSelected ? 'var(--brand-primary)' : 'var(--text-secondary)', opacity: 0.8 }}>
                                                                Action: {feature.privilegeLabel}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {getAvailableFeatures().length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={2} align="center" sx={{ py: 12, color: 'var(--text-muted)' }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'center', alignItems: 'center', gap: 1 }}>
                                                    <Add sx={{ fontSize: 40, opacity: 0.2 }} />
                                                    <Typography variant="body2">Select a business flow to configure privileges</Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderTop: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={
                                            Boolean(getAvailableFeatures().length > 0 &&
                                                getAvailableFeatures().every(f => tempSelections.includes(`${f.moduleKey}:${f.privilegeKey}`)))
                                        }
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                        disabled={!selectedFlow || getAvailableFeatures().length === 0}
                                        sx={{ color: 'var(--border-strong)', '&.Mui-checked': { color: 'var(--brand-primary)' } }}
                                    />
                                }
                                label={<Typography sx={{ fontSize: '0.8125rem', fontWeight: 700 }}>Select All Features</Typography>}
                            />
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleAssign}
                                disabled={tempSelections.length === 0}
                                startIcon={<Add />}
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    bgcolor: 'var(--brand-primary)',
                                    '&:hover': { bgcolor: '#0d5a94' },
                                    fontWeight: 700,
                                    px: 3
                                }}
                            >
                                Assign to Role
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{
                        p: 0,
                        borderRadius: 'var(--card-radius)',
                        border: '1px solid var(--border-default)',
                        overflow: 'hidden',
                        boxShadow: 'var(--card-shadow)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontWeight: 800, fontSize: '0.875rem' }}>CONFIGURED PRIVILEGES</Typography>
                            <Typography sx={{
                                fontSize: '11px',
                                bgcolor: formik.touched.permissions && formik.errors.permissions ? 'var(--error-soft)' : 'var(--brand-soft)',
                                color: formik.touched.permissions && formik.errors.permissions ? 'var(--error)' : 'var(--brand-primary)',
                                px: 2,
                                py: 0.5,
                                borderRadius: '20px',
                                fontWeight: 800,
                                border: formik.touched.permissions && formik.errors.permissions ? '1px solid var(--error)' : 'none'
                            }}>
                                {formik.touched.permissions && formik.errors.permissions ? formik.errors.permissions : `${getTotalAssignedPrivileges()} TOTAL`}
                            </Typography>
                        </Box>

                        <TableContainer sx={{ height: 494 }}>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ bgcolor: '#fff', fontWeight: 700 }}>Flow / Feature</TableCell>
                                        <TableCell sx={{ bgcolor: '#fff', fontWeight: 700 }}>Privilege</TableCell>
                                        <TableCell sx={{ bgcolor: '#fff', fontWeight: 700, width: 40 }}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(formik.values.permissions).length > 0 ? Object.keys(formik.values.permissions).map(mKey => {
                                        const privs = formik.values.permissions[mKey];
                                        let menuItem = null;
                                        let flow = null;
                                        for (const f of APP_MENU) {
                                            const item = f.items?.find(i => i.key === mKey);
                                            if (item) {
                                                menuItem = item;
                                                flow = f;
                                                break;
                                            }
                                        }

                                        return Object.keys(privs).map(pKey => {
                                            const privilegeLabel = PRIVILEGES.find(pr => pr.key === pKey)?.label || pKey;
                                            return (
                                                <TableRow key={`${mKey}:${pKey}`} hover>
                                                    <TableCell>
                                                        <Box>
                                                            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', mb: 0.2 }}>
                                                                {flow?.name || "Flow"}
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600 }}>{menuItem?.text || mKey}</Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography component="span" sx={{
                                                            fontSize: '10px',
                                                            bgcolor: 'var(--bg-page)',
                                                            color: 'var(--text-primary)',
                                                            px: 1,
                                                            py: 0.25,
                                                            borderRadius: '4px',
                                                            border: '1px solid var(--border-default)',
                                                            fontWeight: 700
                                                        }}>
                                                            {privilegeLabel.toUpperCase()}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Tooltip title="Remove Privilege">
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleRemove(mKey, pKey)}
                                                                sx={{
                                                                    color: 'var(--error)',
                                                                    bgcolor: '#fef2f2',
                                                                    '&:hover': { bgcolor: '#fee2e2' }
                                                                }}
                                                            >
                                                                <Delete sx={{ fontSize: 16 }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        });
                                    }) : (
                                        <TableRow>
                                            <TableCell colSpan={3} align="center" sx={{ py: 15, color: 'var(--text-muted)' }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, opacity: 0.5 }}>
                                                    <Save sx={{ fontSize: 40 }} />
                                                    <Typography variant="body2">No privileges assigned to this role yet.</Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
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
