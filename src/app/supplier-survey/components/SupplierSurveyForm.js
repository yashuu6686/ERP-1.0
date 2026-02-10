"use client";
import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    TextField,
    Typography,
    Grid,
    Checkbox,
    FormControlLabel,
    Button,
    Stepper,
    Step,
    StepLabel,
    Divider,
    Card,
    CardContent,
    FormHelperText,
    IconButton,
    InputAdornment,
} from "@mui/material";
import {
    Save,
    ArrowForward,
    ArrowBack,
    Business,
    Contacts,
    AccountBalance,
    FactCheck,
    LocationOn,
    Description,
    Add,
    Delete
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import CommonCard from "../../../components/ui/CommonCard";
import axiosInstance from "../../../axios/axiosInstance";
import SupplierSurveyPreviewDialog from "./SupplierSurveyPreviewDialog";
import { useNotification } from "@/context/NotificationContext";
import NotificationService from "@/services/NotificationService";

const steps = ["General Information", "Capabilities & Scope", "References & Review"];

const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("Company name is required"),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone is required"),
    address: Yup.string().required("Address is required"),
    management: Yup.array().of(
        Yup.object().shape({
            name: Yup.string(),
            title: Yup.string(),
            email: Yup.string(),
        })
    ),
    customerServiceContact: Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string().matches(/^[0-9]{10}$/, "Phone must be 10 digits").required("Phone is required"),
    }),
    qualityContact: Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string().matches(/^[0-9]{10}$/, "Phone must be 10 digits").required("Phone is required"),
    }),
    financials: Yup.object().shape({
        yearsInBusiness: Yup.number().typeError("Must be a number").required("Required"),
        totalEmployees: Yup.number().typeError("Must be a number").required("Required"),
    }),
    signOff: Yup.object().shape({
        name: Yup.string().required("Name is required"),
        position: Yup.string().required("Position is required"),
        date: Yup.date().required("Date is required"),
    }),
    majorCustomers: Yup.array()
        .of(Yup.string().required("Customer name is required"))
        .min(3, "At least three major customers are required"),
    majorSuppliers: Yup.array()
        .of(Yup.string().required("Supplier name is required"))
        .min(3, "At least three major suppliers are required"),
});

const defaultValues = {
    companyName: "",
    phone: "",
    address: "",
    management: [
        { name: "", title: "", email: "" },
        { name: "", title: "", email: "" },
    ],
    customerServiceContact: { name: "", email: "", phone: "" },
    qualityContact: { name: "", email: "", phone: "" },
    fax: "",
    website: "",
    vatTin: "",
    pan: "",
    businessStatus: {
        soleOwnership: false,
        partnership: false,
        privateCorp: false,
        publicCorp: false,
    },
    financials: {
        yearsInBusiness: "",
        totalEmployees: "",
        qaEmployees: "",
        revenuePrevYear: "",
        revenueThisYear: "",
        incomePrevYear: "",
        incomeThisYear: "",
    },
    facilities: {
        manufacturingSpace: "",
        warehouseSpace: "",
        laboratorySpace: "",
    },
    parentCompany: "",
    otherLocations: "",
    supplierType: {
        product: false,
        service: false,
    },
    productCapabilities: {
        customComponentMfg: false,
        standardComponentMfg: false,
        componentDistributor: false,
        processingItemSupplier: false,
        contractProductMfg: false,
        contractPackager: false,
        productsDescription: "",
    },
    serviceCapabilities: {
        advertising: false,
        consultant: false,
        contractProcessor: false,
        contractDistributor: false,
        contractSterilizer: false,
        languageTranslation: false,
        maintenance: false,
        it: false,
        transportation: false,
        qaRegulatory: false,
        testLab: false,
        other: false,
        servicesDescription: "",
    },
    underConsideration: "",
    majorCustomers: ["", "", ""],
    majorSuppliers: ["", "", ""],
    signOff: {
        name: "",
        position: "",
        date: "",
    },
    scanboReview: {
        reviewedBy: "",
        reviewedDate: "",
        approvedBy: "",
        approvedDate: "",
    },
    status: "Pending"
};

