"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  LocalShipping,
  Visibility,
  Edit,
  Delete,
  Download,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/ui/CommonCard";
import DispatchMobileCard from "./components/DispatchMobileCard";
import GlobalTable from "../../components/ui/GlobalTable";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";

// Static data removed, now fetching from API

const getStatusColor = (status) => {
  switch (status) {
    case "Shipped":
      return { bg: "#d1ecf1", color: "#0c5460" };
    case "Delivered":
      return { bg: "#d4edda", color: "#155724" };
    case "Pending":
      return { bg: "#fff3cd", color: "#856404" };
    case "Processing":
      return { bg: "#e2e3e5", color: "#383d41" };
    default:
      return { bg: "#f8d7da", color: "#721c24" };
  }
};

const formatDate = (dateString) => {
  if (!dateString || dateString === "-") return "-";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return dateString;
  }
};

export default function DispatchDetails() {
  const router = useRouter();
  const [dispatchData, setDispatchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchDispatches = async () => {
    try {
      setLoading(true);
      console.log("Dispatch: Fetching dispatches from API...");
      const response = await axiosInstance.get("/dispatches");
      console.log("Dispatch: API Response:", response.data);
      setDispatchData(response.data || []);
    } catch (error) {
      console.error("Failed to fetch dispatches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDispatches();
  }, []);

  const filtered = dispatchData.filter(
    (item) =>
      item.shipmentInfo?.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      item.items?.[0]?.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.customer?.contactPerson?.toLowerCase().includes(search.toLowerCase()) ||
      item.shipmentInfo?.trackingNumber?.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const columns = [
    {
      label: "Sr.No.",
      align: "center",
      sx: { width: "60px" },
      render: (row, index) => <span style={{ color: "#6c757d" }}>{page * rowsPerPage + index + 1}</span>,
    },
    {
      label: "Dispatch NO.",
      align: "center",
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#1172ba" }}>
          {row.shipmentInfo?.dispatchNo || "-"}
        </Typography>
      ),
    },
    {
      label: "Order NO.",
      align: "center",
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 500, color: "#64748b" }}>
          {row.shipmentInfo?.orderNumber || "-"}
        </Typography>
      ),
    },
    {
      label: "Product",
      align: "center",
      render: (row) => <span style={{ fontWeight: 500 }}>{row.items?.[0]?.name || "-"}</span>,
    },
    {
      label: "Status",
      align: "center",
      render: (row) => {
        const { bg, color } = getStatusColor(row.status);
        return (
          <Chip
            label={row.status}
            size="small"
            sx={{
              backgroundColor: bg,
              color: color,
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          />
        );
      },
    },
    {
      label: "Order Date",
      align: "center",
      render: (row) => formatDate(row.shipmentInfo?.shippingDate),
    },
    {
      label: "Shipping Date",
      align: "center",
      render: (row) => formatDate(row.shipmentInfo?.shippingDate),
    },
    {
      label: "Shipment Type",
      align: "center",
      render: (row) => (
        <Chip
          label={row.shipmentInfo?.shipmentType || "Commercial"}
          size="small"
          sx={{
            backgroundColor: row.shipmentInfo?.shipmentType === "Non-Commercial" ? "#fff3cd" : "#e2e3e5",
            color: row.shipmentInfo?.shipmentType === "Non-Commercial" ? "#856404" : "#383d41",
            fontWeight: 600,
            fontSize: "0.7rem",
          }}
        />
      ),
    },
    {
      label: "Country/Market",
      align: "center",
      render: (row) => row.shipmentInfo?.countryMarket || "-",
    },
    {
      label: "Sales Platform",
      align: "center",
      render: (row) => row.shipmentInfo?.platform || "-",
    },
    {
      label: "Contact Person",
      align: "center",
      render: (row) => row.customer?.contactPerson || "-",
    },
    {
      label: "Address",
      align: "center",
      render: (row) => (
        <Typography
          variant="body2"
          sx={{
            maxWidth: "130px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {row.customer?.address}
        </Typography>
      ),
    },
    {
      label: "Tracking Info",
      align: "center",
      render: (row) => (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: !row.shipmentInfo?.trackingNumber || row.shipmentInfo?.trackingNumber === "-" ? "#999" : "#1172ba",
          }}
        >
          {row.shipmentInfo?.trackingNumber || "-"}
        </Typography>
      ),
    },
    {
      label: "Evidence",
      align: "center",
      render: (row) => (
        <IconButton
          size="small"
          sx={{
            color: "#0891b2",
            bgcolor: "#ecfeff",
            "&:hover": { bgcolor: "#cffafe" },
          }}
        >
          <Download fontSize="small" />
        </IconButton>
      ),
    },
    {
      label: "Actions",
      align: "center",
      render: (row) => (
        <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
          <IconButton
            size="small"
            onClick={() => router.push(`/dispatch/view-dispatch?id=${row.id}`)}
            sx={{
              color: "rgb(17, 114, 186)",
              bgcolor: "#f1f5f9",
              "&:hover": { bgcolor: "#e2e8f0" },
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton
            color="warning"
            size="small"
            onClick={() => router.push(`/dispatch/create-dispatch-entry?id=${row.id}`)}
          >
            <Edit fontSize="small" />
          </IconButton>
          <Tooltip title="Download Report">
            <IconButton
              size="small"
              sx={{
                color: "#0891b2",
                bgcolor: "#ecfeff",
                "&:hover": { bgcolor: "#cffafe" },
              }}
            >
              <Download fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <CommonCard
        title="Dispatch Details"
        addText={isSmall ? "Create" : "Create Dispatch Entry"}
        onAdd={() => router.push("/dispatch/create-dispatch-entry")}
        searchPlaceholder="Search Order, Product, Contact, Tracking..."
        searchValue={search}
        onSearchChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
      >
        {loading ? (
          <Loader message="Loading dispatches..." />
        ) : !isMobile ? (
          <GlobalTable
            columns={columns}
            data={paginatedData}
            totalCount={filtered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={(val) => {
              setRowsPerPage(val);
              setPage(0);
            }}
          />
        ) : (
          <Box>
            {paginatedData.length > 0 ? (
              <>
                {paginatedData.map((item) => (
                  <DispatchMobileCard key={item.id} item={item} router={router} />
                ))}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <GlobalTable
                    columns={[]}
                    data={[]}
                    totalCount={filtered.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setPage}
                    onRowsPerPageChange={(val) => {
                      setRowsPerPage(val);
                      setPage(0);
                    }}
                    onlyPagination={true}
                  />
                </Box>
              </>
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
