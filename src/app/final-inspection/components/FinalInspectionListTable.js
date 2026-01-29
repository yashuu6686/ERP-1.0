import React from "react";
import {
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    IconButton,
} from "@mui/material";
import { Visibility, Edit, Download } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const FinalInspectionListTable = ({ data }) => {
    const router = useRouter();

    return (
        <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
                <TableHead sx={{ bgcolor: "#f3f4f6" }}>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Sr. No.
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Final Inspection No
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Total Checked
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Approved
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Rejected
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Result
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Checking Date
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Remarks
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Approved By
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Approval Date
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={row.id}>
                            <TableCell align="center">{i + 1}</TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 600, color: "#1172ba" }}
                            >
                                {row.inspectionNo}
                            </TableCell>
                            <TableCell align="center">{row.total}</TableCell>
                            <TableCell align="center">{row.approved}</TableCell>
                            <TableCell align="center">{row.rejected}</TableCell>
                            <TableCell align="center">
                                <Chip
                                    label={row.result}
                                    color={
                                        row.result === "Pass"
                                            ? "success"
                                            : row.result === "Fail"
                                                ? "error"
                                                : "warning"
                                    }
                                    size="small"
                                />
                            </TableCell>
                            <TableCell align="center">{row.date}</TableCell>
                            <TableCell align="center">{row.remarks}</TableCell>
                            <TableCell align="center">{row.approvedBy}</TableCell>
                            <TableCell align="center">{row.approvalDate}</TableCell>
                            <TableCell align="center">
                                <Box
                                    sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}
                                >
                                    <IconButton
                                        size="small"
                                        onClick={() => router.push(`/final-inspection/${row.id}`)}
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
                                        sx={{
                                            color: "#dc2626",
                                            bgcolor: "#fef2f2",
                                            "&:hover": { bgcolor: "#fee2e2" },
                                        }}
                                    >
                                        <Edit fontSize="small" />
                                    </IconButton>
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
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}

                    {data.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={11} align="center">
                                No records found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Box>
    );
};

export default FinalInspectionListTable;
