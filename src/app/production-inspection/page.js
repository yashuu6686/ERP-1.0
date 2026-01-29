"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import InspectionListTable from "./components/InspectionListTable";

const inspectionData = [
  {
    id: 1,
    checkNo: "FIN-INS-0001",
    checkedQty: 20,
    acceptedQty: 18,
    rejectedQty: 2,
    result: "Pass / Fail / Conditional",
    date: "01 Jan 2026",
    remarks: "description",
    approvedBy: "QC Head",
  },
  {
    id: 2,
    checkNo: "FIN-INS-0002",
    checkedQty: 20,
    acceptedQty: 15,
    rejectedQty: 5,
    result: "Pass / Fail / Conditional",
    date: "01 Jan 2026",
    remarks: "description",
    approvedBy: "QC Head",
  },
];

export default function AfterProductionInspection() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = inspectionData.filter((i) =>
    i.checkNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <CommonCard
        title="After Production Inspection Management"
        addText="Start Quality Check"
        onAdd={() =>
          router.push("/production-inspection/after-production-quality-check")
        }
        searchPlaceholder="Search Quality Check No..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <InspectionListTable
          data={filtered}
          onView={(id) => router.push(`/production-inspection/${id}`)}
        />
      </CommonCard>
    </Box>
  );
}
