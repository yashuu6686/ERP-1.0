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
import CommonCard from "@/components/ui/CommonCard";
import GlobalTable from "@/components/ui/GlobalTable";
import Loader from "@/components/ui/Loader";

export default function BMRListPage() {
    const router = useRouter();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data based on BMR context
        const mockData = [
            { id: 1, bmrNo: "BMR/2025/001", batchNo: "BN20250210", productName: "Device Alpha", date: "2025-02-10", status: "Approved" },
            { id: 2, bmrNo: "BMR/2025/002", batchNo: "BN20250212", productName: "Device Beta", date: "2025-02-12", status: "Reviewed" },
            { id: 3, bmrNo: "BMR/2025/003", batchNo: "BN20250215", productName: "Device Gamma", date: "2025-02-15", status: "Pending" },
        ];

        setTimeout(() => {
            setRecords(mockData);
            setLoading(false);
        }, 600);
    }, []);

    const columns = [
        {
            label: "Sr.No.",
            align: "center",
            render: (row, index) => (
                <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
                    {index + 1}
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
                    <IconButton size="small" sx={{ color: "var(--brand-primary)", bgcolor: "#f1f5f9" }}>
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
            >
                {loading ? (
                    <Loader message="Loading BMR records..." />
                ) : (
                    <GlobalTable
                        columns={columns}
                        data={records}
                        totalCount={records.length}
                        page={0}
                        rowsPerPage={10}
                        onPageChange={() => { }}
                        onRowsPerPageChange={() => { }}
                    />
                )}
            </CommonCard>
        </Box>
    );
}
