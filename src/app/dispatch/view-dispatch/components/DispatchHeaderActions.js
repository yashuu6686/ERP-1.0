"use client";
import React from "react";
import { Stack, Button, Tooltip } from "@mui/material";
import { ArrowBack, Cancel, CheckCircle, Download, Print, Edit } from "@mui/icons-material";

export default function DispatchHeaderActions({
    user,
    status,
    onBack,
    onReject,
    onApprove,
    onPrint,
    onEdit
}) {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }} className="no-print">
            <Button
                startIcon={<ArrowBack />}
                onClick={onBack}
                sx={{
                    color: "#64748b",
                    fontWeight: 600,
                    textTransform: "none",
                    bgcolor: "rgba(255,255,255,0.8)",
                    px: 2,
                    borderRadius: '12px',
                    backdropFilter: "blur(4px)",
                    border: '1px solid #e2e8f0',
                    "&:hover": { bgcolor: "#f1f5f9", borderColor: "#cbd5e1" },
                }}
            >
                Back
            </Button>

            <Stack direction="row" spacing={1.5}>
                {user?.role === 'admin' && status === 'Pending Approval' && (
                    <>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<Cancel />}
                            onClick={onReject}
                            sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700 }}
                        >
                            Reject
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<CheckCircle />}
                            onClick={onApprove}
                            sx={{
                                borderRadius: "10px",
                                textTransform: "none",
                                fontWeight: 700,
                                bgcolor: "#16a34a",
                                "&:hover": { bgcolor: "#15803d" }
                            }}
                        >
                            Approve Entry
                        </Button>
                    </>
                )}
                <Tooltip title="Download Waybill">
                    <Button
                        variant="outlined"
                        startIcon={<Download />}
                        sx={{
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: 600,
                            color: "#475569",
                            borderColor: "#e2e8f0",
                            bgcolor: "white",
                            "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
                        }}
                    >
                        Download
                    </Button>
                </Tooltip>
                <Tooltip title="Print Manifest">
                    <Button
                        variant="outlined"
                        startIcon={<Print />}
                        onClick={onPrint}
                        sx={{
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: 600,
                            color: "#475569",
                            borderColor: "#e2e8f0",
                            bgcolor: "white",
                            "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
                        }}
                    >
                        Print
                    </Button>
                </Tooltip>
                <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={onEdit}
                    sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 600,
                        background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                        boxShadow: "0 4px 12px rgba(17, 114, 186, 0.25)",
                        "&:hover": {
                            background: "linear-gradient(135deg, #0d5a94 0%, #0a4571 100%)",
                            boxShadow: "0 6px 16px rgba(17, 114, 186, 0.35)",
                        },
                    }}
                >
                    Edit Tracking
                </Button>
            </Stack>
        </Stack>
    );
}
