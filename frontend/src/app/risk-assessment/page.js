"use client";
import React, { useState, useEffect } from 'react';
import { Box, Chip, Typography, IconButton, Button } from "@mui/material";
import { Visibility, Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "@/components/ui/CommonCard";
import GlobalTable from "@/components/ui/GlobalTable";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";

export default function RiskAssessmentPage() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchAssessments();
    }, []);

    const fetchAssessments = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/risk-assessments");
            setData(response.data || []);
        } catch (error) {
            console.error("Error fetching assessments:", error);
        } finally {
            setLoading(false);
        }
    };

    const filtered = data.filter((item) =>
        (item.supplierName || "").toLowerCase().includes(search.toLowerCase())
    );

    const paginatedData = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const columns = [
        { label: "Sr. No.", align: "center", render: (row, i) => <Typography variant="body2" sx={{ color: "#64748b" }}>{page * rowsPerPage + i + 1}</Typography> },
        { label: "Supplier Name", align: "left", render: (row) => <Typography variant="body2" fontWeight={600}>{row.supplierName}</Typography> },
        { label: "Classification", align: "center", render: (row) => <Chip label={row.classification} size="small" color={row.classification === 'Critical' ? 'error' : 'success'} /> },
        { label: "Risk Category", align: "center", render: (row) => <Chip label={row.riskCategory} size="small" sx={{ fontWeight: 700 }} /> },
        { label: "Date", align: "center", accessor: "assessmentDate" },
        {
            label: "Actions",
            align: "center",
            render: (row) => (
                <IconButton size="small" color="primary" onClick={() => router.push(`/risk-assessment/view?id=${row.id}`)}>
                    <Visibility fontSize="small" />
                </IconButton>
            )
        }
    ];

    return (
        <CommonCard
            title="Risk Assessment"
            addText="New Assessment"
            onAdd={() => router.push("/risk-assessment/create")}
            searchPlaceholder="Search Supplier..."
            searchValue={search}
            onSearchChange={(e) => { setSearch(e.target.value); setPage(0); }}
        >
            {loading ? <Loader message="Loading Assessments..." /> : (
                <GlobalTable
                    columns={columns}
                    data={paginatedData}
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
