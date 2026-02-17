"use client";

import React, { useState, useEffect, Suspense } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/ui/CommonCard";
import GlobalTable from "../../components/ui/GlobalTable";
import Loader from "../../components/ui/Loader";
import axiosInstance from "@/axios/axiosInstance";
import { useNotification } from "@/context/NotificationContext";

function LineClearanceChecklistListContent() {
    const router = useRouter();
    const [checklists, setChecklists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { showNotification } = useNotification();

    const fetchChecklists = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/line-clearance-checklist");
            setChecklists(response.data || []);
        } catch (error) {
            console.error("Failed to fetch checklists:", error);
            showNotification("Failed to fetch checklists.", "error");
        } finally {
            setLoading(false);
        }
    }, [showNotification]);

    useEffect(() => {
        fetchChecklists();
    }, [fetchChecklists]);

    const filteredData = checklists.filter((item) =>
        (item.checklistNo || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.bmrNo || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.batchNo || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedData = filteredData.slice(
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
            label: "Checklist No.",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#1172ba", fontWeight: 700 }}>
                    {row.checklistNo}
                </Typography>
            ),
        },
        {
            label: "BMR No.",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#334155", fontWeight: 600 }}>
                    {row.bmrNo}
                </Typography>
            ),
        },
        {
            label: "Batch No.",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#1e293b" }}>
                    {row.batchNo}
                </Typography>
            ),
        },
        {
            label: "Date",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#475569" }}>
                    {row.date}
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
                        onClick={() => router.push(`/line-clearance-checklist/view?id=${row.id}`)}
                        sx={{ color: "#1172ba", bgcolor: "#f1f5f9", "&:hover": { bgcolor: "#e2e8f0" } }}
                    >
                        <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => router.push(`/line-clearance-checklist/create?id=${row.id}`)}
                        sx={{ color: "#1172ba", bgcolor: "#f1f5f9", "&:hover": { bgcolor: "#e2e8f0" } }}
                    >
                        <Edit sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{ color: "#ef4444", bgcolor: "#fef2f2", "&:hover": { bgcolor: "#fee2e2" } }}
                    >
                        <Delete fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <CommonCard
                title="Line Clearance Checklists"
                addText="Create Checklist"
                onAdd={() => router.push("/line-clearance-checklist/create")}
                searchPlaceholder="Search No, BMR, Batch..."
                searchValue={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
            >
                {loading ? (
                    <Loader message="Loading Checklists..." />
                ) : (
                    <GlobalTable
                        columns={columns}
                        data={paginatedData}
                        totalCount={filteredData.length}
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

export default function LineClearanceChecklistList() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <LineClearanceChecklistListContent />
        </Suspense>
    );
}
