"use client";
import React, { useState, useEffect } from "react";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import { Visibility, Edit, Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/ui/CommonCard";
import GlobalTable from "../../components/ui/GlobalTable";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "../../components/ui/Loader";

export default function SuppliersPage() {
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
            setData(response.data || []);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        } finally {
            setLoading(false);
        }
    };

    const filtered = data.filter((item) =>
        (item.supplierName || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.evaluationNo || "").toLowerCase().includes(search.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case "Approved":
                return { bgcolor: "#dcfce7", color: "#15803d" };
            case "Rejected":
                return { bgcolor: "#fee2e2", color: "#b91c1c" };
            case "Pending":
                return { bgcolor: "#fef9c3", color: "#a16207" };
            default:
                return { bgcolor: "#f1f5f9", color: "#64748b" };
        }
    };

    const columns = [
        {
            label: "Sr. No.",
            align: "center",
            render: (row, index) => (
                <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
                    {index + 1}
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
            label: "Supplier Name",
            align: "left",
            render: (row) => (
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {row.supplierName}
                </Typography>
            ),
        },
        {
            label: "City",
            align: "center",
            accessor: "city",
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
            label: "Status",
            align: "center",
            render: (row) => (
                <Chip
                    label={row.status || "Pending"}
                    size="small"
                    sx={{
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        borderRadius: 1.5,
                        ...getStatusColor(row.status),
                    }}
                />
            ),
        },
        {
            label: "Evaluation Date",
            align: "center",
            accessor: "evaluationDate",
        },
        {
            label: "Actions",
            align: "center",
            render: (row) => (
                <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                    <IconButton
                        size="small"
                        onClick={() => router.push(`/suppliers/view-evaluation?id=${row.id}`)}
                        sx={{
                            color: "rgb(17, 114, 186)",
                            bgcolor: "#f1f5f9",
                            "&:hover": { bgcolor: "#e2e8f0" },
                        }}
                    >
                        <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => router.push(`/suppliers/create-evaluation?id=${row.id}`)}
                        sx={{
                            color: "rgb(17, 114, 186)",
                            bgcolor: "#f1f5f9",
                            "&:hover": { bgcolor: "#e2e8f0" },
                        }}
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
                title="Supplier Evaluation Management"
                addText="New Evaluation"
                onAdd={() => router.push("/suppliers/create-evaluation")}
                searchPlaceholder="Search Supplier or Evaluation No..."
                searchValue={search}
                onSearchChange={(e) => setSearch(e.target.value)}
            >
                {loading ? (
                    <Loader message="Loading Suppliers..." />
                ) : (
                    <GlobalTable columns={columns} data={filtered} />
                )}
            </CommonCard>
        </Box>
    );
}
