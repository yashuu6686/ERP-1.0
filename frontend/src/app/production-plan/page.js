"use client";
import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    useMediaQuery,
    useTheme,
    Chip,
    IconButton,
    Tooltip,
} from "@mui/material";
import {
    EventNote,
    Visibility,
    Edit,
    Delete,
    Download,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "@/components/ui/CommonCard";
import GlobalTable from "@/components/ui/GlobalTable";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";

const getStatusColor = (status) => {
    switch (status) {
        case "Completed":
            return { bg: "#d4edda", color: "#155724" };
        case "In Progress":
            return { bg: "#d1ecf1", color: "#0c5460" };
        case "Pending":
            return { bg: "#fff3cd", color: "#856404" };
        case "Cancelled":
            return { bg: "#f8d7da", color: "#721c24" };
        default:
            return { bg: "#e2e3e5", color: "#383d41" };
    }
};

const formatDate = (dateString) => {
    if (!dateString || dateString === "-") return "-";
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    } catch (e) {
        return dateString;
    }
};

export default function ProductionPlanList() {
    const router = useRouter();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/production-plans");
            setPlans(response.data || []);
        } catch (error) {
            console.error("Failed to fetch production plans:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const filtered = plans.filter(
        (item) =>
            item.productName?.toLowerCase().includes(search.toLowerCase()) ||
            item.finalAssyName?.toLowerCase().includes(search.toLowerCase()) ||
            item.remarks?.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedData = filtered.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const columns = [
        {
            label: "Sr.No.",
            align: "center",
            sx: { width: "60px" },
            render: (row, index) => <span style={{ color: "#6c757d" }}>{page * rowsPerPage + index + 1}</span>,
        },
        {
            label: "Product Name",
            align: "center",
            render: (row) => <Typography variant="body2" sx={{ fontWeight: 600, color: "#1172ba" }}>{row.productName || "-"}</Typography>,
        },
        {
            label: "Qty.",
            align: "center",
            render: (row) => row.quantity || "-",
        },
        {
            label: "Serial No Range",
            align: "center",
            render: (row) => `${row.serialNoFrom || "-"} to ${row.serialNoTo || "-"}`,
        },
        {
            label: "Final Assy Name",
            align: "center",
            render: (row) => row.finalAssyName || "-",
        },
        {
            label: "Planned Qty",
            align: "center",
            render: (row) => row.plannedQty || "-",
        },
        {
            label: "Start Date",
            align: "center",
            render: (row) => formatDate(row.startDate),
        },
        {
            label: "Target Date",
            align: "center",
            render: (row) => formatDate(row.targetDate),
        },
        {
            label: "Status",
            align: "center",
            render: (row) => {
                const { bg, color } = getStatusColor(row.status);
                return (
                    <Chip
                        label={row.status || "Pending"}
                        size="small"
                        sx={{
                            backgroundColor: bg,
                            color: color,
                            fontWeight: 600,
                            fontSize: "0.75rem",
                        }}
                    />
                );
            },
        },
        {
            label: "Actions",
            align: "center",
            render: (row) => (
                <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={() => router.push(`/production-plan/view-production-plan?id=${row.id}`)}
                    >
                        <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton
                        color="warning"
                        size="small"
                        onClick={() => router.push(`/production-plan/create-production-plan?id=${row.id}`)}
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <CommonCard
                title="Production Plans"
                addText={isSmall ? "Create" : "Create Production Plan"}
                onAdd={() => router.push("/production-plan/create-production-plan")}
                searchPlaceholder="Search Product, Assy Name, Remarks..."
                searchValue={search}
                onSearchChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0);
                }}
            >
                {loading ? (
                    <Loader message="Loading production plans..." />
                ) : (
                    <GlobalTable
                        columns={columns}
                        data={paginatedData}
                        // onRowClick={(row) => router.push(`/production-plan/view-production-plan?id=${row.id}`)}
                        
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
