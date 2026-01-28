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
} from "@mui/material";
import { ArrowForward, Save } from "@mui/icons-material";
import CommonCard from "../../src/components/CommonCard";

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

  return (
    <CommonCard title="Standard Operating Procedures (SOP)">
      {currentPage === "device-testing" ? (
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#1172ba",
              mb: 3,
            }}
          >
            Device Testing
          </Typography>

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
                variant="subtitle1"
                sx={{ fontWeight: 600, mb: 3, color: "#374151" }}
              >
                Device Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Device ID"
                    value={formData.deviceId}
                    onChange={(e) => handleInputChange("deviceId", e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Company Name"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Company Address"
                    value={formData.companyAddress}
                    onChange={(e) =>
                      handleInputChange("companyAddress", e.target.value)
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Assisted By"
                    value={formData.assistedBy}
                    onChange={(e) =>
                      handleInputChange("assistedBy", e.target.value)
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Done By"
                    value={formData.doneBy}
                    onChange={(e) => handleInputChange("doneBy", e.target.value)}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ borderRadius: "8px", mb: 4 }}
          >
            <Table size="small">
              <TableHead sx={{ bgcolor: "#f3f4f6" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Step</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Task to Test</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Parameter</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Test Methodology</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Expected Result</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Check</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Remarks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deviceTestingSteps.map((row) => (
                  <TableRow key={row.step} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{row.step}</TableCell>
                    <TableCell>{row.task}</TableCell>
                    <TableCell>
                      <TextField size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <TextField size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <TextField size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <TextField size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="date"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField size="small" variant="outlined" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            {[
              { label: "Testing By", name: "testingBy" },
              { label: "Testing Date", name: "testingDate", type: "date" },
              { label: "Verified By", name: "verifiedBy" },
              { label: "Verified Date", name: "verifiedDate", type: "date" },
            ].map((field) => (
              <Grid item xs={12} md={3} key={field.name}>
                <TextField
                  fullWidth
                  size="small"
                  label={field.label}
                  type={field.type || "text"}
                  value={formData[field.name]}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={() => setCurrentPage("packaging")}
              sx={{
                backgroundColor: "#1172ba",
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#0d5a94" },
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#1172ba",
              mb: 3,
            }}
          >
            Packaging Process
          </Typography>

          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ borderRadius: "8px", mb: 4 }}
          >
            <Table size="small">
              <TableHead sx={{ bgcolor: "#f3f4f6" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Step</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Components</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Parameter</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Expected Result</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Assisted By</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Done By</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Remarks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packagingSteps.map((row) => (
                  <TableRow key={row.step} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{row.step}</TableCell>
                    <TableCell>{row.components}</TableCell>
                    <TableCell>
                      <TextField size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <TextField size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <TextField size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <TextField size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="date"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField size="small" variant="outlined" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Packed By"
                value={formData.packedBy}
                onChange={(e) => handleInputChange("packedBy", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Checked By"
                value={formData.checkedBy}
                onChange={(e) => handleInputChange("checkedBy", e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={() => setCurrentPage("device-testing")}
              sx={{ borderRadius: "8px", textTransform: "none" }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              sx={{
                backgroundColor: "#28a745",
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#218838" },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      )}
    </CommonCard>
  );
}