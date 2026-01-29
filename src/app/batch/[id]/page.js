"use client";
import React from "react";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import CommonCard from "../../../components/CommonCard";
import BatchDetailsTable from "./components/BatchDetailsTable";

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
        <Box>
            <CommonCard title={`Batch Details: ${id || ""}`}>
                <BatchDetailsTable data={batchDetailsData} />
            </CommonCard>
        </Box>
    );
}
