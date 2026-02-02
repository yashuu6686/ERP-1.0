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

import Verified from "@mui/icons-material/Verified";
import Comment from "@mui/icons-material/Comment";

const ApprovalCommentsSection = () => {
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
                            gap: 2,
                        }}
                    >
                        <Verified sx={{ color: "#fff" }} />
                        <Typography
                            variant="subtitle1"
                            sx={{ color: "#fff", fontWeight: 600 }}
                        >
                            Approval Status
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                        <Box sx={{ display: "grid", gap: 1 }}>
                            {["Release to Finished Goods", "Move to Quarantine"].map(
                                (label, idx) => (
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
                                            control={<Checkbox size="small" color="primary" />}
                                            label={label}
                                            sx={{ width: "100%", m: 0 }}
                                        />
                                    </Paper>
                                )
                            )}
                        </Box>
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
                            gap: 2,
                        }}
                    >
                        <Comment sx={{ color: "#fff" }} />
                        <Typography
                            variant="subtitle1"
                            sx={{ color: "#fff", fontWeight: 600 }}
                        >
                            Comments
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5.5}
                            placeholder="Enter additional comments here..."
                            size="small"
                            sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ApprovalCommentsSection;
