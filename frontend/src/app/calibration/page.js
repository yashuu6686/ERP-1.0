"use client";
import React, { useState } from "react";
import {
    Box,
    Typography,
    Chip,
    Stack,
    Tooltip,
    IconButton,
    Select,
    MenuItem,
    Button
} from "@mui/material";
import {
    Edit,
    FilterList,
    CheckCircle,
    Warning,
    EventNote,
    Description,
    Visibility
} from "@mui/icons-material";
import GlobalTable from "@/components/ui/GlobalTable";
import CommonCard from "@/components/ui/CommonCard";
import { useRouter } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import NotificationService from "@/services/NotificationService";
import Loader from "@/components/ui/Loader";

export default function CalibrationMasterPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    React.useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await axiosInstance.get("/calibration-equipment");
                setEquipment(response.data || []);
            } catch (error) {
                console.error("Failed to fetch equipment:", error);
                NotificationService.notify("Error", "Failed to load equipment list", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchEquipment();
    }, []);



    const filteredEquipment = equipment.filter((item) => {
        const matchesSearch =
            item.equipmentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.masterId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            filterStatus === "All" || item.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const paginatedEquipment = filteredEquipment.slice(
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
            label: "Equipment Details",
            render: (row) => (
                <Box>
                    <Typography variant="body2" fontWeight={700} color="#1e293b">{row.equipmentName}</Typography>
                    <Typography variant="caption" color="#64748b" sx={{ fontFamily: 'monospace' }}>{row.masterId}</Typography>
                </Box>
            )
        },
        {
            label: "Frequency",
            align: "center",
            render: (row) => (
                <Chip
                    label={row.frequency}
                    size="small"
                    sx={{
                        fontWeight: 700,
                        bgcolor: "#f1f5f9",
                        color: "#475569",
                        borderRadius: 1.5
                    }}
                />
            )
        },
        {
            label: "Location",
            render: (row) => (
                <Typography variant="body2" sx={{ color: "#1e293b" }}>
                    {row.location}
                </Typography>
            )
        },
        {
            label: "Last Calibration",
            align: "center",
            render: (row) => (
                <Box>
                    <Typography variant="body2" fontWeight={600} color="#334155">
                        {new Date(row.lastCalibration).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        })}
                    </Typography>
                    <Typography variant="caption" color="#64748b">{row.calibratedBy}</Typography>
                </Box>
            )
        },
        {
            label: "Due Date",
            align: "center",
            render: (row) => (
                <Typography
                    variant="body2"
                    fontWeight={700}
                    color={new Date(row.dueDate) < new Date() ? "#ef4444" : "#334155"}
                >
                    {new Date(row.dueDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    })}
                </Typography>
            )
        },
        {
            label: "Status",
            align: "center",
            render: (row) => {
                const isDueSoon = new Date(row.dueDate) < new Date(new Date().setDate(new Date().getDate() + 30));
                const isOverdue = new Date(row.dueDate) < new Date();

                let color = "#10b981";
                let bgcolor = "#dcfce7";
                let label = "Calibrated";
                let icon = <CheckCircle sx={{ fontSize: 16 }} />;

                if (row.status === "Failed") {
                    color = "#b91c1c";
                    bgcolor = "#fee2e2";
                    label = "Out of Service";
                    icon = <Warning sx={{ fontSize: 16 }} />;
                } else if (isOverdue) {
                    color = "#b91c1c";
                    bgcolor = "#fee2e2";
                    label = "Overdue";
                    icon = <Warning sx={{ fontSize: 16 }} />;
                } else if (isDueSoon) {
                    color = "#a16207";
                    bgcolor = "#fef9c3";
                    label = "Due Soon";
                    icon = <EventNote sx={{ fontSize: 16 }} />;
                }

                return (
                    <Chip
                        icon={icon}
                        label={label}
                        size="small"
                        sx={{
                            bgcolor: bgcolor,
                            color: color,
                            fontWeight: 800,
                            fontSize: "0.65rem",
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                            borderRadius: 1.5
                        }}
                    />
                );
            }
        },
        {
            label: "Actions",
            align: "center",
            render: (row) => (
                <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                    <IconButton
                        size="small"
                        onClick={() => router.push(`/calibration/records/${row.id}`)}
                        sx={{
                            color: "rgb(17, 114, 186)",
                            bgcolor: "#f1f5f9",
                            "&:hover": { bgcolor: "#e2e8f0" }
                        }}
                    >
                        <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => router.push(`/calibration/register-equipment?id=${row.id}`)}
                        sx={{
                            color: "rgb(17, 114, 186)",
                            bgcolor: "#f1f5f9",
                            "&:hover": { bgcolor: "#e2e8f0" }
                        }}
                    >
                        <Edit sx={{ fontSize: 16 }} />
                    </IconButton>
                </Box>
            )
        }
    ];

    return (
        <Box>
            <CommonCard
                title="Calibration Master List"
                addText="Register Equipment"
                onAdd={() => router.push("/calibration/register-equipment")}
                searchPlaceholder="Search equipment, ID or location..."
                searchValue={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                searchExtra={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Select
                            size="small"
                            value={filterStatus}
                            onChange={(e) => {
                                setFilterStatus(e.target.value);
                                setPage(0);
                            }}
                            startAdornment={<FilterList sx={{ mr: 1, color: "#6b7280" }} />}
                            sx={{ borderRadius: "8px", minWidth: "150px" }}
                        >
                            <MenuItem value="All">All Status</MenuItem>
                            <MenuItem value="Calibrated">Calibrated</MenuItem>
                            <MenuItem value="Due Soon">Due Soon</MenuItem>
                            <MenuItem value="Failed">Out of Service</MenuItem>
                        </Select>
                        <Tooltip title="View Document Revision History">
                            <Button
                                variant="text"
                                startIcon={<Description fontSize="small" />}
                                onClick={() => router.push('/calibration/revision-history')}
                                size="small"
                                sx={{
                                    bgcolor: "#eff6ff", // Blue-50
                                    color: "#1172ba", // Primary Blue
                                    textTransform: "none",
                                    fontWeight: 600,
                                    "&:hover": {
                                        bgcolor: "#dbeafe", // Blue-100
                                    },
                                    height: "40px",
                                    px: 2.5,
                                    borderRadius: 2
                                }}
                            >
                                Revisions
                            </Button>
                        </Tooltip>
                    </Box>
                }
            >
                {loading ? (
                    <Loader message="Loading equipment..." />
                ) : (
                    <GlobalTable
                        columns={columns}
                        data={paginatedEquipment}
                        totalCount={filteredEquipment.length}
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
