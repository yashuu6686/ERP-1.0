import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormikContext } from "formik";
import { Box } from "@mui/material";
import Inventory from "@mui/icons-material/Inventory";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Assignment from "@mui/icons-material/Assignment";
import Numbers from "@mui/icons-material/Numbers";

const BatchProcessInfo = () => {
    const { values, errors, touched, handleChange, handleBlur } = useFormikContext();

    return (
        <Card
            sx={{
                mb: 4,
                border: "1px solid #e9ecef",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
            }}
        >
            <Box
                sx={{
                    p: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                }}
            >
                <Inventory />
                <Typography variant="h6" fontWeight={600} color="white">
                    Batch & Process Information
                </Typography>
            </Box>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Batch Received Date"
                            name="batchReceivedDate"
                            value={values.batchReceivedDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.batchReceivedDate && Boolean(errors.batchReceivedDate)}
                            helperText={touched.batchReceivedDate && errors.batchReceivedDate}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarToday sx={{ color: "#1172ba" }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="BMR No."
                            placeholder="Enter BMR No."
                            name="bmrNo"
                            value={values.bmrNo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.bmrNo && Boolean(errors.bmrNo)}
                            helperText={touched.bmrNo && errors.bmrNo}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Assignment sx={{ color: "#1172ba" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Batch No."
                            placeholder="Enter Batch No."
                            name="batchNo"
                            value={values.batchNo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.batchNo && Boolean(errors.batchNo)}
                            helperText={touched.batchNo && errors.batchNo}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Numbers sx={{ color: "#1172ba" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Serial No."
                            placeholder="Enter Serial No."
                            name="serialNo"
                            value={values.serialNo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.serialNo && Boolean(errors.serialNo)}
                            helperText={touched.serialNo && errors.serialNo}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Numbers sx={{ color: "#1172ba" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default BatchProcessInfo;
