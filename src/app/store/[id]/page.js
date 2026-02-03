"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { useParams, useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";

import ArrowBack from "@mui/icons-material/ArrowBack";
import Inventory from "@mui/icons-material/Inventory";
import History from "@mui/icons-material/History";
import Category from "@mui/icons-material/Category";
import LocationOn from "@mui/icons-material/LocationOn";
import Warning from "@mui/icons-material/Warning";
import TrendingUp from "@mui/icons-material/TrendingUp";
import TrendingDown from "@mui/icons-material/TrendingDown";
import Info from "@mui/icons-material/Info";
import Print from "@mui/icons-material/Print";
import QrCode from "@mui/icons-material/QrCode";
import Description from "@mui/icons-material/Description";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

const DetailItem = ({ icon: Icon, label, value, color = "#1e293b" }) => (
  <Stack direction="row" spacing={2} alignItems="flex-start">
    <Box sx={{
      width: 32,
      height: 32,
      borderRadius: "10px",
      bgcolor: "rgba(17, 114, 186, 0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      mt: 0.5
    }}>
      <Icon sx={{ color: "#1172ba", fontSize: 18 }} />
    </Box>
    <Box>
      <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ color, fontWeight: 700, fontSize: "0.95rem" }}>
        {value || "-"}
      </Typography>
    </Box>
  </Stack>
);

