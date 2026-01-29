import React from "react";
import {
    Card,
    Box,
    Typography,
    CardContent,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
} from "@mui/material";
import { ReportProblem, Info } from "@mui/icons-material";

const ProblemReportAQDSection = ({
    problemReport,
    setProblemReport,
    aqd,
    setAqd,
}) => {
    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
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
                                variant="subtitle1"
                                sx={{ color: "#fff", fontWeight: 600 }}
                            >
                                Problem Report
                            </Typography>
                        </Box>
                        <RadioGroup
                            row
                            value={problemReport}
                            onChange={(e) => setProblemReport(e.target.value)}
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
                        {problemReport === "yes" ? (
                            <Grid container spacing={2}>
                                <Grid item xs={12} size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        multiline
                                        rows={2}
                                        size="small"
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                backgroundColor: "white",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Action Taken"
                                        multiline
                                        rows={2}
                                        size="small"
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
            <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
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
                            value={aqd}
                            onChange={(e) => setAqd(e.target.value)}
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
                        {aqd === "yes" ? (
                            <TextField
                                fullWidth
                                label="AQD Description"
                                multiline
                                rows={4.5}
                                size="small"
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
