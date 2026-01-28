"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Card,
  CardContent,
  Paper,
  InputAdornment,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  Add,
  Delete,
  Description,
  Inventory,
  Science,
  FactCheck,
  Person,
  CalendarToday,
  Save,
  NavigateNext,
} from "@mui/icons-material";
import NextLink from "next/link";
import CommonCard from "../../components/CommonCard";

export default function CertificateOfAnalysis() {
  const [mounted, setMounted] = React.useState(false);
  const [testRows, setTestRows] = React.useState([
    {
      id: 1,
      parameters: "",
      specification: "",
      method: "",
      result: "",
      status: "",
    },
  ]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const addTestRow = () => {
    const newId = testRows.length > 0 ? Math.max(...testRows.map(row => row.id)) + 1 : 1;
    setTestRows([
      ...testRows,
      {
        id: newId,
        parameters: "",
        specification: "",
        method: "",
        result: "",
        status: "",
      },
    ]);
  };

  const deleteTestRow = (id) => {
    if (testRows.length > 1) {
      setTestRows(testRows.filter((row) => row.id !== id));
    }
  };

  const handleTestRowChange = (id, field, value) => {
    setTestRows(
      testRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  if (!mounted) return null;

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      bgcolor: "white",
      "&:hover": {
        "& > fieldset": { borderColor: "#1172ba" },
      },
    },
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
          <Link component={NextLink} underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">COA</Typography>
        </Breadcrumbs>
      </Box>

      <CommonCard title="Certificate of Analysis">
        {/* Certificate Details Section */}
        <Card
          sx={{
            mb: 4,
            border: "1px solid #e9ecef",
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Description />
            <Typography variant="h6" fontWeight={600}>
              Certificate Details
            </Typography>
          </Box>
          <CardContent sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", p: 3 }}>
            <Grid container spacing={3}>
              {[
                { label: "Certificate No.", name: "certNo" },
                { label: "Customer Name", name: "customer" },
                { label: "Order Date", name: "date", type: "date" },
                { label: "Delivery Address", name: "address" },
                { label: "Scanbo's Address", name: "scanboAddress" },
                { label: "Order No.", name: "orderNo" },
                { label: "Scanbo's Email", name: "email", type: "email" },
                { label: "Model No.", name: "model" },
                { label: "Device Serial No.", name: "serial" },
                { label: "Quantity", name: "qty", type: "number" },
                { label: "Batch/Lot No.", name: "batch" },
              ].map((field) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
                  <TextField
                    fullWidth
                    size="small"
                    label={field.label}
                    type={field.type || "text"}
                    InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                    variant="outlined"
                    sx={textFieldStyle}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Product Details Section */}
        <Card
          sx={{
            mb: 4,
            border: "1px solid #e9ecef",
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Inventory />
            <Typography variant="h6" fontWeight={600}>
              Product Details
            </Typography>
          </Box>
          <CardContent sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", p: 3 }}>
            <Grid container spacing={3}>
              {[
                { label: "Product Name", name: "productName", md: 4 },
                { label: "Manufacturing Date", name: "mfgDate", type: "date", md: 4 },
                { label: "Validity Period", name: "validity", md: 4 },
                { label: "Description", name: "desc", md: 12, multiline: true, rows: 3 },
              ].map((field) => (
                <Grid size={{ xs: 12, sm: field.md === 12 ? 12 : 6, md: field.md }} key={field.name}>
                  <TextField
                    fullWidth
                    size="small"
                    label={field.label}
                    type={field.type || "text"}
                    multiline={field.multiline || false}
                    rows={field.rows || 1}
                    InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                    variant="outlined"
                    sx={textFieldStyle}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Test Results Section */}
        <Card
          sx={{
            mb: 4,
            border: "1px solid #e9ecef",
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Science />
              <Typography variant="h6" fontWeight={600}>
                Test Results / Specifications
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="small"
              startIcon={<Add />}
              onClick={addTestRow}
              sx={{
                backgroundColor: "rgba(255,255,255,0.15)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
                textTransform: "none",
              }}
            >
              Add Row
            </Button>
          </Box>
          <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}>
                  <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Step</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Parameters</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Specification</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Test Method</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Test Result</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#495057", width: 120 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#495057", width: 80 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testRows.map((row, index) => (
                  <TableRow key={row.id} sx={{ "&:hover": { bgcolor: "#f8f9fa" } }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.parameters}
                        onChange={(e) =>
                          handleTestRowChange(row.id, "parameters", e.target.value)
                        }
                        sx={textFieldStyle}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.specification}
                        onChange={(e) =>
                          handleTestRowChange(row.id, "specification", e.target.value)
                        }
                        sx={textFieldStyle}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.method}
                        onChange={(e) =>
                          handleTestRowChange(row.id, "method", e.target.value)
                        }
                        sx={textFieldStyle}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        value={row.result}
                        onChange={(e) =>
                          handleTestRowChange(row.id, "result", e.target.value)
                        }
                        sx={textFieldStyle}
                      />
                    </TableCell>
                    <TableCell>
                      <FormControl size="small" fullWidth sx={{ ...textFieldStyle, "& .MuiOutlinedInput-root": { bgcolor: "white" } }}>
                        <Select
                          value={row.status}
                          onChange={(e) =>
                            handleTestRowChange(row.id, "status", e.target.value)
                          }
                          displayEmpty
                          MenuProps={{ disableScrollLock: true }}
                        >
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value="pass">Pass</MenuItem>
                          <MenuItem value="fail">Fail</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => deleteTestRow(row.id)}
                        disabled={testRows.length === 1}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Card>

        {/* Authorization Section */}
        <Card
          sx={{
            mb: 4,
            border: "1px solid #e9ecef",
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <FactCheck />
            <Typography variant="h6" fontWeight={600}>
              Authorization
            </Typography>
          </Box>
          <CardContent sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", p: 3 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Analysed By"
                  placeholder="Enter Name"
                  sx={textFieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "#1172ba", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Approved By"
                  placeholder="Enter Name"
                  sx={textFieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FactCheck sx={{ color: "#1172ba", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Analysed Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  sx={textFieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday sx={{ color: "#1172ba", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Approved Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  sx={textFieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday sx={{ color: "#1172ba", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#1172ba",
              color: "#1172ba",
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                borderColor: "#0d5a94",
                bgcolor: "#f0f7ff",
              },
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            sx={{
              backgroundColor: "#1172ba",
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#0d5a94" },
            }}
          >
            Save Certificate
          </Button>
        </Box>
      </CommonCard>
    </Box>
  );
}