export default function StockMovementHistory() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [material, setMaterial] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchMaterialDetails = async () => {
      try {
        setLoading(true);
        const endpoints = ["/store", "/it-goods", "/finish-goods", "/other-goods"];
        let foundMaterial = null;

        for (const endpoint of endpoints) {
          const response = await axiosInstance.get(endpoint);
          const items = response.data || [];
          foundMaterial = items.find(item => (item.id == id || item.code == id));
          if (foundMaterial) break;
        }

        setMaterial(foundMaterial);

        // Generating history entries based on actual data
        setHistory([
          {
            date: foundMaterial?.updated || new Date().toLocaleDateString(),
            type: "IN (Purchase)",
            ref: foundMaterial?.code || "N/A",
            qty: foundMaterial?.available || 0,
            balance: foundMaterial?.available || 0,
            from: "Main Store",
            remarks: "Opening Balance",
          }
        ]);

      } catch (error) {
        console.error("Error fetching material details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterialDetails();
  }, [id]);

  if (loading) return <Loader message="Fetching movement history..." />;

  return (
    <Fade in={!loading}>
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 3 } }}>
        {/* Header Actions */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }} className="no-print">
          <Button
            startIcon={<ArrowBack />}
            onClick={() => router.back()}
            sx={{
              color: "#64748b",
              fontWeight: 600,
              textTransform: "none",
              bgcolor: "rgba(255,255,255,0.8)",
              px: 2,
              borderRadius: '12px',
              backdropFilter: "blur(4px)",
              border: '1px solid #e2e8f0',
              "&:hover": { bgcolor: "#f1f5f9", borderColor: "#cbd5e1" },
            }}
          >
            Back to Inventory
          </Button>

          <Stack direction="row" spacing={1.5}>
            <Tooltip title="Print Statement">
              <Button
                variant="outlined"
                startIcon={<Print />}
                onClick={() => window.print()}
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#475569",
                  borderColor: "#e2e8f0",
                  bgcolor: "white",
                  "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
                }}
              >
                Print
              </Button>
            </Tooltip>
            <Tooltip title="Export QR">
              <IconButton sx={{ border: '1px solid #e2e8f0', borderRadius: '12px', bgcolor: '#fff' }}>
                <QrCode fontSize="small" sx={{ color: '#475569' }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Grid container spacing={4}>
          {/* Main Document Area */}
          <Grid item xs={12} lg={9}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                bgcolor: "#fff",
                position: 'relative'
              }}
            >
              {/* Decorative Header Gradient */}
              <Box sx={{ height: 6, background: "linear-gradient(90deg, #1172ba 0%, #60a5fa 100%)" }} />

              <Box sx={{ p: { xs: 3, md: 5 } }}>
                {/* Document Header */}
                <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" spacing={4} sx={{ mb: 6 }}>
                  <Box>
                    <Typography variant="h3" fontWeight={900} sx={{ color: "#0f172a", letterSpacing: "-0.04em", mb: 1 }}>
                      STOCK LEDGER
                    </Typography>
                    <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                      Material Movement Tracking
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        label={material?.code || id}
                        sx={{
                          fontWeight: 700,
                          bgcolor: "#f1f5f9",
                          color: "#0f172a",
                          borderRadius: '8px',
                          fontSize: '0.95rem'
                        }}
                      />
                      <Chip
                        label={material?.category || "General"}
                        sx={{
                          fontWeight: 700,
                          bgcolor: "#eff6ff",
                          color: "#1172ba",
                          borderRadius: '8px',
                          fontSize: '0.85rem'
                        }}
                      />
                    </Stack>
                  </Box>

                  <Stack spacing={2} sx={{ minWidth: 280 }}>
                    <DetailItem
                      icon={Inventory}
                      label="Item Name"
                      value={material?.name || material?.itemName || "Material Unit"}
                    />
                    <DetailItem
                      icon={LocationOn}
                      label="Storage Zone"
                      value={material?.location || "Main Warehouse"}
                    />
                  </Stack>
                </Stack>

                <Divider sx={{ mb: 5, opacity: 0.6 }} />

                {/* Movement Ledger Table */}
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <History sx={{ color: '#1172ba' }} /> Transaction History
                    </Typography>
                    <Typography variant="body2" color="#64748b" fontWeight={600}>
                      {history.length} Chronological Entries
                    </Typography>
                  </Stack>

                  <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                          <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>TIMESTAMP</TableCell>
                          <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>TYPE</TableCell>
                          <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>REFERENCE / SOURCE</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>QUANTITY</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>BALANCE</TableCell>
                          <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>OPERATOR</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {history.map((row, i) => (
                          <TableRow key={i} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                            <TableCell sx={{ color: "#64748b", fontWeight: 600, fontSize: '0.85rem' }}>
                              {row.date}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={row.type}
                                size="small"
                                icon={row.type === 'IN' ? <TrendingUp sx={{ fontSize: '14px !important' }} /> : <TrendingDown sx={{ fontSize: '14px !important' }} />}
                                sx={{
                                  fontWeight: 800,
                                  bgcolor: row.type === 'IN' ? '#dcfce7' : '#fee2e2',
                                  color: row.type === 'IN' ? '#166534' : '#991b1b',
                                  borderRadius: '6px',
                                  "& .MuiChip-icon": { color: row.type === 'IN' ? '#166534' : '#991b1b' }
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle2" fontWeight={700} color="#1172ba">{row.source}</Typography>
                              <Typography variant="caption" color="#64748b">{row.remarks}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography
                                variant="body2"
                                fontWeight={800}
                                sx={{ color: row.type === 'IN' ? '#10b981' : '#ef4444', fontFamily: 'monospace' }}
                              >
                                {row.type === 'IN' ? `+${row.qty}` : row.qty}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight={800} color="#0f172a" sx={{ fontFamily: 'monospace' }}>
                                {row.balance}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ color: "#64748b", fontWeight: 500, fontSize: '0.85rem' }}>
                              {row.operator}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Sidebar Area */}
          <Grid item xs={12} lg={3}>
            <Stack spacing={3}>
              {/* Stock Pulse Card */}
              <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Inventory sx={{ color: '#1172ba', fontSize: 20 }} /> Current Stock
                </Typography>

                <Box sx={{
                  p: 3,
                  bgcolor: isLowStock ? '#fff1f2' : '#f0f9ff',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: isLowStock ? '#fecaca' : '#bae6fd',
                  textAlign: 'center'
                }}>
                  <Typography variant="caption" sx={{ color: isLowStock ? '#991b1b' : '#0369a1', fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                    Available Balance
                  </Typography>
                  <Typography variant="h4" fontWeight={900} color={isLowStock ? '#ef4444' : '#1172ba'} sx={{ fontFamily: 'monospace' }}>
                    {material?.available || 0}
                    <Typography component="span" variant="body1" fontWeight={700} sx={{ ml: 1 }}>
                      {material?.unit || 'Pcs'}
                    </Typography>
                  </Typography>
                </Box>

                {isLowStock && (
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2, p: 1.5, bgcolor: 'rgba(239, 68, 68, 0.05)', borderRadius: 2 }}>
                    <Warning sx={{ color: '#ef4444', fontSize: 16 }} />
                    <Typography variant="caption" fontWeight={700} color="#991b1b">
                      Below Threshold ({material?.minimum || 0})
                    </Typography>
                  </Stack>
                )}
              </Paper>

              {/* Audit Metadata */}
              <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Description sx={{ color: '#1172ba', fontSize: 20 }} /> Audit Info
                </Typography>
                <Stack spacing={2.5}>
                  <DetailItem icon={Info} label="Internal UID" value={`SKU-${id ? id.toString().substring(0, 8).toUpperCase() : 'N/A'}`} />
                  <DetailItem icon={TrendingUp} label="Valuation Date" value={new Date().toLocaleDateString()} />
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>

        {/* Print Context Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
                    @media print {
                        .no-print { display: none !important; }
                        body { background: white !important; }
                        .MuiContainer-root { max-width: 100% !important; padding: 0 !important; }
                        .MuiPaper-root { border: none !important; box-shadow: none !important; }
                        .MuiGrid-item.lg-3 { display: none !important; }
                        .MuiGrid-item.lg-9 { width: 100% !important; max-width: 100% !important; flex-basis: 100% !important; }
                    }
                `}} />
      </Container>
    </Fade>
  );
}
