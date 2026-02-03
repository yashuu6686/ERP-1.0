import React from "react";
import { Stack, Button, Tooltip, Box } from "@mui/material";
import { ArrowBack, Print, Edit, CheckCircle, Schedule, Cancel } from "@mui/icons-material";

const PurchaseViewHeader = ({
    router,
    id,
    status,
    user,
    handleApprove,
    handleReject
}) => {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "fle  x-start", sm: "center" }}
            spacing={2}
            sx={{ mb: 3 }}
            className="no-print"
        >
            <Button
                startIcon={<ArrowBack />}
                onClick={() => router.push("/purchase")}
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
                Back to Orders
            </Button>

            <Stack direction="row" spacing={1.5}>
                <Tooltip title="Print Order">
                    <Button
                        variant="outlined"
                        startIcon={<Print />}
                        onClick={() => window.print()}
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

                {user?.role === "admin" && status === "Pending Approval" && (
                    <>
                        <Button
                            variant="contained"
                            onClick={handleApprove}
                            sx={{
                                borderRadius: "12px",
                                textTransform: "none",
                                fontWeight: 600,
                                bgcolor: "#059669",
                                "&:hover": { bgcolor: "#047857" },
                                boxShadow: "0 4px 12px rgba(5, 150, 105, 0.25)",
                            }}
                        >
                            Approve PO
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleReject}
                            sx={{
                                borderRadius: "12px",
                                textTransform: "none",
                                fontWeight: 600,
                                color: "#dc2626",
                                borderColor: "#fee2e2",
                                bgcolor: "#fff1f2",
                                "&:hover": { borderColor: "#fecaca", bgcolor: "#ffe4e6" },
                            }}
                        >
                            Reject
                        </Button>
                    </>
                )}

                <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => router.push(`/purchase/create-purchase?id=${id}`)}
                    disabled={status === "Completed"}
                    sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 600,
                        background: status === "Completed" ? "#f1f5f9" : "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                        boxShadow: status === "Completed" ? "none" : "0 4px 12px rgba(17, 114, 186, 0.25)",
                        "&.Mui-disabled": {
                            bgcolor: "#f1f5f9",
                            color: "#94a3b8"
                        },
                        "&:hover": {
                            background: "linear-gradient(135deg, #0d5a94 0%, #0a4571 100%)",
                            boxShadow: "0 6px 16px rgba(17, 114, 186, 0.35)",
                        },
                    }}
                >
                    Edit Order
                </Button>
            </Stack>
        </Stack>
    );
};

export default PurchaseViewHeader;
