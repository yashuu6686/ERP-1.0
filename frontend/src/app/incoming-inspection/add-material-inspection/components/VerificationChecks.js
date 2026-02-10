import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormHelperText from "@mui/material/FormHelperText";

import VerifiedIcon from "@mui/icons-material/Verified";

const VerificationChecks = ({ data = {}, onChange, errors = {}, touched = {}, onBlur }) => {

    // Helper to focus next radio group (optional, but good for consistency)
    // Since RadioGroups are not standard inputs that "Enter" key naturally flows through 
    // in the same way as TextFields, we might rely on Tab. 
    // However, we can add a listener if requested.
    // For Radio Groups, usually Tab is the standard navigation.
    // "Enter" selection is usually spacebar.
    // Given the user request is generic "Enter in field", I will assume they want focus management.
    // But for Radio buttons, Enter usually submits or selects. 
    // I will add a custom handler if they are keyboard navigating.

    // If the request implies these are text fields, but they are Radios.
    // I will skip 'Enter' on Radio Groups as it conflicts with selection behavior usually, 
    // unless the user strictly wants it. 
    // But wait, the user said "enter in feild". 
    // Let's implement a simple focus mover if they press Enter on the Radio itself (which is rare).
    // Actually, best practice for Radio Groups is Arrow keys to select, Tab to move out.
    // If I force Enter to move, it might be weird.
    // However, I will check if there are any TextFields I missed. 
    // There are NO TextFields here, only RadioGroups.
    // I will leave this file as is regarding "Enter" logic because standard efficient usage of Radio Groups
    // doesn't involve hitting Enter to go to the next group, but I can make it so if they really want.
    // Let's try to add it to the wrapper div or using a ref if possible, but RadioGroup doesn't easily expose this.
    // ACTUALLY, checking the code, they are Radio buttons.
    // If I press Enter on a Radio button, it usually toggles it? No, Space toggles.
    // I will add a keydown listener to the RadioGroup container to move focus to the next one.

    const handleKeyDown = (e, currentField) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const fields = ["toolsUsed", "sdsAvailable", "qualityCertificate"];
            const currentIndex = fields.indexOf(currentField);
            if (currentIndex !== -1 && currentIndex < fields.length - 1) {
                const nextField = fields[currentIndex + 1];
                // We need to focus the first radio input of the next group
                // We can use the name attribute to find it
                const nextInput = document.querySelector(`input[name="materialData.${nextField}"]`);
                if (nextInput) {
                    nextInput.focus();
                }
            }
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
                    <FormControl error={touched.toolsUsed && Boolean(errors.toolsUsed)}>
                        <FormLabel sx={{ fontWeight: 600, mb: 1, fontSize: "0.9rem" }}>
                            Inspection Tools Used
                        </FormLabel>
                        <RadioGroup
                            row
                            value={data.toolsUsed || ""}
                            onChange={(e) => onChange("toolsUsed", e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, "toolsUsed")}
                        >
                            <FormControlLabel value="yes" control={<Radio size="small" onBlur={onBlur} name="materialData.toolsUsed" />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio size="small" onBlur={onBlur} name="materialData.toolsUsed" />} label="No" />
                            <FormControlLabel value="n/a" control={<Radio size="small" onBlur={onBlur} name="materialData.toolsUsed" />} label="N/A" />
                        </RadioGroup>
                        {touched.toolsUsed && errors.toolsUsed && (
                            <FormHelperText>{errors.toolsUsed}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl error={touched.sdsAvailable && Boolean(errors.sdsAvailable)}>
                        <FormLabel sx={{ fontWeight: 600, mb: 1, fontSize: "0.9rem" }}>
                            Safety Data Sheet Available
                        </FormLabel>
                        <RadioGroup
                            row
                            value={data.sdsAvailable || ""}
                            onChange={(e) => onChange("sdsAvailable", e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, "sdsAvailable")}
                        >
                            <FormControlLabel value="yes" control={<Radio size="small" onBlur={onBlur} name="materialData.sdsAvailable" />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio size="small" onBlur={onBlur} name="materialData.sdsAvailable" />} label="No" />
                            <FormControlLabel value="n/a" control={<Radio size="small" onBlur={onBlur} name="materialData.sdsAvailable" />} label="N/A" />
                        </RadioGroup>
                        {touched.sdsAvailable && errors.sdsAvailable && (
                            <FormHelperText>{errors.sdsAvailable}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl error={touched.qualityCertificate && Boolean(errors.qualityCertificate)}>
                        <FormLabel sx={{ fontWeight: 600, mb: 1, fontSize: "0.9rem" }}>
                            Quality Certificate
                        </FormLabel>
                        <RadioGroup
                            row
                            value={data.qualityCertificate || ""}
                            onChange={(e) => onChange("qualityCertificate", e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, "qualityCertificate")}
                        >
                            <FormControlLabel value="yes" control={<Radio size="small" onBlur={onBlur} name="materialData.qualityCertificate" />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio size="small" onBlur={onBlur} name="materialData.qualityCertificate" />} label="No" />
                            <FormControlLabel value="n/a" control={<Radio size="small" onBlur={onBlur} name="materialData.qualityCertificate" />} label="N/A" />
                        </RadioGroup>
                        {touched.qualityCertificate && errors.qualityCertificate && (
                            <FormHelperText>{errors.qualityCertificate}</FormHelperText>
                        )}
                    </FormControl>
                </Box>
            </CardContent>
        </Card>
    );
};

export default VerificationChecks;
