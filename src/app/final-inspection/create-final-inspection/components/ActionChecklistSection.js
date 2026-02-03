import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Edit from "@mui/icons-material/Edit";
import CheckCircle from "@mui/icons-material/CheckCircle";

const ActionChecklistSection = ({ formData = {}, onChange }) => {
    const handleChecklistChange = (field) => {
        onChange("checklist", {
            ...formData.checklist,
            [field]: !formData.checklist?.[field]
        });
    };

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 2,
                        border: "1px solid #e2e8f0",
                        overflow: "hidden",
                        height: "100%",
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
                        <Edit sx={{ color: "#fff" }} />
                        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                            Action Items
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                        <TextField
                            fullWidth
                            label="Action Items Description"
                            multiline
                            rows={3}
                            size="small"
                            value={formData.actionItemsDescription || ""}
                            onChange={(e) => onChange("actionItemsDescription", e.target.value)}
                            sx={{
                                mb: 3,
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Finish Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            size="small"
                            value={formData.actionItemsFinishDate || ""}
                            onChange={(e) => onChange("actionItemsFinishDate", e.target.value)}
                            sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 2,
                        border: "1px solid #e2e8f0",
                        overflow: "hidden",
                        height: "100%",
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
                        <CheckCircle sx={{ color: "#fff" }} />
                        <Typography
                            variant="subtitle1"
                            sx={{ color: "#fff", fontWeight: 600 }}
                        >
                            Final Product Check
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                        <Box sx={{ display: "grid", gap: 1 }}>
                            {[
                                { label: "Label attached?", field: "labelAttached" },
                                { label: "Packaging proof attached?", field: "packagingProof" },
                                { label: "Final test done?", field: "finalTestDone" },
                            ].map((item, idx) => (
                                <Paper
                                    key={idx}
                                    elevation={0}
                                    sx={{
                                        p: 1.5,
                                        display: "flex",
                                        alignItems: "center",
                                        bgcolor: "white",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: 2,
                                        "&:hover": { bgcolor: "#f1f5f9" },
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                size="small"
                                                color="primary"
                                                checked={!!formData.checklist?.[item.field]}
                                                onChange={() => handleChecklistChange(item.field)}
                                            />
                                        }
                                        label={item.label}
                                        sx={{ width: "100%", m: 0 }}
                                    />
                                </Paper>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ActionChecklistSection;
