"use client";
export const dynamic = "force-dynamic";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FilterList from "@mui/icons-material/FilterList";
import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import Download from "@mui/icons-material/Download";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/ui/CommonCard";
import GlobalTable from "../../components/ui/GlobalTable";
import Loader from "../../components/ui/Loader";
import axiosInstance from "@/axios/axiosInstance";

export default function SOPTrackingTable() {
    const router = useRouter();
    const [sops, setSops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchSops();
    }, []);

    const fetchSops = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/sops");
            setSops(response.data || []);
        } catch (error) {
            console.error("Failed to fetch SOPs:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredSops = sops.filter((sop) => {
        const matchesSearch =
            (sop.sopNumber || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (sop.deviceId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (sop.companyName || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "All" || sop.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const paginatedSops = filteredSops.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

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
            label: "SOP Number",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#1172ba", fontWeight: 700 }}>
                    {row.sopNumber}
                </Typography>
            ),
        },
        {
            label: "Date",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#334155", fontWeight: 500 }}>
                    {row.date}
                </Typography>
            ),
        },
        {
            label: "Device ID",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#1e293b", fontWeight: 500 }}>
                    {row.deviceId}
                </Typography>
            ),
        },
        {
            label: "Company",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#475569" }}>
                    {row.companyName}
                </Typography>
            ),
        },
        {
            label: "Testing By",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#475569" }}>
                    {row.testingBy}
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
                        onClick={() => router.push(`/sop/view-sop?id=${row.id}`)}
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
                        onClick={() => router.push(`/sop/create-sop?id=${row.id}`)}
                        sx={{ color: "rgb(17, 114, 186)", bgcolor: "#f1f5f9", "&:hover": { bgcolor: "#e2e8f0" } }}
                    >
                        <Edit sx={{ fontSize: 16 }} />
                    </IconButton>
                    <Tooltip title="Download Report">
                        <IconButton
                            size="small"
                            sx={{
                                color: "#0891b2",
                                bgcolor: "#ecfeff",
                                "&:hover": { bgcolor: "#cffafe" },
                            }}
                        >
                            <Download fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <CommonCard
                title="SOP Tracking List"
                addText="Create New SOP"
                onAdd={() => router.push("/sop/create-sop")}
                searchPlaceholder="Search SOP, Device, Company..."
                searchValue={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                searchExtra={
                    <Select
                        size="small"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        startAdornment={<FilterList sx={{ mr: 1, color: "#6b7280" }} />}
                        sx={{ borderRadius: "8px", minWidth: "150px" }}
                    >
                        <MenuItem value="All">All Status</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                    </Select>
                }
            >
                {loading ? (
                    <Loader message="Loading SOP Tracking Data..." />
                ) : (
                    <GlobalTable
                        columns={columns}
                        data={paginatedSops}
                        totalCount={filteredSops.length}
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
