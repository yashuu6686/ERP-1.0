"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import CommonCard from "../../components/CommonCard";
import GRNListTable from "./components/GRNListTable";
import CreateGRNDialog from "./components/CreateGRNDialog";

export default function GRNTable() {
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    grnNumber: "",
    poNumber: "",
    invoiceNumber: "",
    receivedDate: "",
    itemName: "",
    quantity: "",
    receivedBy: "",
    supplierName: "",
  });

  const [open, setOpen] = useState(false);

  const grnData = [
    {
      id: 1,
      grn: "GRN/2025002",
      po: "SIPL/2025019",
      invoice: "SIPL/2025019",
      item: "Tally Prime Silver Single User (Virtual License)",
      date: "20-03-2025",
      receivedBy: "aj",
      supplier: "ABC",
      qty: 2,
    },
    {
      id: 2,
      grn: "GRN/2025001",
      po: "STC/2025018",
      invoice: "STC/2025018",
      item: "Tally Prime Silver Single User (Virtual License)",
      date: "10-02-2025",
      receivedBy: "vk",
      supplier: "XYZ",
      qty: 1,
    },
  ];

  const filtered = grnData.filter(
    (g) =>
      g.grn.toLowerCase().includes(search.toLowerCase()) ||
      g.po.toLowerCase().includes(search.toLowerCase()) ||
      g.supplier.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("GRN Data:", form);
    alert("GRN Saved Successfully!");
    setOpen(false);
  };

  return (
    <Box>
      <CommonCard
        title="Goods Receipt Note (GRN)"
        addText="Create GRN"
        onAdd={() => setOpen(true)}
        searchPlaceholder="Search GRN"
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <GRNListTable data={filtered} />

        <CreateGRNDialog
          open={open}
          handleClose={() => setOpen(false)}
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </CommonCard>
    </Box>
  );
}