const SectionHeader = ({ title, icon: Icon }) => (
    <Box
        sx={{
            p: 2,
            background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderRadius: "8px 8px 0 0",
        }}
    >
        {Icon && <Icon sx={{ color: "#fff" }} />}
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600, fontSize: "1rem" }}>
            {title}
        </Typography>
    </Box>
);

const FormSection = ({ title, icon, children }) => (
    <Card elevation={0} sx={{ mb: 4, borderRadius: 2, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <SectionHeader title={title} icon={icon} />
        <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
            {children}
        </CardContent>
    </Card>
);

const SupplierSurveyForm = ({ initialData, isEdit }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const router = useRouter();
    const { showNotification } = useNotification();
    const formContainerRef = useRef(null);

    const formik = useFormik({
        initialValues: initialData || defaultValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async () => {
            setShowPreview(true);
        },
    });

    const handleFinalSubmit = async () => {
        const values = formik.values;

        // Determine Status dynamically
        let finalStatus = "Pending";
        if (values.scanboReview?.reviewedBy && values.scanboReview?.approvedBy) {
            finalStatus = "Approved";
        }

        const replaceEmptyWithNA = (obj) => {
            if (Array.isArray(obj)) {
                return obj.map(replaceEmptyWithNA);
            }
            if (typeof obj === "object" && obj !== null) {
                const newObj = {};
                for (const key in obj) {
                    newObj[key] = replaceEmptyWithNA(obj[key]);
                }
                return newObj;
            }
            if (obj === "" || obj === null || obj === undefined) {
                return "N/A";
            }
            return obj;
        };

        const processedValues = replaceEmptyWithNA(values);
        const finalValues = {
            ...processedValues,
            status: finalStatus // Ensure status is correctly set based on logic
        };

        try {
            setShowPreview(false);
            const response = isEdit
                ? await axiosInstance.put(`/supplier-surveys/${finalValues.id}`, finalValues)
                : await axiosInstance.post("/supplier-surveys", finalValues);

            if (response.status === 200 || response.status === 201) {
                showNotification(`Supplier Survey ${isEdit ? "Updated" : "Submitted"} Successfully!`, "success");
                router.push("/supplier-survey");
            }
        } catch (error) {
            console.error("Error submitting survey:", error);
            showNotification("Failed to submit survey. Please try again.", "error");
        }
    };

    useEffect(() => {
        // Auto-focus the first field on mount and step change
        if (formContainerRef.current) {
            const firstInput = formContainerRef.current.querySelector('input:not([type="hidden"]), select, textarea');
            if (firstInput) {
                firstInput.focus();
            }
        }
    }, [activeStep]);

    const handleNext = async () => {
        const stepFields = {
            0: [
                "companyName", "phone", "address",
                ...(formik.values.management || []).flatMap((_, i) => [
                    `management[${i}].name`,
                    `management[${i}].title`,
                    `management[${i}].email`
                ]),
                "customerServiceContact.name", "customerServiceContact.email", "customerServiceContact.phone",
                "qualityContact.name", "qualityContact.email", "qualityContact.phone",
                "financials.yearsInBusiness", "financials.totalEmployees"
            ],
            1: [], // No required fields in step 1 based on schema
            2: [
                "signOff.name", "signOff.position", "signOff.date",
                ...(formik.values.majorCustomers || []).map((_, i) => `majorCustomers[${i}]`),
                ...(formik.values.majorSuppliers || []).map((_, i) => `majorSuppliers[${i}]`)
            ]
        };

        const currentStepFields = stepFields[activeStep] || [];

        // Mark fields as touched to show errors (using setFieldTouched for nested paths)
        for (const field of currentStepFields) {
            formik.setFieldTouched(field, true, false);
        }

        // Validate form
        const errors = await formik.validateForm();

        // Helper to check nested errors
        const hasError = (fieldPath) => {
            return fieldPath.split(/[.\[\]]/).filter(Boolean).reduce((acc, part) => acc && acc[part], errors);
        };

        const activeStepHasErrors = currentStepFields.some(field => hasError(field));

        if (!activeStepHasErrors) {
            setActiveStep((prev) => prev + 1);
            window.scrollTo(0, 0);
        } else {
            // Check if any errors exist in the current step fields
            console.log("Validation failed for step", activeStep, errors);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            // If Shift + Enter is pressed in a textarea, allow a new line
            if (e.target.tagName === "TEXTAREA" && e.shiftKey) {
                return;
            }

            // Otherwise, prevent default (don't add new line) and move to next field
            if (
                (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") &&
                e.target.type !== "submit" &&
                e.target.type !== "button"
            ) {
                e.preventDefault();

                if (!formContainerRef.current) return;

                const allFocusable = Array.from(
                    formContainerRef.current.querySelectorAll("input, select, textarea")
                ).filter((el) => !el.disabled && el.tabIndex !== -1 && el.type !== "hidden" && !el.readOnly);

                const currentIndex = allFocusable.indexOf(e.target);
                if (currentIndex !== -1 && currentIndex < allFocusable.length - 1) {
                    allFocusable[currentIndex + 1].focus();
                } else if (currentIndex === allFocusable.length - 1) {
                    // Specific to multi-step: go to next step if at the end of current step
                    if (activeStep < steps.length - 1) {
                        handleNext();
                    }
                }
            }
        }
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    const renderStep1 = () => (
        <Box>
            <FormSection title="Company Details" icon={Business}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth label="Company Name" size="small"
                            name="companyName"
                            value={formik.values.companyName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                            helperText={formik.touched.companyName && formik.errors.companyName}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth label="Phone" size="small"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            inputProps={{ maxLength: 10 }}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth label="Address" size="small" multiline rows={2}
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                </Grid>
            </FormSection>

            <FormSection title="Company Management" icon={Contacts}>
                {(formik.values.management || []).map((mgr, index) => (
                    <Grid container spacing={2} key={index} sx={{ mb: index === (formik.values.management || []).length - 1 ? 0 : 2 }}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth label={`Name ${index + 1}`} size="small"
                                name={`management[${index}].name`}
                                value={mgr.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.management?.[index]?.name && Boolean(formik.errors.management?.[index]?.name)}
                                helperText={formik.touched.management?.[index]?.name && formik.errors.management?.[index]?.name}
                                sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth label="Title" size="small"
                                name={`management[${index}].title`}
                                value={mgr.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.management?.[index]?.title && Boolean(formik.errors.management?.[index]?.title)}
                                helperText={formik.touched.management?.[index]?.title && formik.errors.management?.[index]?.title}
                                sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth label="Email ID" size="small"
                                name={`management[${index}].email`}
                                value={mgr.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.management?.[index]?.email && Boolean(formik.errors.management?.[index]?.email)}
                                helperText={formik.touched.management?.[index]?.email && formik.errors.management?.[index]?.email}
                                sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            />
                        </Grid>
                    </Grid>
                ))}
            </FormSection>

            <FormSection title="Key Contacts & Statutory Info" icon={Contacts}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth label="Customer Service Contact Name" size="small"
                            name="customerServiceContact.name"
                            value={formik.values.customerServiceContact?.name || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.customerServiceContact?.name && Boolean(formik.errors.customerServiceContact?.name)}
                            helperText={formik.touched.customerServiceContact?.name && formik.errors.customerServiceContact?.name}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth label="Customer Service Email" size="small"
                            name="customerServiceContact.email"
                            value={formik.values.customerServiceContact?.email || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.customerServiceContact?.email && Boolean(formik.errors.customerServiceContact?.email)}
                            helperText={formik.touched.customerServiceContact?.email && formik.errors.customerServiceContact?.email}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth label="Customer Service Phone" size="small"
                            name="customerServiceContact.phone"
                            value={formik.values.customerServiceContact?.phone || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                            inputProps={{ maxLength: 10 }}
                            error={formik.touched.customerServiceContact?.phone && Boolean(formik.errors.customerServiceContact?.phone)}
                            helperText={formik.touched.customerServiceContact?.phone && formik.errors.customerServiceContact?.phone}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth label="Quality Contact Name" size="small"
                            name="qualityContact.name"
                            value={formik.values.qualityContact?.name || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.qualityContact?.name && Boolean(formik.errors.qualityContact?.name)}
                            helperText={formik.touched.qualityContact?.name && formik.errors.qualityContact?.name}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth label="Quality Contact Email" size="small"
                            name="qualityContact.email"
                            value={formik.values.qualityContact?.email || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.qualityContact?.email && Boolean(formik.errors.qualityContact?.email)}
                            helperText={formik.touched.qualityContact?.email && formik.errors.qualityContact?.email}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth label="Quality Contact Phone" size="small"
                            name="qualityContact.phone"
                            value={formik.values.qualityContact?.phone || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                            inputProps={{ maxLength: 10 }}
                            error={formik.touched.qualityContact?.phone && Boolean(formik.errors.qualityContact?.phone)}
                            helperText={formik.touched.qualityContact?.phone && formik.errors.qualityContact?.phone}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth label="Fax No." size="small"
                            name="fax"
                            value={formik.values.fax || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth label="Company Website" size="small"
                            name="website"
                            value={formik.values.website || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth label="VAT / TIN No." size="small"
                            name="vatTin"
                            value={formik.values.vatTin || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth label="PAN No." size="small"
                            name="pan"
                            value={formik.values.pan || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                </Grid>
            </FormSection>

            <FormSection title="Business Status & Financials" icon={AccountBalance}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: "#475569" }}>Business Status</Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    {Object.keys(formik.values.businessStatus || {}).map((key) => (
                        <Grid size={{ xs: 6, md: 3 }} key={key}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={`businessStatus.${key}`}
                                        checked={formik.values.businessStatus[key]}
                                        onChange={formik.handleChange}
                                        size="small"
                                        sx={{ color: '#1172ba', '&.Mui-checked': { color: '#1172ba' } }}
                                    />
                                }
                                label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                sx={{ '& .MuiTypography-root': { fontSize: '0.9rem', fontWeight: 500 } }}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth label="Years in Business" size="small" type="number"
                            name="financials.yearsInBusiness"
                            value={formik.values.financials?.yearsInBusiness || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.financials?.yearsInBusiness && Boolean(formik.errors.financials?.yearsInBusiness)}
                            helperText={formik.touched.financials?.yearsInBusiness && formik.errors.financials?.yearsInBusiness}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth label="Total Employees" size="small" type="number"
                            name="financials.totalEmployees"
                            value={formik.values.financials?.totalEmployees || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.financials?.totalEmployees && Boolean(formik.errors.financials?.totalEmployees)}
                            helperText={formik.touched.financials?.totalEmployees && formik.errors.financials?.totalEmployees}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth label="QA/Control Employees" size="small" type="number"
                            name="financials.qaEmployees"
                            value={formik.values.financials?.qaEmployees || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth label="Revenue (Previous Year)" size="small"
                            name="financials.revenuePrevYear"
                            value={formik.values.financials?.revenuePrevYear || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth label="Revenue (This Year Expected)" size="small"
                            name="financials.revenueThisYear"
                            value={formik.values.financials?.revenueThisYear || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                </Grid>
            </FormSection>

            <FormSection title="Facility Space" icon={LocationOn}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth label="Manufacturing Space" size="small"
                            name="facilities.manufacturingSpace"
                            value={formik.values.facilities?.manufacturingSpace || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth label="Warehouse Space" size="small"
                            name="facilities.warehouseSpace"
                            value={formik.values.facilities?.warehouseSpace || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth label="Laboratory Space" size="small"
                            name="facilities.laboratorySpace"
                            value={formik.values.facilities?.laboratorySpace || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                </Grid>
            </FormSection>
        </Box>
    );

    const renderStep2 = () => (
        <Box>
            <FormSection title="Location & Type" icon={LocationOn}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth label="Parent Company Name & Address" size="small" multiline rows={3}
                            name="parentCompany"
                            value={formik.values.parentCompany || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth label="Other Facility Locations" size="small" multiline rows={3}
                            name="otherLocations"
                            value={formik.values.otherLocations || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                </Grid>
            </FormSection>

            <FormSection title="Type of Supplier" icon={FactCheck}>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 6, md: 3 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="supplierType.product"
                                    checked={formik.values.supplierType?.product || false}
                                    onChange={formik.handleChange}
                                    sx={{ color: '#1172ba', '&.Mui-checked': { color: '#1172ba' } }}
                                />
                            }
                            label="Product Supplier"
                            sx={{ '& .MuiTypography-root': { fontSize: '0.9rem', fontWeight: 600 } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 6, md: 3 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="supplierType.service"
                                    checked={formik.values.supplierType?.service || false}
                                    onChange={formik.handleChange}
                                    sx={{ color: '#1172ba', '&.Mui-checked': { color: '#1172ba' } }}
                                />
                            }
                            label="Service Supplier"
                            sx={{ '& .MuiTypography-root': { fontSize: '0.9rem', fontWeight: 600 } }}
                        />
                    </Grid>
                </Grid>

                {formik.values.supplierType?.product && (
                    <Box sx={{ mb: 4, bgcolor: "rgba(17, 114, 186, 0.04)", p: 3, borderRadius: 2, border: "1px dashed #1172ba" }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "#1172ba" }}>Product Supplier Capabilities</Typography>
                        <Grid container spacing={1}>
                            {Object.keys(formik.values.productCapabilities || {}).filter(k => k !== 'productsDescription').map((key) => (
                                <Grid size={{ xs: 12, md: 6 }} key={key}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                size="small"
                                                name={`productCapabilities.${key}`}
                                                checked={formik.values.productCapabilities[key]}
                                                onChange={formik.handleChange}
                                                sx={{ color: '#1172ba', '&.Mui-checked': { color: '#1172ba' } }}
                                            />
                                        }
                                        label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        sx={{ '& .MuiTypography-root': { fontSize: '0.85rem' } }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <TextField
                            fullWidth label="Describe Products" size="small" multiline rows={2} sx={{ mt: 3, "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            name="productCapabilities.productsDescription"
                            value={formik.values.productCapabilities?.productsDescription || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Box>
                )}

                {formik.values.supplierType?.service && (
                    <Box sx={{ bgcolor: "rgba(17, 114, 186, 0.04)", p: 3, borderRadius: 2, border: "1px dashed #1172ba" }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "#1172ba" }}>Service Supplier Capabilities</Typography>
                        <Grid container spacing={1}>
                            {Object.keys(formik.values.serviceCapabilities || {}).filter(k => k !== 'servicesDescription').map((key) => (
                                <Grid size={{ xs: 12, md: 6 }} key={key}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                size="small"
                                                name={`serviceCapabilities.${key}`}
                                                checked={formik.values.serviceCapabilities[key]}
                                                onChange={formik.handleChange}
                                                sx={{ color: '#1172ba', '&.Mui-checked': { color: '#1172ba' } }}
                                            />
                                        }
                                        label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        sx={{ '& .MuiTypography-root': { fontSize: '0.85rem' } }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <TextField
                            fullWidth label="Describe Services" size="small" multiline rows={2} sx={{ mt: 3, "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            name="serviceCapabilities.servicesDescription"
                            value={formik.values.serviceCapabilities?.servicesDescription || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Box>
                )}
            </FormSection>
        </Box>
    );

    const renderStep3 = () => (
        <Box>
            <FormSection title="References & Major Partners" icon={Description}>
                <Box sx={{ mb: 4 }}>
                    <TextField
                        fullWidth label="Part / Product / Service under consideration" size="small"
                        name="underConsideration"
                        value={formik.values.underConsideration || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                    />
                </Box>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, color: "#475569" }}>
                            Major Customers (at least three required)
                        </Typography>
                        <Grid container spacing={2}>
                            {(formik.values.majorCustomers || []).map((customer, index) => (
                                <Grid size={{ xs: 12, md: 4 }} key={index}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder={`Customer ${index + 1}`}
                                        name={`majorCustomers[${index}]`}
                                        value={customer}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.majorCustomers?.[index] && Boolean(formik.errors.majorCustomers?.[index])}
                                        helperText={formik.touched.majorCustomers?.[index] && formik.errors.majorCustomers?.[index]}
                                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                        InputProps={{
                                            endAdornment: (formik.values.majorCustomers.length > 3) && (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => {
                                                            const newCust = [...formik.values.majorCustomers];
                                                            newCust.splice(index, 1);
                                                            formik.setFieldValue("majorCustomers", newCust);
                                                        }}
                                                        size="small"
                                                        color="error"
                                                    >
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Button
                            startIcon={<Add />}
                            onClick={() => formik.setFieldValue("majorCustomers", [...formik.values.majorCustomers, ""])}
                            sx={{ mt: 1, textTransform: "none", fontWeight: 700, color: "#1172ba" }}
                        >
                            Add Customer
                        </Button>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle2" sx={{ mb: 2, mt: 2, fontWeight: 700, color: "#475569" }}>
                            Major Suppliers (at least three required)
                        </Typography>
                        <Grid container spacing={2}>
                            {(formik.values.majorSuppliers || []).map((supplier, index) => (
                                <Grid size={{ xs: 12, md: 4 }} key={index}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder={`Supplier ${index + 1}`}
                                        name={`majorSuppliers[${index}]`}
                                        value={supplier}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.majorSuppliers?.[index] && Boolean(formik.errors.majorSuppliers?.[index])}
                                        helperText={formik.touched.majorSuppliers?.[index] && formik.errors.majorSuppliers?.[index]}
                                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                        InputProps={{
                                            endAdornment: (formik.values.majorSuppliers.length > 3) && (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => {
                                                            const newSupp = [...formik.values.majorSuppliers];
                                                            newSupp.splice(index, 1);
                                                            formik.setFieldValue("majorSuppliers", newSupp);
                                                        }}
                                                        size="small"
                                                        color="error"
                                                    >
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Button
                            startIcon={<Add />}
                            onClick={() => formik.setFieldValue("majorSuppliers", [...formik.values.majorSuppliers, ""])}
                            sx={{ mt: 1, textTransform: "none", fontWeight: 700, color: "#1172ba" }}
                        >
                            Add Supplier
                        </Button>
                    </Grid>
                </Grid>
            </FormSection>

            <FormSection title="Sign Off" icon={FactCheck}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth label="Name" size="small"
                            name="signOff.name"
                            value={formik.values.signOff?.name || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.signOff?.name && Boolean(formik.errors.signOff?.name)}
                            helperText={formik.touched.signOff?.name && formik.errors.signOff?.name}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth label="Position" size="small"
                            name="signOff.position"
                            value={formik.values.signOff?.position || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.signOff?.position && Boolean(formik.errors.signOff?.position)}
                            helperText={formik.touched.signOff?.position && formik.errors.signOff?.position}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth label="Date" size="small" type="date" InputLabelProps={{ shrink: true }}
                            name="signOff.date"
                            value={formik.values.signOff?.date || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.signOff?.date && Boolean(formik.errors.signOff?.date)}
                            helperText={formik.touched.signOff?.date && formik.errors.signOff?.date}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                </Grid>
            </FormSection>

            <Box sx={{ mt: 4, p: 3, bgcolor: "rgba(17, 114, 186, 0.05)", borderRadius: 2, border: "1px solid rgba(17, 114, 186, 0.3)" }}>
                <Typography variant="subtitle2" sx={{ color: "#1172ba", fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FactCheck fontSize="small" /> For Internal Use Only (Scanbo Technologies Inc.)
                </Typography>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth label="Reviewed By" size="small" variant="outlined"
                            name="scanboReview.reviewedBy"
                            value={formik.values.scanboReview?.reviewedBy || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth label="Review Date" size="small" variant="outlined" type="date" InputLabelProps={{ shrink: true }}
                            name="scanboReview.reviewedDate"
                            value={formik.values.scanboReview?.reviewedDate || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth label="Approved By" size="small" variant="outlined"
                            name="scanboReview.approvedBy"
                            value={formik.values.scanboReview?.approvedBy || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth label="Approval Date" size="small" variant="outlined" type="date" InputLabelProps={{ shrink: true }}
                            name="scanboReview.approvedDate"
                            value={formik.values.scanboReview?.approvedDate || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );

    return (
        <CommonCard title={isEdit ? "Edit Supplier Survey" : "New Supplier Survey"}>
            <Box onKeyDown={handleKeyDown} ref={formContainerRef}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel
                                StepIconProps={{
                                    sx: {
                                        "&.Mui-active": { color: "#1172ba" },
                                        "&.Mui-completed": { color: "#1172ba" },
                                    },
                                }}
                            >
                                <Typography variant="body2" fontWeight={700}>
                                    {label}
                                </Typography>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ minHeight: "400px", mt: 4 }}>
                    {activeStep === 0 && renderStep1()}
                    {activeStep === 1 && renderStep2()}
                    {activeStep === 2 && renderStep3()}
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        startIcon={<ArrowBack />}
                        sx={{
                            borderRadius: 2,
                            px: 4,
                            py: 1.2,
                            textTransform: "none",
                            fontWeight: 700,
                            color: "#64748b",
                            "&:hover": { bgcolor: "#f1f5f9" },
                            visibility: activeStep === 0 ? "hidden" : "visible",
                        }}
                    >
                        Previous
                    </Button>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => router.push("/supplier-survey")}
                            sx={{
                                px: 4,
                                py: 1.2,
                                fontWeight: 700,
                                borderRadius: 2,
                                textTransform: "none",
                                borderColor: "#e2e8f0",
                                color: "#64748b",
                            }}
                        >
                            Cancel
                        </Button>
                        {activeStep === steps.length - 1 ? (
                            <Button
                                variant="contained"
                                startIcon={<Save />}
                                sx={{
                                    px: 6,
                                    py: 1.2,
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                                    textTransform: "none",
                                    boxShadow: "0 4px 12px rgba(17, 114, 186, 0.2)",
                                }}
                                onClick={formik.handleSubmit}
                            >
                                {isEdit ? "Update Survey" : "Submit Survey"}
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                endIcon={<ArrowForward />}
                                sx={{
                                    backgroundColor: "#1172ba",
                                    borderRadius: 2,
                                    px: 6,
                                    py: 1.2,
                                    textTransform: "none",
                                    fontWeight: 700,
                                }}
                            >
                                Next Step
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
            <SupplierSurveyPreviewDialog
                open={showPreview}
                onClose={() => setShowPreview(false)}
                onConfirm={handleFinalSubmit}
                data={formik.values}
                isEdit={isEdit}
            />
        </CommonCard>
    );
};

export default SupplierSurveyForm;
