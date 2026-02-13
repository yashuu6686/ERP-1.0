"use client";
import React, { useState } from "react";
import {
    Box,
    Typography,
    IconButton,
    Tooltip,
    Paper
} from "@mui/material";
import {
    ArrowBack,
    FileDownload
} from "@mui/icons-material";
import GlobalTable from "@/components/ui/GlobalTable";
import CommonCard from "@/components/ui/CommonCard";
import { useRouter } from "next/navigation";

export default function RevisionHistoryPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const mockRevisionData = [
        {
            id: 1,
            revNo: "00",
            author: "Quality Team",
            description: "Initial release of QSP18 - Control of Measuring and Monitoring Equipment",
            updatedAt: "2023-01-01",
            approvedBy: "Quality Director",
            formAffected: "FRM18-01, FRM18-02"
        },
        {
            id: 2,
            revNo: "01",
            author: "Calibration Manager",
            description: "Added external calibration laboratory requirements and certificate tracking",
            updatedAt: "2023-06-15",
            approvedBy: "Quality Director",
            formAffected: "FRM18-01"
        },
        {
            id: 3,
            revNo: "02",
            author: "Quality Team",
            description: "Updated calibration frequency for temperature-sensitive equipment",
            updatedAt: "2024-01-10",
            approvedBy: "Quality Director",
            formAffected: "FRM18-01"
        }
    ];

    const filteredRevisions = mockRevisionData.filter((rev) => {
        const matchesSearch =
            rev.revNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rev.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rev.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const paginatedRevisions = filteredRevisions.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const columns = [
        {
            label: "Sr.No.",
            align: "center",
            render: (row, index) => (
                <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
                    {page * rowsPerPage + index + 1}
                </Typography>
            ),
        },
        {
            label: "Rev No",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#1172ba", fontWeight: 700, fontFamily: 'monospace' }}>
                    {row.revNo}
                </Typography>
            ),
        },
        {
            label: "Date",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#334155", fontWeight: 500 }}>
                    {new Date(row.updatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    })}
                </Typography>
            ),
        },
        {
            label: "Author",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#1e293b" }}>
                    {row.author}
                </Typography>
            ),
        },
        {
            label: "Description of Change",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#475569", maxWidth: 400 }}>
                    {row.description}
                </Typography>
            ),
        },
        {
            label: "Forms Affected",
            align: "center",
            render: (row) => (
                <Typography variant="caption" sx={{ color: "#64748b", fontFamily: 'monospace' }}>
                    {row.formAffected}
                </Typography>
            ),
        },
        {
            label: "Approved By",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#1e293b", fontWeight: 600 }}>
                    {row.approvedBy}
                </Typography>
            ),
        }
    ];

    return (
        <Box>
            {/* Header with Back Button */}
            <Paper sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, border: '1px solid #e2e8f0' }}>
                <Tooltip title="Back to Calibration">
                    <IconButton
                        onClick={() => router.push('/calibration')}
                        sx={{
                            color: "rgb(17, 114, 186)",
                            bgcolor: "#f1f5f9",
                            "&:hover": { bgcolor: "#e2e8f0" }
                        }}
                    >
                        <ArrowBack />
                    </IconButton>
                </Tooltip>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={700} color="#1e293b">
                        QSP 18 - Revision History
                    </Typography>
                    <Typography variant="caption" color="#64748b">
                        Document change log for Control of Measuring and Monitoring Equipment
                    </Typography>
                </Box>
                <Tooltip title="Export Revision History">
                    <IconButton
                        size="small"
                        sx={{
                            color: "#0891b2",
                            bgcolor: "#ecfeff",
                            "&:hover": { bgcolor: "#cffafe" }
                        }}
                    >
                        <FileDownload fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Paper>

            <CommonCard
                title="Document Revisions"
                searchPlaceholder="Search revision number, author, description..."
                searchValue={searchTerm}
                onSearchChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(0);
                }}
            >
                <GlobalTable
                    columns={columns}
                    data={paginatedRevisions}
                    totalCount={filteredRevisions.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setPage}
                    onRowsPerPageChange={(val) => {
                        setRowsPerPage(val);
                        setPage(0);
                    }}
                />
            </CommonCard>
        </Box>
    );
}
