"use client";
import React, { useState } from "react";
import { Container, Typography, Paper, Box, Divider } from "@mui/material";
import CommonForm from "@/components/CommonForm/CommonForm";
import CommonCard from "@/components/CommonCard";

const FormDemo = () => {
    const [lastSubmission, setLastSubmission] = useState(null);

    const formConfig = [
        {
            name: "orderInfo.orderNumber",
            label: "Order Number",
            type: "text",
            size: { xs: 12, md: 6 },
            placeholder: "PO-2024-001",
        },
        {
            name: "orderInfo.orderDate",
            label: "Order Date",
            type: "date",
            size: { xs: 12, md: 6 },
        },
        {
            name: "supplier",
            label: "Supplier",
            type: "select",
            size: { xs: 12, md: 6 },
            options: [
                { label: "Supplier A", value: "supplier_a" },
                { label: "Supplier B", value: "supplier_b" },
            ],
        },
        {
            name: "priority",
            label: "Priority",
            type: "radio",
            size: { xs: 12, md: 6 },
            options: [
                { label: "Low", value: "low" },
                { label: "Medium", value: "medium" },
                { label: "High", value: "high" },
            ],
        },
        {
            name: "applyToGrn",
            label: "Apply to GRN",
            type: "checkbox",
            size: { xs: 12 },
        },
        {
            name: "grnDetails.warehouse",
            label: "Warehouse Location",
            type: "text",
            size: { xs: 12, md: 6 },
            showIf: { applyToGrn: true }, // Dynamic show/hide
        },
        {
            name: "grnDetails.remarks",
            label: "GRN Remarks",
            type: "text",
            multiline: true,
            rows: 2,
            size: { xs: 12, md: 6 },
            showIf: { applyToGrn: true },
        },
        {
            name: "attachment",
            label: "Upload Document",
            type: "file",
            size: { xs: 12 },
        },
        {
            name: "restrictedField",
            label: "Read Only Field (Permission)",
            type: "text",
            size: { xs: 12 },
        }
    ];

    const initialValues = {
        orderInfo: {
            orderNumber: "PO-DEFAULT-123",
            orderDate: new Date().toISOString().split('T')[0],
        },
        priority: "medium",
        applyToGrn: false,
        restrictedField: "You cannot edit this (view only permission)"
    };

    const permissions = {
        restrictedField: 'view',
    };

    const handleFormSubmit = (data) => {
        console.log("Form Submitted:", data);
        setLastSubmission(data);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <CommonCard title="Config Driven Form Demo">
                <Box sx={{ p: 2 }}>
                    <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
                        This form is generated from a JSON configuration. It supports nested fields,
                        dynamic show/hide logic (check "Apply to GRN"), file uploads, and field permissions.
                    </Typography>

                    <CommonForm
                        config={formConfig}
                        initialValues={initialValues}
                        permissions={permissions}
                        onSubmit={handleFormSubmit}
                        submitLabel="Submit Purchase Order"
                    />

                    {lastSubmission && (
                        <Paper sx={{ mt: 4, p: 2, bgcolor: "#f8fafc" }}>
                            <Typography variant="h6" gutterBottom>Last Submission Data:</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <pre style={{ overflow: "auto" }}>
                                {JSON.stringify(lastSubmission, (key, value) => {
                                    if (value instanceof File) return `File: ${value.name}`;
                                    return value;
                                }, 2)}
                            </pre>
                        </Paper>
                    )}
                </Box>
            </CommonCard>
        </Container>
    );
};

export default FormDemo;
