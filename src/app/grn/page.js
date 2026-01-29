"use client";
import React, { useState } from "react";
import { Box, Typography, Chip } from "@mui/material";
import CommonCard from "../../components/CommonCard";
import GlobalTable from "../../components/GlobalTable";
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

  const columns = [
    {
      label: "Sr.No.",
      align: "center",
      render: (row, index) => index + 1,
    },
    {
      label: "GRN Number",
      align: "center",
      render: (row) => (
        <Typography variant="body2" sx={{ color: "#1172ba", fontWeight: 600 }}>
          {row.grn}
        </Typography>
      ),
    },
    {
      label: "PO Number",
      align: "center",
      accessor: "po",
    },
    {
      label: "Invoice Number",
      align: "center",
      accessor: "invoice",
    },
    {
      label: "Item Name",
      align: "center",
      accessor: "item",
      sx: { maxWidth: 280 },
    },
    {
      label: "Received Date",
      align: "center",
      accessor: "date",
    },
    {
      label: "Received By",
      align: "center",
      render: (row) => <Chip label={row.receivedBy} size="small" />,
    },
    {
      label: "Supplier",
      align: "center",
      accessor: "supplier",
    },
    {
      label: "Quantity",
      align: "center",
      render: (row) => (
        <Chip
          label={row.qty}
          color="success"
          size="small"
          sx={{ fontWeight: 600 }}
        />
      ),
    },
  ];

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
        <GlobalTable columns={columns} data={filtered} />

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
