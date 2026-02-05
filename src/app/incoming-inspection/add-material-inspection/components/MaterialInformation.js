import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import InventoryIcon from "@mui/icons-material/Inventory";

const MaterialInformation = ({ isEditMode, data, onChange, pendingGRNs, selectedGRN, onGRNChange, errors = {}, touched = {}, onBlur }) => {
    const handleNumberKeyDown = (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
        }
    };

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
                        disabled={isEditMode}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="GRN Number"
                                variant="outlined"
                                fullWidth
                                required
                                size="small"
                                name="materialData.grnNumber"
                                onBlur={onBlur}
                                error={touched.grnNumber && Boolean(errors.grnNumber)}
                                helperText={touched.grnNumber && errors.grnNumber}
                                placeholder={isEditMode ? "" : "Search Pending GRNs..."}
                            />
                        )}
                    />
                    {selectedGRN?.items?.length > 0 ? (
                        <Autocomplete
                            options={selectedGRN.items}
                            getOptionLabel={(option) => option.name || option}
                            value={selectedGRN.items.find(i => i.name === data.materialName) || data.materialName}
                            onChange={(event, newValue) => {
                                const name = newValue?.name || newValue || "";
                                onChange("materialName", name);
                                if (newValue?.receivedQty) {
                                    onChange("lotQuantity", newValue.receivedQty);
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Material Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    size="small"
                                    name="materialData.materialName"
                                    onBlur={onBlur}
                                    error={touched.materialName && Boolean(errors.materialName)}
                                    helperText={touched.materialName && errors.materialName}
                                />
                            )}
                            freeSolo
                        />
                    ) : (
                        <TextField
                            label="Material Name"
                            variant="outlined"
                            fullWidth
                            required
                            size="small"
                            name="materialData.materialName"
                            value={data.materialName}
                            onChange={(e) => onChange("materialName", e.target.value)}
                            onBlur={onBlur}
                            error={touched.materialName && Boolean(errors.materialName)}
                            helperText={touched.materialName && errors.materialName}
                        />
                    )}
                    <TextField
                        label="PO Number"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        name="materialData.poNumber"
                        value={data.poNumber}
                        onChange={(e) => onChange("poNumber", e.target.value)}
                        onBlur={onBlur}
                        error={touched.poNumber && Boolean(errors.poNumber)}
                        helperText={touched.poNumber && errors.poNumber}
                    />
                    <TextField
                        label="Received Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        name="materialData.receivedDate"
                        value={data.receivedDate}
                        onChange={(e) => onChange("receivedDate", e.target.value)}
                        onBlur={onBlur}
                        error={touched.receivedDate && Boolean(errors.receivedDate)}
                        helperText={touched.receivedDate && errors.receivedDate}
                    />
                    <TextField
                        label="Invoice Number"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        name="materialData.invoiceNumber"
                        value={data.invoiceNumber}
                        onChange={(e) => onChange("invoiceNumber", e.target.value)}
                        onBlur={onBlur}
                        error={touched.invoiceNumber && Boolean(errors.invoiceNumber)}
                        helperText={touched.invoiceNumber && errors.invoiceNumber}
                    />
                    <TextField
                        label="Lot Number"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        name="materialData.lotNumber"
                        value={data.lotNumber}
                        onChange={(e) => onChange("lotNumber", e.target.value)}
                        onBlur={onBlur}
                        error={touched.lotNumber && Boolean(errors.lotNumber)}
                        helperText={touched.lotNumber && errors.lotNumber}
                    />
                    <TextField
                        label="Inspection Standard Number"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        name="materialData.inspectionStandardNumber"
                        value={data.inspectionStandardNumber}
                        onChange={(e) => onChange("inspectionStandardNumber", e.target.value)}
                        onBlur={onBlur}
                        error={touched.inspectionStandardNumber && Boolean(errors.inspectionStandardNumber)}
                        helperText={touched.inspectionStandardNumber && errors.inspectionStandardNumber}
                    />
                    <TextField
                        label="Supplier Name"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        name="materialData.supplierName"
                        value={data.supplierName}
                        onChange={(e) => onChange("supplierName", e.target.value)}
                        onBlur={onBlur}
                        error={touched.supplierName && Boolean(errors.supplierName)}
                        helperText={touched.supplierName && errors.supplierName}
                    />
                    <TextField
                        label="Lot Quantity"
                        variant="outlined"
                        fullWidth
                        required
                        type="number"
                        size="small"
                        name="materialData.lotQuantity"
                        value={data.lotQuantity}
                        onChange={(e) => onChange("lotQuantity", e.target.value)}
                        onBlur={onBlur}
                        onKeyDown={handleNumberKeyDown}
                        error={touched.lotQuantity && Boolean(errors.lotQuantity)}
                        helperText={touched.lotQuantity && errors.lotQuantity}
                    />
                    <TextField
                        label="Equipment ID and Description"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        name="materialData.equipmentId"
                        value={data.equipmentId}
                        onChange={(e) => onChange("equipmentId", e.target.value)}
                        onBlur={onBlur}
                        error={touched.equipmentId && Boolean(errors.equipmentId)}
                        helperText={touched.equipmentId && errors.equipmentId}
                    />
                    <TextField
                        label="Sample Size"
                        variant="outlined"
                        fullWidth
                        required
                        type="number"
                        size="small"
                        name="materialData.sampleSize"
                        value={data.sampleSize}
                        onChange={(e) => onChange("sampleSize", e.target.value)}
                        onBlur={onBlur}
                        onKeyDown={handleNumberKeyDown}
                        error={touched.sampleSize && Boolean(errors.sampleSize)}
                        helperText={touched.sampleSize && errors.sampleSize}
                    />
                    <TextField
                        label="Inspection Report Number"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        name="materialData.inspectionReportNumber"
                        value={data.inspectionReportNumber}
                        onChange={(e) => onChange("inspectionReportNumber", e.target.value)}
                        onBlur={onBlur}
                        error={touched.inspectionReportNumber && Boolean(errors.inspectionReportNumber)}
                        helperText={touched.inspectionReportNumber && errors.inspectionReportNumber}
                    />
                    <TextField
                        label="Inspection Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        name="materialData.inspectionDate"
                        value={data.inspectionDate}
                        onChange={(e) => onChange("inspectionDate", e.target.value)}
                        onBlur={onBlur}
                        error={touched.inspectionDate && Boolean(errors.inspectionDate)}
                        helperText={touched.inspectionDate && errors.inspectionDate}
                    />
                    <TextField
                        label="Inspection Standard"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        sx={{ gridColumn: { xs: "1", md: "span 2" } }}
                        name="materialData.inspectionStandard"
                        value={data.inspectionStandard}
                        onChange={(e) => onChange("inspectionStandard", e.target.value)}
                        onBlur={onBlur}
                        error={touched.inspectionStandard && Boolean(errors.inspectionStandard)}
                        helperText={touched.inspectionStandard && errors.inspectionStandard}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default MaterialInformation;
