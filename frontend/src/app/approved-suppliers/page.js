"use client";
import React, { useState, useEffect } from "react";
import { Box, Chip, Typography, IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "@/components/ui/CommonCard";
import GlobalTable from "@/components/ui/GlobalTable";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";

export default function ApprovedSuppliersPage() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/evaluation");
            const allEvaluations = response.data || [];

            // Filter where supplierApproved is "yes"
            const approved = allEvaluations.filter(item =>
                item.supplierApproved === "yes"
            );

            setData(approved);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        } finally {
            setLoading(false);
        }
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filtered = data.filter((item) =>
        (item.supplierName || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.evaluationNo || "").toLowerCase().includes(search.toLowerCase())
    );

    const paginatedSuppliers = filtered.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const columns = [
        {
            label: "Sr. No.",
            align: "center",
            render: (row, index) => (
                <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
                    {page * rowsPerPage + index + 1}
                </Typography>
            ),
        },
        {
            label: "Supplier Name",
            align: "left",
            render: (row) => (
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {row.supplierName}
                </Typography>
            ),
        },
        {
            label: "Evaluation No.",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#1172ba" }}>
                    {row.evaluationNo}
                </Typography>
            ),
        },
        {
            label: "Contact Person",
            align: "center",
            accessor: "contactPerson",
        },
        {
            label: "Phone",
            align: "center",
            accessor: "phone",
        },
        {
            label: "Approved",
            align: "center",
            render: (row) => (
                <Chip
                    label="Approved"
                    size="small"
                    sx={{
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        borderRadius: 1.5,
                        bgcolor: "#dcfce7",
                        color: "#15803d"
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
                        onClick={() => router.push(`/initial-evaluation/view-evaluation?id=${row.id}`)}
                        sx={{
                            color: "rgb(17, 114, 186)",
                            bgcolor: "#f1f5f9",
                            "&:hover": { bgcolor: "#e2e8f0" },
                        }}
                        title="View Supplier Evaluation"
                    >
                        <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => router.push(`/approved-suppliers/ongoing-checklist?id=${row.id}`)}
                        sx={{
                            color: "rgb(5, 150, 105)",
                            bgcolor: "#f1f5f9",
                            "&:hover": { bgcolor: "#e2e8f0" },
                        }}
                        title="Ongoing Evaluation Checklist"
                    >
                        <Visibility fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <CommonCard
                title="Approved Suppliers List"
                searchPlaceholder="Search Approved Supplier..."
                searchValue={search}
                onSearchChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0);
                }}
            >
                {loading ? (
                    <Loader message="Loading Approved Suppliers..." />
                ) : (
                    <GlobalTable
                        columns={columns}
                        data={paginatedSuppliers}
                        totalCount={filtered.length}
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
