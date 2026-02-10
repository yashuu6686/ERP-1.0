"use client";
import React, { useState, useEffect } from "react";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import { Visibility, Edit } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/ui/CommonCard";
import GlobalTable from "../../components/ui/GlobalTable";
import Loader from "../../components/ui/Loader";
import axiosInstance from "../../axios/axiosInstance";

export default function SupplierSurveyListPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/supplier-surveys");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching supplier surveys:", error);
            // Fallback to empty array if error
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filtered = data.filter((item) =>
        (item.companyName || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.reviewedBy || "").toLowerCase().includes(search.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return { bgcolor: "#dcfce7", color: "#15803d" }; // Green
            case "Rejected":
                return { bgcolor: "#fee2e2", color: "#b91c1c" }; // Red
            case "Pending":
                return { bgcolor: "#fef9c3", color: "#a16207" }; // Yellow
            default:
                return { bgcolor: "#f1f5f9", color: "#64748b" }; // Grey
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
            label: "Company Name",
            align: "left",
            render: (row) => (
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {row.companyName}
                </Typography>
            ),
        },
        {
            label: "Survey Date",
            align: "center",
            accessor: "surveyDate",
            render: (row) => row.signOff?.date || row.surveyDate || "N/A"
        },
        {
            label: "Reviewed By",
            align: "center",
            render: (row) => row.scanboReview?.reviewedBy || row.reviewedBy || "N/A"
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
            label: "Actions",
            align: "center",
            render: (row) => (
                <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                    <IconButton
                        size="small"
                        onClick={() => router.push(`/supplier-survey/view?id=${row.id}`)}
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
                        onClick={() => router.push(`/supplier-survey/create?id=${row.id}`)}
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
                title="Supplier Surveys"
                addText="New Survey"
                onAdd={() => router.push("/supplier-survey/create")}
                searchPlaceholder="Search Company or Reviewer..."
                searchValue={search}
                onSearchChange={(e) => setSearch(e.target.value)}
            >
                {loading ? (
                    <Loader message="Loading Surveys..." />
                ) : (
                    <GlobalTable columns={columns} data={filtered} />
                )}
            </CommonCard>
        </Box>
    );
}
