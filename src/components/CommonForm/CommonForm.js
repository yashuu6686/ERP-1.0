import React, { useState, useEffect } from "react";
import { Grid, Box, Button } from "@mui/material";
import FormField from "./FormField";
import { getNestedValue, setNestedValue } from "./formUtils";

const CommonForm = ({
    config,
    initialValues = {},
    onChange,
    onSubmit,
    submitLabel = "Submit",
    hideSubmit = false,
    permissions = {},
}) => {
    const [formData, setFormData] = useState(initialValues);

    const initialValuesString = JSON.stringify(initialValues);

    useEffect(() => {
        setFormData(initialValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValuesString]);

    const handleFieldChange = (name, value) => {
        const newData = setNestedValue(formData, name, value);
        setFormData(newData);
        if (onChange) {
            onChange(newData);
        }
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const isVisible = (field) => {
        const permission = permissions[field.name];
        if (permission === 'hide') return false;

        if (field.showIf) {
            // Simple showIf logic: showIf: { fieldName: 'value' }
            // Or showIf: (currentData) => boolean
            if (typeof field.showIf === 'function') {
                return field.showIf(formData);
            }

            const [targetField, targetValue] = Object.entries(field.showIf)[0];
            return getNestedValue(formData, targetField) === targetValue;
        }
        return true;
    };

    const isEditable = (field) => {
        const permission = permissions[field.name];
        if (permission === 'view') return false;
        return !field.disabled;
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>

                {config.map((field) => {
                    if (!isVisible(field)) return null;

                    return (
                        <Grid
                            key={field.name}
                            item
                            size={field.size || { xs: 12 }}
                        >
                            <FormField
                                key={field.name}
                                field={field}
                                value={getNestedValue(formData, field.name)}
                                onChange={handleFieldChange}
                                disabled={!isEditable(field)}
                            />
                        </Grid>
                    );
                })}
            </Grid>


            {!hideSubmit && (
                <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: "#1172ba",
                            "&:hover": { backgroundColor: "#0d5a94" },
                            borderRadius: 2,
                            px: 4,
                            py: 1.5,
                            textTransform: "none",
                            fontWeight: 500,
                        }}
                    >
                        {submitLabel}
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default CommonForm;
