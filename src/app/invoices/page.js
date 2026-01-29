"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import InvoiceListTable from "./components/InvoiceListTable";

const invoicesData = [
  {
    id: 1,
    invoiceNo: "INV-001",
    invoiceDate: "10 Jan 2026",
    dueDate: "20 Jan 2026",
    customer: "ABC Pvt Ltd",
    product: "Product A",
    status: "Generated",
    total: 25000,
    paid: 15000,
    balance: 10000,
    paymentStatus: "Partial",
    orderDate: "05 Jan 2026",
  },
  {
    id: 2,
    invoiceNo: "INV-002",
    invoiceDate: "12 Jan 2026",
    dueDate: "22 Jan 2026",
    customer: "XYZ Industries",
    product: "Product B",
    status: "Generated",
    total: 18000,
    paid: 18000,
    balance: 0,
    paymentStatus: "Paid",
    orderDate: "08 Jan 2026",
  },
];

export default function Invoices() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = invoicesData.filter(
    (inv) =>
      inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      inv.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <CommonCard
        title="Invoices"
        addText="Generate Invoice"
        onAdd={() => router.push("/invoices/generate-invoice")}
        searchPlaceholder="Search Invoice No, Customer..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <InvoiceListTable data={filtered} />
      </CommonCard>
    </Box>
  );
}
