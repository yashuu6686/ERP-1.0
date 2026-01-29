import React from "react";
import {
    Card,
    Box,
    Typography,
    CardContent,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { Verified as VerifiedIcon } from "@mui/icons-material";

const VerificationChecks = () => {
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
                <VerifiedIcon sx={{ color: "#fff", fontSize: 24 }} />
                <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600 }}>
                    Verification Checks
                </Typography>
            </Box>

            <CardContent sx={{ padding: 3 }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                        gap: 4,
                    }}
                >
                    <FormControl>
                        <FormLabel sx={{ fontWeight: 600, mb: 1, fontSize: "0.9rem" }}>
                            Inspection Tools Used
                        </FormLabel>
                        <RadioGroup row>
                            <FormControlLabel
                                value="yes"
                                control={<Radio size="small" />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio size="small" />}
                                label="No"
                            />
                            <FormControlLabel
                                value="n/a"
                                control={<Radio size="small" />}
                                label="N/A"
                            />
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel sx={{ fontWeight: 600, mb: 1, fontSize: "0.9rem" }}>
                            SDS Available
                        </FormLabel>
                        <RadioGroup row>
                            <FormControlLabel
                                value="yes"
                                control={<Radio size="small" />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio size="small" />}
                                label="No"
                            />
                            <FormControlLabel
                                value="n/a"
                                control={<Radio size="small" />}
                                label="N/A"
                            />
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel sx={{ fontWeight: 600, mb: 1, fontSize: "0.9rem" }}>
                            Quality Certificate
                        </FormLabel>
                        <RadioGroup row>
                            <FormControlLabel
                                value="yes"
                                control={<Radio size="small" />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio size="small" />}
                                label="No"
                            />
                            <FormControlLabel
                                value="n/a"
                                control={<Radio size="small" />}
                                label="N/A"
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </CardContent>
        </Card>
    );
};

export default VerificationChecks;
