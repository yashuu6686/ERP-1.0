"use client";
import React, { useState, useEffect } from "react";
import { Box, Chip, Typography, IconButton, Button } from "@mui/material";
import { Visibility, Add } from "@mui/icons-material";
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
            const response = await axiosInstance.get("/suppliers");
            // Only show Approved/Active suppliers for Ongoing Evaluation
            const activeSuppliers = (response.data || []).filter(item =>
                ['approved', 'active'].includes((item.status || '').toLowerCase())
            );
            setData(activeSuppliers);
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
        { label: "Sr. No.", align: "center", render: (row, i) => <Typography variant="body2" sx={{ color: "#64748b" }}>{page * rowsPerPage + i + 1}</Typography> },
        { label: "Supplier Name", align: "left", render: (row) => <Typography variant="body2" fontWeight={600}>{row.supplierName}</Typography> },
        { label: "Evaluation No.", align: "center", render: (row) => <Typography variant="body2" fontWeight={700} color="#1172ba">{row.evaluationNo}</Typography> },
        { label: "Contact Person", align: "center", accessor: "contactPerson" },
        {
            label: "Status",
            align: "center",
            render: (row) => (
                <Chip label={row.status} size="small" sx={{ fontWeight: 800, fontSize: "0.65rem", borderRadius: 1.5, bgcolor: "#dcfce7", color: "#15803d" }} />
            )
        },
        {
            label: "Actions",
            align: "center",
            render: (row) => (
                <IconButton size="small" color="primary" onClick={() => router.push(`/suppliers/view-evaluation?id=${row.id}`)}>
                    <Visibility fontSize="small" />
                </IconButton>
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
                    onClick={() => router.push("/suppliers/ongoing-evaluation")}
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
