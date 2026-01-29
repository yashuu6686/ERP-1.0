"use client";
import React from "react";
import { Box, Chip } from "@mui/material";
import { useParams } from "next/navigation";
import CommonCard from "../../../components/CommonCard";
import GlobalTable from "../../../components/GlobalTable";

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

    const columns = [
        {
            label: "Serial No",
            align: "center",
            accessor: "serial",
        },
        {
            label: "Product Name",
            align: "center",
            accessor: "product",
        },
        {
            label: "Batch Number",
            align: "center",
            render: (row) => (
                <span style={{ fontWeight: 600, color: "#1172ba" }}>
                    {row.batchNo}
                </span>
            ),
        },
        {
            label: "Material Issue Req No",
            align: "center",
            accessor: "requestNo",
        },
        {
            label: "Location",
            align: "center",
            accessor: "location",
        },
        {
            label: "Status",
            align: "center",
            render: (row) => (
                <Chip label={row.status} color="success" size="small" />
            ),
        },
    ];

    return (
        <Box>
            <CommonCard title={`Batch Details: ${id || ""}`}>
                <GlobalTable columns={columns} data={batchDetailsData} />
            </CommonCard>
        </Box>
    );
}
