"use client";
import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Chip,
    IconButton,
} from "@mui/material";
import { Visibility, Edit, Assignment } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import { useNotification } from "@/context/NotificationContext";
import CommonCard from "@/components/ui/CommonCard";
import GlobalTable from "@/components/ui/GlobalTable";
import Loader from "@/components/ui/Loader";

export default function BMRListPage() {
    const router = useRouter();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showNotification } = useNotification();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchBMRRecords();
    }, []);

    const fetchBMRRecords = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/production-bmr");
            setRecords(response.data || []);
        } catch (error) {
            console.error("Error fetching BMR records:", error);
            showNotification("Failed to fetch BMR records from server", "error");
        } finally {
            setLoading(false);
        }
    };

    const filteredRecords = records.filter((item) =>
        (item.bmrNo || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.productName || "").toLowerCase().includes(search.toLowerCase())
    );

    const paginatedRecords = filteredRecords.slice(
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
            label: "BMR No.",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ fontWeight: 700, color: "var(--brand-primary)" }}>
                    {row.bmrNo}
                </Typography>
            ),
        },
        { label: "Batch No.", align: "center", accessor: "batchNo" },
        { label: "Product Name", align: "center", accessor: "productName" },
        {
            label: "Date",
            align: "center",
            render: (row) => (
                <Typography variant="body2">
                    {new Date(row.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    })}
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
                        borderRadius: 1.5,
                        bgcolor: row.status === "Approved" ? "#dcfce7" : row.status === "Pending" ? "#fef9c3" : "#f1f5f9",
                        color: row.status === "Approved" ? "#15803d" : row.status === "Pending" ? "#a16207" : "#475569",
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
                        sx={{ color: "var(--brand-primary)", bgcolor: "#f1f5f9" }}
                        onClick={() => router.push(`/production/bmr/view/${row.id}`)}
                    >
                        <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{ color: "var(--brand-primary)", bgcolor: "#f1f5f9" }}
                        onClick={() => router.push(`/production/bmr/create?id=${row.id}`)}
                    >
                        <Edit sx={{ fontSize: 16 }} />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <CommonCard
                title="Batch Manufacturing Records"
                icon={<Assignment sx={{ mr: 1, color: "var(--brand-primary)" }} />}
                addText="Create New BMR"
                onAdd={() => router.push("/production/bmr/create")}
                searchPlaceholder="Search by BMR No or Product..."
                searchValue={search}
                onSearchChange={(e) => { setSearch(e.target.value); setPage(0); }}
            >
                {loading ? (
                    <Loader message="Loading BMR records..." />
                ) : (
                    <GlobalTable
                        columns={columns}
                        data={paginatedRecords}
                        totalCount={filteredRecords.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={setPage}
                        onRowsPerPageChange={(val) => { setRowsPerPage(val); setPage(0); }}
                    />
                )}
            </CommonCard>
        </Box>
    );
}
