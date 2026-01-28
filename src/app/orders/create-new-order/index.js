import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  IconButton,
  Paper,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import CommonCard from "../../../src/components/CommonCard";

export default function CreateOrder() {
  const [kitQty, setKitQty] = useState(6);

  return (
    <CommonCard title="Create New Order">
      <Box sx={{ p: 1 }}>
        {/* Order Details */}
        <Grid container spacing={3}>
          {[
            "Order Number",
            "Customer Name",
            "Order Date",
            "Contact Number",
            "Customer Address",
            "Delivery Date",
            "Order Status",
          ].map((label, i) => (
            <Grid item xs={12} md={6} key={i}>
              <TextField
                fullWidth
                label={label}
                variant="outlined"
                size="small"
              />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Products Section */}
        <Typography variant="h6" fontWeight={700} mb={3} color="primary">
          Products Selection
        </Typography>

        <Grid container spacing={4}>
          {/* Full Kit */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: "#f8fafc" }}>
              <Typography fontWeight={700} mb={2}>Full Kit</Typography>
              <TextField
                fullWidth
                placeholder="Full kit name"
                size="small"
                sx={{ mb: 2, bgcolor: "#fff" }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 1,
                  bgcolor: "#fff"
                }}
              >
                <Typography sx={{ flex: 1, ml: 1 }}>D8 Kit</Typography>
                <IconButton onClick={() => setKitQty(kitQty - 1)} size="small" color="primary">
                  <Remove />
                </IconButton>
                <Typography fontWeight={700}>{kitQty}</Typography>
                <IconButton onClick={() => setKitQty(kitQty + 1)} size="small" color="primary">
                  <Add />
                </IconButton>
              </Box>
            </Paper>
          </Grid>

          {/* Single Product */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: "#f8fafc" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography fontWeight={700}>Single Product</Typography>
                <Button
                  size="small"
                  startIcon={<Add />}
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                >
                  Add
                </Button>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Grid container spacing={1} sx={{ mb: 1 }}>
                  <Grid item xs={2}><Typography variant="caption" fontWeight={700}>Sr.</Typography></Grid>
                  <Grid item xs={6}><Typography variant="caption" fontWeight={700}>Product Name</Typography></Grid>
                  <Grid item xs={4}><Typography variant="caption" fontWeight={700}>Quantity</Typography></Grid>
                </Grid>

                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={2}><Typography variant="body2">1</Typography></Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth placeholder="Select Product" size="small" sx={{ bgcolor: "#fff" }} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField fullWidth placeholder="Qty" size="small" sx={{ bgcolor: "#fff" }} />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Action Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6 }}>
          <Button
            variant="contained"
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: 700,
              borderRadius: 2,
              backgroundColor: "#1172ba",
              "&:hover": { backgroundColor: "#0d5a94" },
              textTransform: "none"
            }}
          >
            Save Order
          </Button>
        </Box>
      </Box>
    </CommonCard>
  );
}
