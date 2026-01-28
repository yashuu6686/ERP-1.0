"use client";
import React, { useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  Visibility,
  Download,
  Edit,
  Delete,
  LocalShipping,
  Warning,
  CheckCircle,
  Schedule,
  NavigateNext,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import CommonCard from "../../components/CommonCard";

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

  const getStatusColor = (status) => {
    switch (status) {
      case "Shipped":
        return { bg: "#d1ecf1", color: "#0c5460", icon: <LocalShipping /> };
      case "Delivered":
        return { bg: "#d4edda", color: "#155724", icon: <CheckCircle /> };
      case "Pending":
        return { bg: "#fff3cd", color: "#856404", icon: <Schedule /> };
      case "Processing":
        return { bg: "#e2e3e5", color: "#383d41", icon: <Warning /> };
      default:
        return { bg: "#f8d7da", color: "#721c24", icon: <Warning /> };
    }
  };

  const formatDate = (dateString) => {
    if (dateString === "-") return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const MobileCard = ({ item }) => {
    const statusInfo = getStatusColor(item.status);
    return (
      <Card
        sx={{
          mb: 2,
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid #e0e0e0",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            transform: "translateY(-2px)",
          },
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: "#1172ba",
                  fontSize: "1rem",
                  mb: 0.5,
                }}
              >
                {item.order}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#666", fontSize: "0.875rem" }}
              >
                {item.product}
              </Typography>
            </Box>
            <Chip
              label={item.status}
              size="small"
              sx={{
                backgroundColor: statusInfo.bg,
                color: statusInfo.color,
                fontWeight: 600,
                fontSize: "0.7rem",
                height: "24px",
              }}
            />
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Grid container spacing={1.5}>
            <Grid item xs={6}>
              <Typography
                variant="caption"
                sx={{ color: "#999", display: "block", mb: 0.5 }}
              >
                Order Date
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {formatDate(item.orderDate)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="caption"
                sx={{ color: "#999", display: "block", mb: 0.5 }}
              >
                Shipping Date
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {formatDate(item.shippingDate)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="caption"
                sx={{ color: "#999", display: "block", mb: 0.5 }}
              >
                Platform
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {item.platform}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="caption"
                sx={{ color: "#999", display: "block", mb: 0.5 }}
              >
                Contact
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {item.contact}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                sx={{ color: "#999", display: "block", mb: 0.5 }}
              >
                Address
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: "#333",
                  backgroundColor: "#f8f9fa",
                  p: 1,
                  borderRadius: "6px",
                }}
              >
                {item.address}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                sx={{ color: "#999", display: "block", mb: 0.5 }}
              >
                Tracking Info
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: item.tracking === "-" ? "#999" : "#1172ba",
                }}
              >
                {item.tracking}
              </Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: 2,
              pt: 1.5,
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <Button
              size="small"
              startIcon={<Visibility />}
              onClick={() => router.push(`/dispatch/${item.id}`)}
              sx={{
                flex: 1,
                textTransform: "none",
                fontSize: "0.8rem",
                color: "#1172ba",
                borderColor: "#1172ba",
              }}
              variant="outlined"
            >
              View
            </Button>
            <IconButton
              size="small"
              sx={{
                color: "#6c757d",
                border: "1px solid #6c757d",
                borderRadius: "8px",
              }}
            >
              <Download fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                color: "#28a745",
                border: "1px solid #28a745",
                borderRadius: "8px",
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
          <Link component={NextLink} underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Dispatch</Typography>
        </Breadcrumbs>
      </Box>

      <CommonCard
        title="Dispatch Details"
        addText={isSmall ? "Create" : "Create Dispatch Entry"}
        onAdd={() => router.push("/dispatch/create-dispatch-entry")}
        searchPlaceholder="Search Order, Product, Contact, Tracking..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        {!isMobile ? (
          <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: "#f8f9fa",
                    "& th": {
                      fontWeight: 600,
                      color: "#495057",
                      borderBottom: "2px solid #dee2e6",
                      py: 1.5,
                    },
                  }}
                >
                  <TableCell sx={{ width: "60px" }}>Sr. No.</TableCell>
                  <TableCell>Order Details</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Shipping Date</TableCell>
                  <TableCell>Sales Platform</TableCell>
                  <TableCell>Contact Person</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Tracking Info</TableCell>
                  <TableCell align="center">Evidence</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered.map((row, i) => {
                  const statusInfo = getStatusColor(row.status);
                  return (
                    <TableRow
                      key={row.id}
                      hover
                      sx={{
                        "&:hover": { bgcolor: "#f8f9fa" },
                        transition: "background-color 0.2s",
                      }}
                    >
                      <TableCell sx={{ color: "#6c757d" }}>{i + 1}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "#1172ba" }}
                        >
                          {row.order}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {row.product}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={row.status}
                          size="small"
                          sx={{
                            backgroundColor: statusInfo.bg,
                            color: statusInfo.color,
                            fontWeight: 600,
                            fontSize: "0.75rem",
                          }}
                        />
                      </TableCell>
                      <TableCell>{formatDate(row.orderDate)}</TableCell>
                      <TableCell>{formatDate(row.shippingDate)}</TableCell>
                      <TableCell>{row.platform}</TableCell>
                      <TableCell>{row.contact}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            maxWidth: "200px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.address}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: row.tracking === "-" ? "#999" : "#1172ba",
                          }}
                        >
                          {row.tracking}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          sx={{
                            color: "#6c757d",
                            "&:hover": { bgcolor: "#e9ecef" },
                          }}
                        >
                          <Download fontSize="small" />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            gap: 0.5,
                            justifyContent: "center",
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => router.push(`/dispatch/${row.id}`)}
                            sx={{
                              color: "#1172ba",
                              "&:hover": { bgcolor: "#e3f2fd" },
                            }}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              color: "#28a745",
                              "&:hover": { bgcolor: "#d4edda" },
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              color: "#dc3545",
                              "&:hover": { bgcolor: "#f8d7da" },
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={12} align="center" sx={{ py: 8 }}>
                      <Box
                        sx={{
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
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        ) : (
          <Box>
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <MobileCard key={item.id} item={item} />
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
