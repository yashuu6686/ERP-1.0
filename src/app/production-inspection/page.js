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
} from "@mui/material";
import { Visibility, Edit, Download, NavigateNext } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import CommonCard from "../../components/CommonCard";

const inspectionData = [
  {
    id: 1,
    checkNo: "FIN-INS-0001",
    checkedQty: 20,
    acceptedQty: 18,
    rejectedQty: 2,
    result: "Pass / Fail / Conditional",
    date: "01 Jan 2026",
    remarks: "description",
    approvedBy: "QC Head",
  },
  {
    id: 2,
    checkNo: "FIN-INS-0002",
    checkedQty: 20,
    acceptedQty: 18,
    rejectedQty: 2,
    result: "Pass / Fail / Conditional",
    date: "01 Jan 2026",
    remarks: "description",
    approvedBy: "QC Head",
  },
];

export default function AfterProductionInspection() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = inspectionData.filter((i) =>
    i.checkNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
   
      <CommonCard
        title="After Production Inspection"
        addText="Start Quality Check"
        onAdd={() =>
          router.push("/production-inspection/after-production-quality-check")
        }
        searchPlaceholder="Search Quality Check No..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: "#f3f4f6" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 400 }}>Sr. No.</TableCell>
                <TableCell sx={{ fontWeight: 400 }}>Quality Check No.</TableCell>
                <TableCell sx={{ fontWeight: 400 }}>Checked Qty</TableCell>
                <TableCell sx={{ fontWeight: 400 }}>Accepted Qty</TableCell>
                <TableCell sx={{ fontWeight: 400 }}>Rejected Qty</TableCell>
                <TableCell sx={{ fontWeight: 400 }}>Inspection Result</TableCell>
                <TableCell sx={{ fontWeight: 400 }}>Inspection Date</TableCell>
                <TableCell sx={{ fontWeight: 400 }}>Remarks</TableCell>
                <TableCell sx={{ fontWeight: 400 }}>Approved By</TableCell>
                <TableCell sx={{ fontWeight: 400 }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((row, i) => (
                <TableRow key={row.id} hover>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1172ba" }}>
                    {row.checkNo}
                  </TableCell>
                  <TableCell>{row.checkedQty}</TableCell>
                  <TableCell>
                    <Chip label={row.acceptedQty} color="success" size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={row.rejectedQty} color="error" size="small" />
                  </TableCell>
                  <TableCell>{row.result}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.remarks}</TableCell>
                  <TableCell>{row.approvedBy}</TableCell>
                  <TableCell>
                    <IconButton color="primary" size="small">
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton color="warning" size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton color="success" size="small">
                      <Download fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    No inspection records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </CommonCard>
    </Box>
  );
}
