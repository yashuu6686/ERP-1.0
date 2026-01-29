"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import FinalInspectionListTable from "./components/FinalInspectionListTable";

const finalQualityData = [
  {
    id: 1,
    inspectionNo: "FIN-INS-0001",
    total: 20,
    approved: 18,
    rejected: 2,
    result: "Pass",
    date: "01 Jan 2026",
    remarks: "description",
    approvedBy: "QC Head",
    approvalDate: "20",
  },
  {
    id: 2,
    inspectionNo: "FIN-INS-0002",
    total: 20,
    approved: 18,
    rejected: 2,
    result: "Conditional",
    date: "01 Jan 2026",
    remarks: "description",
    approvedBy: "QC Head",
    approvalDate: "30",
  },
];

export default function FinalQualityCheck() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = finalQualityData.filter((item) =>
    item.inspectionNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <CommonCard
        title="Final Quality Check List"
        addText="Add Final Check"
        onAdd={() => router.push("/final-inspection/create-final-inspection")}
        searchPlaceholder="Search Inspection No..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <FinalInspectionListTable data={filtered} />
      </CommonCard>
    </Box>
  );
}
