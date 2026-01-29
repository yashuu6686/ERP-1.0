"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import InspectionListTable from "./components/InspectionListTable";

export default function IncomingInspection() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const inspections = [
    {
      id: 1,
      inspectionNo: "002",
      date: "20-03-2025",
      grn: "SIPL/2025019",
      supplier: "abc",
      serial: "220",
      receivedQty: 220,
      checkedQty: 220,
      notes: "description",
      accepted: 200,
      rejected: 20,
      checkedBy: "-",
    },
    {
      id: 2,
      inspectionNo: "001",
      date: "10-02-2025",
      grn: "SIPL/2025018",
      supplier: "xyz",
      serial: "330",
      receivedQty: 330,
      checkedQty: 330,
      notes: "description",
      accepted: 300,
      rejected: 30,
      checkedBy: "vk",
    },
  ];

  const filtered = inspections.filter(
    (i) =>
      i.inspectionNo.includes(search) ||
      i.grn.toLowerCase().includes(search.toLowerCase()) ||
      i.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <CommonCard
        title="Incoming Inspection"
        addText="Add Material Inspection"
        onAdd={() => router.push("/incoming-inspection/add-material-inspection")}
        searchPlaceholder="Search Inspections"
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <InspectionListTable data={filtered} />
      </CommonCard>
    </Box>
  );
}
