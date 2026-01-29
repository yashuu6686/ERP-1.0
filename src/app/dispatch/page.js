"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LocalShipping } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import DispatchTable from "./components/DispatchTable";
import DispatchMobileCard from "./components/DispatchMobileCard";

const dispatchData = [
  {
    id: 1,
    order: "SO-001",
    product: "D8 Machine",
    status: "Shipped",
    orderDate: "2026-01-10",
    shippingDate: "2026-01-12",
    platform: "Direct Sales",
    contact: "Ramesh Kumar",
    address: "Mumbai, Maharashtra, India",
    tracking: "TRK-889900",
  },
  {
    id: 2,
    order: "SO-002",
    product: "Valve System",
    status: "Pending",
    orderDate: "2026-01-11",
    shippingDate: "-",
    platform: "Online",
    contact: "Suresh Patel",
    address: "Pune, Maharashtra, India",
    tracking: "-",
  },
  {
    id: 3,
    order: "SO-003",
    product: "Hydraulic Pump",
    status: "Processing",
    orderDate: "2026-01-15",
    shippingDate: "-",
    platform: "Direct Sales",
    contact: "Amit Sharma",
    address: "Delhi, India",
    tracking: "-",
  },
  {
    id: 4,
    order: "SO-004",
    product: "Control Panel",
    status: "Delivered",
    orderDate: "2026-01-08",
    shippingDate: "2026-01-10",
    platform: "Online",
    contact: "Priya Singh",
    address: "Bangalore, Karnataka, India",
    tracking: "TRK-778899",
  },
];

export default function DispatchDetails() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const filtered = dispatchData.filter(
    (item) =>
      item.order.toLowerCase().includes(search.toLowerCase()) ||
      item.product.toLowerCase().includes(search.toLowerCase()) ||
      item.contact.toLowerCase().includes(search.toLowerCase()) ||
      item.tracking.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <CommonCard
        title="Dispatch Details"
        addText={isSmall ? "Create" : "Create Dispatch Entry"}
        onAdd={() => router.push("/dispatch/create-dispatch-entry")}
        searchPlaceholder="Search Order, Product, Contact, Tracking..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        {!isMobile ? (
          <DispatchTable filtered={filtered} router={router} />
        ) : (
          <Box>
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <DispatchMobileCard key={item.id} item={item} router={router} />
              ))
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <LocalShipping sx={{ fontSize: 64, color: "#dee2e6" }} />
                <Typography variant="h6" sx={{ color: "#6c757d" }}>
                  No dispatch records found
                </Typography>
                <Typography variant="body2" sx={{ color: "#adb5bd" }}>
                  Try adjusting your search criteria
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CommonCard>
    </Box>
  );
}
