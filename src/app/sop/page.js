"use client";
import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Chip,
  InputAdornment,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  ArrowForward,
  Save,
  Devices,
  Business,
  Person,
  FactCheck,
  Inventory,
  ArrowBack,
  CalendarToday,
  NavigateNext,
} from "@mui/icons-material";
import NextLink from "next/link";
import CommonCard from "../../components/CommonCard";

export default function SOPForm() {
  const [currentPage, setCurrentPage] = useState("device-testing");
  const [formData, setFormData] = useState({
    deviceId: "",
    date: "",
    companyName: "",
    companyAddress: "",
    assistedBy: "",
    doneBy: "",
    testingBy: "",
    testingDate: "",
    verifiedBy: "",
    verifiedDate: "",
    packedBy: "",
    checkedBy: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const deviceTestingSteps = [
    { step: 1, task: "Preparation / Physical status" },
    { step: 2, task: "Temperature" },
    { step: 19, task: "Final Check" },
  ];

  const packagingSteps = [
    { step: 1, components: "Scanbo D8 Device" },
    { step: 2, components: "Bp Cuffs" },
    { step: 19, components: "Final Check" },
  ];

  // Common styles for text fields to match other pages
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
          <Typography color="text.primary">SOP</Typography>
        </Breadcrumbs>
      </Box>

      <CommonCard title="Standard Operating Procedures (SOP)">
        <Box sx={{ p: 1 }}>
          {currentPage === "device-testing" ? (
            <>
              {/* Device Information Card */}
              <Card
                sx={{
                  mb: 4,
                  border: "1px solid #e9ecef",
                  borderRadius: 2,
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
                  <Devices />
                  <Typography variant="h6" fontWeight={600}>
                    Device Information
                  </Typography>
                </Box>
                <CardContent sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Device ID"
                        value={formData.deviceId}
                        onChange={(e) => handleInputChange("deviceId", e.target.value)}
                        sx={textFieldStyle}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarToday sx={{ color: "#1172ba", fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={textFieldStyle}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Company Name"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        sx={textFieldStyle}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Company Address"
                        value={formData.companyAddress}
                        onChange={(e) => handleInputChange("companyAddress", e.target.value)}
                        sx={textFieldStyle}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Assisted By"
                        value={formData.assistedBy}
                        onChange={(e) => handleInputChange("assistedBy", e.target.value)}
                        sx={textFieldStyle}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Done By"
                        value={formData.doneBy}
                        onChange={(e) => handleInputChange("doneBy", e.target.value)}
                        sx={textFieldStyle}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Device Testing Table */}
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
                    Device Testing Process
                  </Typography>
                </Box>
                <Box sx={{ overflowX: "auto" }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}>
                        <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Step</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Task to Test</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#495057", width: 140 }}>Parameter</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#495057", width: 140 }}>Test Methodology</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#495057", width: 140 }}>Expected Result</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#495057", width: 100 }}>Check</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#495057", width: 140 }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Remarks</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {deviceTestingSteps.map((row) => (
                        <TableRow key={row.step} sx={{ "&:hover": { bgcolor: "#f8f9fa" } }}>
                          <TableCell>
                            <Chip
                              label={row.step}
                              size="small"
                              sx={{
                                bgcolor: "#1172ba",
                                color: "white",
                                fontWeight: 600,
                                minWidth: 32,
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{row.task}</TableCell>
                          <TableCell>
                            <TextField size="small" fullWidth sx={textFieldStyle} />
                          </TableCell>
                          <TableCell>
                            <TextField size="small" fullWidth sx={textFieldStyle} />
                          </TableCell>
                          <TableCell>
                            <TextField size="small" fullWidth sx={textFieldStyle} />
                          </TableCell>
                          <TableCell>
                            <TextField size="small" fullWidth sx={textFieldStyle} />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="date"
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                              sx={textFieldStyle}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField size="small" fullWidth sx={textFieldStyle} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Card>

              {/* Verification Section */}
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
                    Verification Process
                  </Typography>
                </Box>
                <CardContent sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Testing By"
                        value={formData.testingBy}
                        onChange={(e) => handleInputChange("testingBy", e.target.value)}
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
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Verified By"
                        value={formData.verifiedBy}
                        onChange={(e) => handleInputChange("verifiedBy", e.target.value)}
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
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Testing Date"
                        type="date"
                        value={formData.testingDate}
                        onChange={(e) => handleInputChange("testingDate", e.target.value)}
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
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Verified Date"
                        type="date"
                        value={formData.verifiedDate}
                        onChange={(e) => handleInputChange("verifiedDate", e.target.value)}
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

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={() => setCurrentPage("packaging")}
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
                  Next Step: Packaging
                </Button>
              </Box>
            </>
          ) : (
            <>
              {/* Packaging Table */}
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
                    Packaging Process
                  </Typography>
                </Box>
                <Box sx={{ overflowX: "auto" }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}>
                        <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Step</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Components</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#495057", width: 140 }}>Parameter</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#495057", width: 140 }}>Expected Result</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#495057", width: 140 }}>Assisted By</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#495057", width: 140 }}>Done By</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#495057", width: 140 }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Remarks</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {packagingSteps.map((row) => (
                        <TableRow key={row.step} sx={{ "&:hover": { bgcolor: "#f8f9fa" } }}>
                          <TableCell>
                            <Chip
                              label={row.step}
                              size="small"
                              sx={{
                                bgcolor: "#1172ba",
                                color: "white",
                                fontWeight: 600,
                                minWidth: 32,
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{row.components}</TableCell>
                          <TableCell>
                            <TextField size="small" fullWidth sx={textFieldStyle} />
                          </TableCell>
                          <TableCell>
                            <TextField size="small" fullWidth sx={textFieldStyle} />
                          </TableCell>
                          <TableCell>
                            <TextField size="small" fullWidth sx={textFieldStyle} />
                          </TableCell>
                          <TableCell>
                            <TextField size="small" fullWidth sx={textFieldStyle} />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="date"
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                              sx={textFieldStyle}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField size="small" fullWidth sx={textFieldStyle} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Card>

              {/* Final Signatures */}
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
                    Final Authorization
                  </Typography>
                </Box>
                <CardContent sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Packed By"
                        value={formData.packedBy}
                        onChange={(e) => handleInputChange("packedBy", e.target.value)}
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
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Checked By"
                        value={formData.checkedBy}
                        onChange={(e) => handleInputChange("checkedBy", e.target.value)}
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
                  </Grid>
                </CardContent>
              </Card>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={() => setCurrentPage("device-testing")}
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
                  Back
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  sx={{
                    backgroundColor: "#1172ba", // Changed to blue to match theme
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#0d5a94" },
                  }}
                >
                  Save SOP
                </Button>
              </Box>
            </>
          )}
        </Box>
      </CommonCard>
    </Box>
  );
}