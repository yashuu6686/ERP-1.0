"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import OrderListTable from "./components/OrderListTable";

const ordersData = [
  {
    id: 1,
    orderNo: "SO-001",
    products: 5,
    customerName: "ABC Pvt Ltd",
    orderDate: "05 Jan 2026",
    contact: "9876543210",
    address: "Mumbai, India",
    deliveryDate: "15 Jan 2026",
    status: "Pending",
    reference: "REF-001",
  },
  {
    id: 2,
    orderNo: "SO-002",
    products: 3,
    customerName: "XYZ Industries",
    orderDate: "08 Jan 2026",
    contact: "9123456789",
    address: "Pune, India",
    deliveryDate: "18 Jan 2026",
    status: "Completed",
    reference: "REF-002",
  },
];

export default function CustomerOrders() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = ordersData.filter(
    (o) =>
      o.orderNo.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <CommonCard
        title="Customer Order"
        addText="Create Order"
        onAdd={() => router.push("/orders/create-new-order")}
        searchPlaceholder="Search Order No, Customer..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <OrderListTable
          data={filtered}
          onView={(id) => router.push(`/orders/${id}`)}
        />
      </CommonCard>
    </Box>
  );
}
