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
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import CommonCard from "../../src/components/CommonCard";

export default function CertificateOfAnalysis() {
  const [testRows, setTestRows] = useState([
    {
      id: 1,
      parameters: "",
      specification: "",
      method: "",
      result: "",
      status: "",
    },
  ]);

  const addTestRow = () => {
    setTestRows([
      ...testRows,
      {
        id: testRows.length + 1,
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

  return (
    <CommonCard title="Certificate of Analysis">
      {/* Certificate Details Section */}
      <Card
        sx={{
          mb: 4,
          boxShadow: "none",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ mb: 3, fontWeight: 600, color: "#374151" }}
          >
            Certificate Details
          </Typography>
          <Grid container spacing={2}>
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
              <Grid item xs={12} sm={6} md={4} key={field.name}>
                <TextField
                  fullWidth
                  size="small"
                  label={field.label}
                  type={field.type || "text"}
                  InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                  variant="outlined"
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
          boxShadow: "none",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ mb: 3, fontWeight: 600, color: "#374151" }}
          >
            Product Details
          </Typography>
          <Grid container spacing={2}>
            {[
              { label: "Product Name", name: "productName" },
              { label: "Description", name: "desc" },
              { label: "Manufacturing Date", name: "mfgDate", type: "date" },
              { label: "Validity Period", name: "validity" },
            ].map((field) => (
              <Grid item xs={12} sm={6} md={4} key={field.name}>
                <TextField
                  fullWidth
                  size="small"
                  label={field.label}
                  type={field.type || "text"}
                  InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Test Results Section */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#374151" }}>
          Test Results / Specifications
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={addTestRow}
          sx={{
            backgroundColor: "#1172ba",
            borderRadius: "8px",
            textTransform: "none",
          }}
        >
          Add Row
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ mb: 4, borderRadius: "8px" }}
      >
        <Table size="small">
          <TableHead sx={{ bgcolor: "#f3f4f6" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Step</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Parameters</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Specification</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Test Method</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Test Result</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testRows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    fullWidth
                    value={row.parameters}
                    onChange={(e) =>
                      handleTestRowChange(row.id, "parameters", e.target.value)
                    }
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
                  />
                </TableCell>
                <TableCell>
                  <FormControl size="small" fullWidth>
                    <Select
                      value={row.status}
                      onChange={(e) =>
                        handleTestRowChange(row.id, "status", e.target.value)
                      }
                      displayEmpty
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
      </TableContainer>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          variant="outlined"
          sx={{ borderRadius: "8px", textTransform: "none" }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1172ba",
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#0d5a94" },
          }}
        >
          Save Certificate
        </Button>
      </Box>
    </CommonCard>
  );
}