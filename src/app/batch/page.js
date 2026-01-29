"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import BatchListTable from "./components/BatchListTable";

const batchData = [
  {
    id: 1,
    batchNo: "BAT-2026-01-005",
    requestNo: "Material Issue Request 2026-001",
    checkNo: "D8",
    productSr: "From to to",
    acceptedQty: 18,
    status: "Ready",
  },
  {
    id: 2,
    batchNo: "BAT-2026-01-005",
    requestNo: "Material Issue Request 2026-001",
    checkNo: "D8",
    productSr: "From to to",
    acceptedQty: 18,
    status: "Ready",
  },
];

export default function Batch() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = batchData.filter(
    (b) =>
      b.batchNo.toLowerCase().includes(search.toLowerCase()) ||
      b.requestNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <CommonCard
        title="Batch"
        onAdd={null}
        searchPlaceholder="Search Batch No..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <BatchListTable
          data={filtered}
          onView={(id) => router.push(`/batch/${id}`)}
        />
      </CommonCard>
    </Box>
  );
}
