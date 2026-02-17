"use client";

import React, { useState, useEffect, Suspense } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import Download from "@mui/icons-material/Download";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/ui/CommonCard";
import GlobalTable from "../../components/ui/GlobalTable";
import Loader from "../../components/ui/Loader";
import axiosInstance from "@/axios/axiosInstance";
import { useNotification } from "@/context/NotificationContext";

function RejectionTransferSlipListContent() {
    const router = useRouter();
    const [slips, setSlips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { showNotification } = useNotification();

    const fetchSlips = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/rejection-transfer-slips");
            setSlips(response.data || []);
        } catch (error) {
            console.error("Failed to fetch slips:", error);
            showNotification("Failed to fetch transfer slips.", "error");
        } finally {
            setLoading(false);
        }
    }, [showNotification]);

    useEffect(() => {
        fetchSlips();
    }, [fetchSlips]);

    const filteredSlips = slips.filter((slip) =>
        slip.bmrNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slip.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slip.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedSlips = filteredSlips.slice(
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
            label: "Rejection Transfer Slip No.",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#1172ba", fontWeight: 700 }}>
                    {row.slipNo}
                </Typography>
            ),
        },
        {
            label: "BMR No.",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#1172ba", fontWeight: 700 }}>
                    {row.bmrNo}
                </Typography>
            ),
        },
        {
            label: "Batch No.",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#334155", fontWeight: 600 }}>
                    {row.batchNo}
                </Typography>
            ),
        },
        {
            label: "Product Name",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#1e293b" }}>
                    {row.productName}
                </Typography>
            ),
        },
        {
            label: "Received Date",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#475569" }}>
                    {row.batchReceivedDate}
                </Typography>
            ),
        },
        {
            label: "Status",
            align: "center",
            render: (row) => (
                <Chip
                    label={row.status}
                    size="small"
                    sx={{
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        borderRadius: 1.5,
                        bgcolor: row.status === "Completed" ? "#dcfce7" : "#fef9c3",
                        color: row.status === "Completed" ? "#15803d" : "#a16207",
                    }}
                />
            ),
        },
        {
            label: "Actions",
            align: "center",
            render: (row) => (
                <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                    <IconButton
                        size="small"
                        onClick={() => router.push(`/rejection-transfer-slip/view-transfer-slip?id=${row.id}`)}
                        sx={{ color: "#1172ba", bgcolor: "#f1f5f9", "&:hover": { bgcolor: "#e2e8f0" } }}
                    >
                        <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => router.push(`/rejection-transfer-slip/create-transfer-slip?id=${row.id}`)}
                        sx={{ color: "#1172ba", bgcolor: "#f1f5f9", "&:hover": { bgcolor: "#e2e8f0" } }}
                    >
                        <Edit sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{ color: "#0891b2", bgcolor: "#ecfeff", "&:hover": { bgcolor: "#cffafe" } }}
                    >
                        <Download fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <CommonCard
                title="Rejection Material Transfer Slips"
                addText="Create Transfer Slip"
                onAdd={() => router.push("/rejection-transfer-slip/create-transfer-slip")}
                searchPlaceholder="Search BMR, Batch, Product..."
                searchValue={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
            >
                {loading ? (
                    <Loader message="Loading Slips..." />
                ) : (
                    <GlobalTable
                        columns={columns}
                        data={paginatedSlips}
                        totalCount={filteredSlips.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={setPage}
                        onRowsPerPageChange={(val) => {
                            setRowsPerPage(val);
                            setPage(0);
                        }}
                    />
                )}
            </CommonCard>
        </Box>
    );
}

export default function RejectionTransferSlipList() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <RejectionTransferSlipListContent />
        </Suspense>
    );
}
