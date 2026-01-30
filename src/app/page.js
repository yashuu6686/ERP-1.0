"use client";
import React from "react";
import { Box, Button, Divider, Typography, Container, Paper } from "@mui/material";
import { Construction, ShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          borderRadius: 4,
          background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)",
          border: "1px solid #e2e8f0"
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            color: "#0284c7",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
          }}
        >
          <Construction sx={{ fontSize: 40, color: "#0369a1" }} />
        </Box>

        <Typography variant="h4" fontWeight={800} sx={{ mb: 2, color: "#1e293b", letterSpacing: -0.5 }}>
          Dashboard Under Construction
        </Typography>

        <Typography variant="h6" sx={{ mb: 4, color: "#64748b", maxWidth: 600, fontWeight: 400 }}>
          We're working hard to bring you a comprehensive overview of your business.
          This page is currently being built.
        </Typography>

        <Box sx={{ p: 3, bgcolor: "#fff", borderRadius: 3, border: "1px dashed #cbd5e1", mb: 4, width: "100%", maxWidth: 500 }}>
          <Typography variant="body2" sx={{ color: "#94a3b8", mb: 1, textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 700, letterSpacing: 1 }}>
            AVAILABLE MODULES
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              startIcon={<ShoppingCart />}
              onClick={() => router.push("/purchase")}
              sx={{
                borderColor: "#e2e8f0",
                color: "#475569",
                "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600
              }}
            >
              Purchase Orders
            </Button>
            {/* Add more available module buttons here if needed */}
          </Box>
        </Box>

        <Button
          variant="contained"
          size="large"
          onClick={() => router.push("/purchase")}
          sx={{
            background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
            "&:hover": { background: "linear-gradient(135deg, #0d5a94 0%, #0a4675 100%)" },
            px: 6,
            py: 1.5,
            borderRadius: 2.5,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            boxShadow: "0 4px 6px -1px rgb(17 114 186 / 0.3)"
          }}
        >
          Go to Purchase Module
        </Button>
      </Paper>
    </Container>
  );
}
