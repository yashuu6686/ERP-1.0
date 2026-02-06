import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Grid,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import {
    Close,
    CheckCircle,
    LocalShipping,
    Business,
    Inventory,
    Person,
} from "@mui/icons-material";

const PreviewSection = ({ icon: Icon, title, children }) => (
    <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{
                p: 1,
                borderRadius: "50%",
                bgcolor: "rgba(17, 114, 186, 0.1)",
                display: "flex",
                color: "#1172ba"
            }}>
                <Icon fontSize="small" />
            </Box>
            <Typography variant="subtitle1" fontWeight={700} color="#1e293b">
                {title}
            </Typography>
        </Box>
        <Box sx={{ pl: 5.5 }}>
            {children}
        </Box>
    </Box>
);

const DataItem = ({ label, value }) => (
    <Box sx={{ mb: 1 }}>
        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {label}
        </Typography>
        <Typography variant="body2" sx={{ color: "#1e293b", fontWeight: 500 }}>
            {value || "N/A"}
        </Typography>
    </Box>
);

export default function DispatchPreviewDialog({ open, onClose, onConfirm, values, loading }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 3, overflow: "hidden" }
            }}
        >
            <DialogTitle sx={{
                m: 0,
                p: 2,
                bgcolor: "#f8fafc",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Typography variant="h6" fontWeight={700} color="#0f172a">
                    Confirm Dispatch Details
                </Typography>
                <IconButton onClick={onClose} size="small" sx={{ color: "#64748b" }}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 4 }}>
                <Typography variant="body2" color="#64748b" sx={{ mb: 4 }}>
                    Please review the dispatch information below before finalizing the entry.
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <PreviewSection icon={LocalShipping} title="Dispatch Details">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <DataItem label="Dispatch No" value={values.dispatchNo} />
                                </Grid>
                                <Grid item xs={6}>
                                    <DataItem label="Dispatch Date" value={values.dispatchDate} />
                                </Grid>
                                <Grid item xs={6}>
                                    <DataItem label="Tracking No" value={values.trackingNumber} />
                                </Grid>
                                <Grid item xs={6}>
                                    <DataItem label="Courier" value={values.courierCompany} />
                                </Grid>
                            </Grid>
                        </PreviewSection>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <PreviewSection icon={Business} title="Customer & Delivery">
                            <DataItem label="Customer/Organisation" value={values.customerName} />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <DataItem label="Contact Person" value={values.contactPerson} />
                                </Grid>
                                <Grid item xs={6}>
                                    <DataItem label="Phone" value={values.contactNo} />
                                </Grid>
                            </Grid>
                            <DataItem label="Delivery Address" value={values.deliveryAddress} />
                        </PreviewSection>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <PreviewSection icon={Inventory} title="Product Details">
                    <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 2 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#f8fafc" }}>
                                    <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Product Name</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: "#475569" }}>Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {values.products.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontWeight: 500 }}>{item.name}</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 500 }}>{item.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PreviewSection>

                <Divider sx={{ my: 2 }} />

                <PreviewSection icon={Person} title="Approvals">
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <DataItem label="Packed By" value={values.packedBy} />
                        </Grid>
                        <Grid item xs={4}>
                            <DataItem label="Approved By" value={values.approvedBy} />
                        </Grid>
                        <Grid item xs={4}>
                            <DataItem label="Accounting By" value={values.accountingBy} />
                        </Grid>
                    </Grid>
                </PreviewSection>
            </DialogContent>

            <DialogActions sx={{ p: 3, bgcolor: "#f8fafc", borderTop: "1px solid #e2e8f0", gap: 2 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        px: 4
                    }}
                >
                    Edit Details
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    disabled={loading}
                    startIcon={<CheckCircle />}
                    sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        px: 4,
                        bgcolor: "#1172ba",
                        "&:hover": { bgcolor: "#0d5a94" }
                    }}
                >
                    {loading ? "Confirming..." : "Confirm & Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
