"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import BOMTable from "./components/BOMTable";

const bomData = [
  {
    id: 1,
    number: "BOM-001",
    date: "02-02-2025",
    approvedBy: "Name",
  },
  {
    id: 2,
    number: "BOM-002",
    date: "02-02-2025",
    approvedBy: "Name",
  },
];

export default function BOMList() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = bomData.filter((b) =>
    b.number.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <CommonCard
        title="Bill of Materials (BOM)"
        addText="Create New BOM"
        onAdd={() => router.push("/bom/create-bom")}
        searchPlaceholder="Search BOM Number"
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <BOMTable
          data={filtered}
          onView={(id) => router.push(`/bom/${id}`)}
        />
      </CommonCard>
    </Box>
  );
}
