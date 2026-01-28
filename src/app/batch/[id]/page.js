"use client";
import React from "react";
import {
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
} from "@mui/material";
import { useParams } from "next/navigation";
import CommonCard from "../../../components/CommonCard";

const batchDetailsData = [
    {
        serial: 1,
        product: "D8",
        batchNo: "BAT-2026-01-005",
        requestNo: "Material Issue Request 2026-001",
        location: "Store",
        status: "Ready",
    },
    {
        serial: 2,
        product: "D8",
        batchNo: "BAT-2026-01-006",
        requestNo: "Material Issue Request 2026-001",
        location: "Store",
        status: "Ready",
    },
];

export default function BatchDetails() {
    const params = useParams();
    const id = params?.id;

    return (
        <CommonCard title={`Batch Details: ${id || ""}`}>
            <Box sx={{ overflowX: "auto" }}>
                <Table size="small">
                    <TableHead sx={{ bgcolor: "#f3f4f6" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 400 }}>Serial No</TableCell>
                            <TableCell sx={{ fontWeight: 400 }}>Product Name</TableCell>
                            <TableCell sx={{ fontWeight: 400 }}>Batch Number</TableCell>
                            <TableCell sx={{ fontWeight: 400 }}>
                                Material Issue Req No
                            </TableCell>
                            <TableCell sx={{ fontWeight: 400 }}>Location</TableCell>
                            <TableCell sx={{ fontWeight: 400 }}>Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {batchDetailsData.map((row, i) => (
                            <TableRow key={i} hover>
                                <TableCell>{row.serial}</TableCell>
                                <TableCell>{row.product}</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: "#1172ba" }}>
                                    {row.batchNo}
                                </TableCell>
                                <TableCell>{row.requestNo}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>
                                    <Chip label={row.status} color="success" size="small" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </CommonCard>
    );
}
