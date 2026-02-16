"use client";
import React, { useState, useEffect } from "react";
import { Box, Chip, Typography, IconButton, Button } from "@mui/material";
import { Visibility, Add, Edit } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "@/components/ui/CommonCard";
import GlobalTable from "@/components/ui/GlobalTable";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";

export default function OngoingEvaluationListPage() {
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
            const response = await axiosInstance.get("/ongoing-evaluation");
            setData(response.data || []);
        } catch (error) {
            console.error("Error fetching evaluations:", error);
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
            render: (row, i) => (
                <Typography variant="body2" sx={{ color: "#64748b" }}>
                    {page * rowsPerPage + i + 1}
                </Typography>
            )
        },
        { label: "Supplier Name", align: "left", render: (row) => <Typography variant="body2" fontWeight={600}>{row.supplierName}</Typography> },
        { label: "Evaluation Period", align: "center", render: (row) => <Typography variant="body2">{row.evaluationPeriod}</Typography> },
        { label: "Contact Person", align: "center", accessor: "contactPerson" },
        {
            label: "Result",
            align: "center",
            render: (row) => (
                <Chip
                    label={row.evaluationResult || "Pending"}
                    size="small"
                    sx={{
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        borderRadius: 1.5,
                        bgcolor: row.evaluationResult?.includes('Not') ? "#fee2e2" : "#dcfce7",
                        color: row.evaluationResult?.includes('Not') ? "#b91c1c" : "#15803d"
                    }}
                />
            )
        },
        {
            label: "Date",
            align: "center",
            render: (row) => <Typography variant="body2">{row.date}</Typography>
        },
        {
            label: "Actions",
            align: "center",
            render: (row) => (
                <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                    <IconButton
                        size="small"
                        onClick={() => router.push(`/ongoing-evaluation/view?id=${row.id}`)}
                        sx={{ color: "#1172ba", bgcolor: "#f1f5f9", "&:hover": { bgcolor: "#e2e8f0" } }}
                        title="View"
                    >
                        <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => router.push(`/ongoing-evaluation/edit?id=${row.id}`)}
                        sx={{ color: "#059669", bgcolor: "#f1f5f9", "&:hover": { bgcolor: "#e2e8f0" } }}
                        title="Edit"
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                </Box>
            )
        }
    ];

    return (
        <CommonCard
            title="Ongoing Evaluation List"
            searchPlaceholder="Search Supplier..."
            searchValue={search}
            onSearchChange={(e) => { setSearch(e.target.value); setPage(0); }}
            action={
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => router.push("/ongoing-evaluation/create")}
                    sx={{ bgcolor: "#059669", "&:hover": { bgcolor: "#047857" }, textTransform: "none" }}
                >
                    New Ongoing Evaluation
                </Button>
            }
        >
            {loading ? <Loader message="Loading..." /> : (
                <GlobalTable
                    columns={columns}
                    data={paginatedSuppliers}
                    totalCount={filtered.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setPage}
                    onRowsPerPageChange={(val) => { setRowsPerPage(val); setPage(0); }}
                />
            )}
        </CommonCard>
    );
}
