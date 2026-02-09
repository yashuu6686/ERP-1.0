import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";

import ReportProblem from "@mui/icons-material/ReportProblem";
import Info from "@mui/icons-material/Info";

const ProblemReportAQDSection = ({ formik }) => {
    const { values, setFieldValue, touched, errors } = formik;

    const handleKeyDown = (e, nextField, fallbackField) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            let nextInput = document.querySelector(`[name="${nextField}"]`);
            if (!nextInput && fallbackField) {
                nextInput = document.querySelector(`[name="${fallbackField}"]`);
            }
            if (nextInput) nextInput.focus();
        }
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
                            justifyContent: "space-between",
                            gap: 2,
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <ReportProblem sx={{ color: "#fff" }} />
                            <Typography
                                variant="h6"
                                sx={{ color: "#fff", fontWeight: 600 }}
                            >
                                Problem Report
                            </Typography>
                        </Box>
                        <RadioGroup
                            row
                            name="problemReport"
                            value={values.problemReport || "no"}
                            onChange={(e) => setFieldValue("problemReport", e.target.value)}
                        >
                            <FormControlLabel
                                value="yes"
                                control={
                                    <Radio
                                        size="small"
                                        sx={{
                                            color: "#fff",
                                            "&.Mui-checked": { color: "#fff" },
                                        }}
                                    />
                                }
                                label={<Typography sx={{ color: "#fff" }}>Yes</Typography>}
                            />
                            <FormControlLabel
                                value="no"
                                control={
                                    <Radio
                                        size="small"
                                        sx={{
                                            color: "#fff",
                                            "&.Mui-checked": { color: "#fff" },
                                        }}
                                    />
                                }
                                label={<Typography sx={{ color: "#fff" }}>No</Typography>}
                            />
                        </RadioGroup>
                    </Box>
                    <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                        {values.problemReport === "yes" ? (
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        name="problemDescription"
                                        multiline
                                        rows={2}
                                        size="small"
                                        value={values.problemDescription || ""}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        onKeyDown={(e) => handleKeyDown(e, "problemActionTaken")}
                                        error={touched.problemDescription && Boolean(errors.problemDescription)}
                                        helperText={touched.problemDescription && errors.problemDescription}
                                        required
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                backgroundColor: "white",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Action Taken"
                                        name="problemActionTaken"
                                        multiline
                                        rows={2}
                                        size="small"
                                        value={values.problemActionTaken || ""}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        onKeyDown={(e) => handleKeyDown(e, "aqdDescription", "actionItemsDescription")}
                                        error={touched.problemActionTaken && Boolean(errors.problemActionTaken)}
                                        helperText={touched.problemActionTaken && errors.problemActionTaken}
                                        required
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                backgroundColor: "white",
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        ) : (
                            <Box sx={{ py: 2, textAlign: "center" }}>
                                <Typography color="textSecondary" variant="body2 italic">
                                    No problem reported
                                </Typography>
                            </Box>
                        )}
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
                            justifyContent: "space-between",
                            gap: 2,
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Info sx={{ color: "#fff" }} />
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "#fff", fontWeight: 600 }}
                            >
                                Acceptable Quality Diff.
                            </Typography>
                        </Box>
                        <RadioGroup
                            row
                            name="aqd"
                            value={values.aqd || "no"}
                            onChange={(e) => setFieldValue("aqd", e.target.value)}
                        >
                            <FormControlLabel
                                value="yes"
                                control={
                                    <Radio
                                        size="small"
                                        sx={{
                                            color: "#fff",
                                            "&.Mui-checked": { color: "#fff" },
                                        }}
                                    />
                                }
                                label={<Typography sx={{ color: "#fff" }}>Yes</Typography>}
                            />
                            <FormControlLabel
                                value="no"
                                control={
                                    <Radio
                                        size="small"
                                        sx={{
                                            color: "#fff",
                                            "&.Mui-checked": { color: "#fff" },
                                        }}
                                    />
                                }
                                label={<Typography sx={{ color: "#fff" }}>No</Typography>}
                            />
                        </RadioGroup>
                    </Box>
                    <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                        {values.aqd === "yes" ? (
                            <TextField
                                fullWidth
                                label="AQD Description"
                                name="aqdDescription"
                                multiline
                                rows={4.5}
                                size="small"
                                value={values.aqdDescription || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                onKeyDown={(e) => handleKeyDown(e, "actionItemsDescription")}
                                error={touched.aqdDescription && Boolean(errors.aqdDescription)}
                                helperText={touched.aqdDescription && errors.aqdDescription}
                                required
                                sx={{
                                    "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                                }}
                            />
                        ) : (
                            <Box sx={{ py: 6, textAlign: "center" }}>
                                <Typography color="textSecondary" variant="body2 italic">
                                    No AQD reported
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ProblemReportAQDSection;
