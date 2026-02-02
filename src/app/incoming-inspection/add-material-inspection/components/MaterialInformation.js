import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import InventoryIcon from "@mui/icons-material/Inventory";

const MaterialInformation = ({ data, onChange, pendingGRNs, selectedGRN, onGRNChange }) => {
    return (
        <Card
            elevation={0}
            sx={{
                marginBottom: 4,
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    padding: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <InventoryIcon sx={{ color: "#fff", fontSize: 24 }} />
                <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600 }}>
                    Material Information
                </Typography>
            </Box>

            <CardContent sx={{ padding: 3 }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, 1fr)",
                            lg: "repeat(4, 1fr)",
                        },
                        gap: 3,
                    }}
                >
                    <Autocomplete
                        options={pendingGRNs}
                        getOptionLabel={(option) => option.grnNumber || ""}
                        value={selectedGRN}
                        onChange={onGRNChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select GRN Number"
                                variant="outlined"
                                fullWidth
                                size="small"
                                placeholder="Search Pending GRNs..."
                            />
                        )}
                    />
                    <TextField
                        label="Material Name"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={data.materialName}
                        onChange={(e) => onChange("materialName", e.target.value)}
                    />
                    <TextField
                        label="PO Number"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={data.poNumber}
                        onChange={(e) => onChange("poNumber", e.target.value)}
                    />
                    <TextField
                        label="Received Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={data.receivedDate}
                        onChange={(e) => onChange("receivedDate", e.target.value)}
                    />
                    <TextField
                        label="Invoice Number"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={data.invoiceNumber}
                        onChange={(e) => onChange("invoiceNumber", e.target.value)}
                    />
                    <TextField
                        label="Lot Number"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={data.lotNumber}
                        onChange={(e) => onChange("lotNumber", e.target.value)}
                    />
                    <TextField
                        label="Inspection Standard Number"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={data.inspectionStandardNumber}
                        onChange={(e) => onChange("inspectionStandardNumber", e.target.value)}
                    />
                    <TextField
                        label="Supplier Name"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={data.supplierName}
                        onChange={(e) => onChange("supplierName", e.target.value)}
                    />
                    <TextField
                        label="Lot Quantity"
                        variant="outlined"
                        fullWidth
                        type="number"
                        size="small"
                        value={data.lotQuantity}
                        onChange={(e) => onChange("lotQuantity", e.target.value)}
                    />
                    <TextField
                        label="Equipment ID and Description"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={data.equipmentId}
                        onChange={(e) => onChange("equipmentId", e.target.value)}
                    />
                    <TextField
                        label="Sample Size"
                        variant="outlined"
                        fullWidth
                        type="number"
                        size="small"
                        value={data.sampleSize}
                        onChange={(e) => onChange("sampleSize", e.target.value)}
                    />
                    <TextField
                        label="Inspection Report Number"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={data.inspectionReportNumber}
                        onChange={(e) => onChange("inspectionReportNumber", e.target.value)}
                    />
                    <TextField
                        label="Inspection Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={data.inspectionDate}
                        onChange={(e) => onChange("inspectionDate", e.target.value)}
                    />
                    <TextField
                        label="Inspection Standard"
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{ gridColumn: { xs: "1", md: "span 2" } }}
                        value={data.inspectionStandard}
                        onChange={(e) => onChange("inspectionStandard", e.target.value)}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default MaterialInformation;
