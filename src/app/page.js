"use client";
import React from "react";
import { Box, Button, Divider, Typography, Container, Paper } from "@mui/material";
import { Construction, ShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <Box sx={{ p: "var(--space-xl)", maxWidth: "var(--content-max-width)", mx: "auto" }}>
      <Paper
        elevation={0}
        sx={{
          p: "var(--space-4xl)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          borderRadius: "var(--card-radius)",
          bgcolor: "var(--bg-surface)",
          border: "1px solid var(--border-default)",
          boxShadow: "var(--card-shadow)"
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            bgcolor: "var(--brand-soft)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: "var(--space-xl)",
            color: "var(--brand-primary)",
          }}
        >
          <Construction sx={{ fontSize: 40, color: "var(--brand-primary)" }} />
        </Box>

        <Typography
          variant="h4"
          sx={{
            mb: "var(--space-sm)",
            color: "var(--text-primary)",
            fontWeight: "var(--weight-bold)",
            fontSize: "var(--size-heading-md)",
            fontFamily: "var(--font-manrope)"
          }}
        >
          Enterprise Dashboard Under Construction
        </Typography>

        <Typography
          sx={{
            mb: "var(--space-2xl)",
            color: "var(--text-secondary)",
            maxWidth: 600,
            fontSize: "var(--size-body)",
            fontFamily: "var(--font-manrope)"
          }}
        >
          We&apos;re working hard to bring you a comprehensive overview of your manufacturing and business operations.
          The production analytics, KPI trackers, and reporting modules are currently being finalized.
        </Typography>

        <Box
          sx={{
            p: "var(--space-xl)",
            bgcolor: "var(--bg-page)",
            borderRadius: "var(--card-radius)",
            border: "1px dashed var(--border-strong)",
            mb: "var(--space-2xl)",
            width: "100%",
            maxWidth: 500
          }}
        >
          <Typography
            sx={{
              color: "var(--text-muted)",
              mb: "var(--space-md)",
              textTransform: "uppercase",
              fontSize: "var(--size-caption)",
              fontWeight: 700,
              letterSpacing: 1,
              fontFamily: "var(--font-manrope)"
            }}
          >
            ACTIVE MODULES
          </Typography>
          <Box sx={{ display: "flex", gap: "var(--space-md)", justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              startIcon={<ShoppingCart />}
              onClick={() => router.push("/purchase")}
              sx={{
                borderColor: "var(--border-strong)",
                color: "var(--text-secondary)",
                "&:hover": { borderColor: "var(--brand-primary)", bgcolor: "var(--brand-soft)" },
                borderRadius: "var(--btn-radius)",
                textTransform: "none",
                fontWeight: 600,
                fontFamily: "var(--font-manrope)"
              }}
            >
              Purchase Orders
            </Button>
          </Box>
        </Box>

        <Button
          variant="contained"
          size="large"
          onClick={() => router.push("/purchase")}
          sx={{
            bgcolor: "var(--brand-primary)",
            "&:hover": { bgcolor: "#2557cc" },
            px: "var(--space-4xl)",
            py: "var(--space-sm)",
            borderRadius: "var(--btn-radius)",
            textTransform: "none",
            fontSize: "var(--size-body)",
            fontWeight: 600,
            fontFamily: "var(--font-manrope)",
            boxShadow: "none"
          }}
        >
          Start with Procurement
        </Button>
      </Paper>
    </Box>
  );
}
