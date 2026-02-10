import React from "react";
import { Stack, Button, Tooltip } from "@mui/material";
import { ArrowBack, Print, Edit, Download } from "@mui/icons-material";

const SurveyViewHeader = ({ router, id, status }) => {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
            sx={{ mb: 3 }}
            className="no-print"
        >
            <Button
                startIcon={<ArrowBack />}
                onClick={() => router.push("/supplier-survey")}
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
                Back to Surveys
            </Button>

            <Stack direction="row" spacing={1.5}>
                <Tooltip title="Print Survey">
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

                <Tooltip title="Download PDF">
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

                <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => router.push(`/supplier-survey/create?id=${id}`)}
                    disabled={status === "Approved"}
                    sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 600,
                        background: status === "Approved" ? "#f1f5f9" : "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                        boxShadow: status === "Approved" ? "none" : "0 4px 12px rgba(17, 114, 186, 0.25)",
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
                    Edit Survey
                </Button>
            </Stack>
        </Stack>
    );
};

export default SurveyViewHeader;
