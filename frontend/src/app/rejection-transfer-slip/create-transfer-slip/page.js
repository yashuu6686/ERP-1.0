"use client";

import React, { useRef, Suspense } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Save from "@mui/icons-material/Save";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import CommonCard from "../../../components/ui/CommonCard";
import TransferSlipTable from "../components/TransferSlipTable";
import BatchProcessInfo from "../components/BatchProcessInfo";
import ProductDetailsInfo from "../components/ProductDetailsInfo";
import ApprovalSection from "../components/ApprovalSection";
import Loader from "../../../components/ui/Loader";

const validationSchema = Yup.object().shape({
    batchReceivedDate: Yup.date().required("Batch Received Date is required"),
    bmrNo: Yup.string().required("BMR No. is required"),
    batchNo: Yup.string().required("Batch No. is required"),
    serialNo: Yup.string().required("Serial No. is required"),
    mfgDate: Yup.date().required("Manufacturing Date is required"),
    expiryDate: Yup.date().required("Expiry Date is required"),
    productName: Yup.string().required("Name of Product is required"),
    batchQty: Yup.number().typeError("Batch Qty must be a number").required("Batch Qty is required"),
    items: Yup.array().of(
        Yup.object().shape({
            description: Yup.string().required("Description is required"),
        })
    ).min(1, "At least one item is required"),
});

function RejectionTransferSlipContent() {
    const formContainerRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            batchReceivedDate: new Date().toISOString().split("T")[0],
            bmrNo: "",
            batchNo: "",
            serialNo: "",
            mfgDate: "",
            expiryDate: "",
            productName: "",
            batchQty: "",
            items: [{ description: "", batchNo: "", qtyIssued: "", qtyReceived: "", remarks: "" }],
            reviewedBy: "",
            approvedBy: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log("Form Values:", values);
            alert("Rejection Material Transfer Slip Created Successfully!");
        },
    });

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (e.target.tagName === "TEXTAREA" && e.shiftKey) return;
            if (
                (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") &&
                e.target.type !== "submit" &&
                e.target.type !== "button"
            ) {
                e.preventDefault();
                const allFocusable = Array.from(
                    formContainerRef.current.querySelectorAll("input, select, textarea")
                ).filter((el) => !el.disabled && el.tabIndex !== -1 && el.type !== "hidden" && !el.readOnly);

                const currentIndex = allFocusable.indexOf(e.target);
                if (currentIndex !== -1 && currentIndex < allFocusable.length - 1) {
                    allFocusable[currentIndex + 1].focus();
                }
            }
        }
    };

    return (
        <FormikProvider value={formik}>
            <Box
                onKeyDown={handleKeyDown}
                ref={formContainerRef}
                sx={{
                    p: { xs: 1, md: 3 },
                    bgcolor: "#f8fafc",
                    minHeight: "100vh"
                }}
            >
                <CommonCard
                    title="Rejection Material Transfer Slip"
                // sx={{
                //     "& .MuiCardHeader-root": {
                //         background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                //         color: "white",

                //     }
                // }}
                >
                    <Box sx={{ p: { xs: 1, md: 2 } }}>
                        <BatchProcessInfo />
                        <ProductDetailsInfo />
                        <TransferSlipTable />
                        <ApprovalSection />

                        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2, pb: 4 }}>
                            <Button
                                variant="contained"
                                startIcon={<Save />}
                                onClick={formik.handleSubmit}
                                sx={{
                                    backgroundColor: "#1172ba",
                                    "&:hover": { backgroundColor: "#0d5a94" },
                                    borderRadius: 2,
                                    px: 5,
                                    py: 1.5,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    boxShadow: "0 4px 12px rgba(17, 114, 186, 0.2)"
                                }}
                            >
                                Save Transfer Slip
                            </Button>
                        </Box>
                    </Box>
                </CommonCard>
            </Box>
        </FormikProvider>
    );
}

export default function RejectionMaterialTransferSlip() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading Transfer Slip..." />}>
            <RejectionTransferSlipContent />
        </Suspense>
    );
}
