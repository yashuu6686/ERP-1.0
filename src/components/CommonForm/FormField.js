import React from "react";
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    RadioGroup,
    FormControl,
    FormLabel,
    Radio,
    Input,
    Grid,
    InputLabel,
} from "@mui/material";

const FormField = ({ field, value, onChange, disabled }) => {
    const {
        type,
        label,
        name,
        options,
        placeholder,
        multiline,
        rows,
        size = { xs: 12 },
        sx = {},
        showIf,
    } = field;

    // Default styles for all fields
    const defaultSx = {
        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
        borderRadius: 1,
        ...sx,
    };

    const handleChange = (e) => {
        const val = type === "checkbox" ? e.target.checked : e.target.value;
        onChange(name, val);
    };

    const handleFileChange = (e) => {
        onChange(name, e.target.files[0]);
    };

    const renderInput = () => {
        switch (type) {
            case "select":
                return (
                    <FormControl fullWidth disabled={disabled}>
                        <InputLabel>{label}</InputLabel>
                        <Select
                            value={value || ""}
                            label={label}
                            onChange={handleChange}
                            sx={defaultSx}
                        >
                            {options?.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );

            case "checkbox":
                return (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!!value}
                                onChange={handleChange}
                                disabled={disabled}
                            />
                        }
                        label={label}
                    />
                );

            case "radio":
                return (
                    <FormControl disabled={disabled}>
                        <FormLabel>{label}</FormLabel>
                        <RadioGroup row value={value || ""} onChange={handleChange}>
                            {options?.map((opt) => (
                                <FormControlLabel
                                    key={opt.value}
                                    value={opt.value}
                                    control={<Radio />}
                                    label={opt.label}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                );

            case "file":
                return (
                    <FormControl fullWidth>
                        <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>
                        <Input
                            type="file"
                            onChange={handleFileChange}
                            disabled={disabled}
                        />
                    </FormControl>
                );

            case "date":
                return (
                    <TextField
                        fullWidth
                        label={label}
                        type="date"
                        value={value || ""}
                        onChange={handleChange}
                        disabled={disabled}
                        InputLabelProps={{ shrink: true }}
                        sx={defaultSx}
                    />
                );

            default:
                return (
                    <TextField
                        fullWidth
                        label={label}
                        type={type}
                        placeholder={placeholder}
                        multiline={multiline}
                        rows={rows}
                        value={value || ""}
                        onChange={handleChange}
                        disabled={disabled}
                        sx={defaultSx}
                    />
                );
        }
    };

    return renderInput();
};

export default FormField;
