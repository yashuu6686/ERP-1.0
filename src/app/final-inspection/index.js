import React, { useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useRouter } from "next/router";
import CommonCard from "../../src/components/CommonCard";

const finalQualityData = [
  {
    id: 1,
    inspectionNo: "FIN-INS-0001",
    total: 20,
    approved: 18,
    rejected: 2,
    result: "Pass",
    date: "01 Jan 2026",
    remarks: "description",
    approvedBy: "QC Head",
    approvalDate: "20",
  },
  {
    id: 2,
    inspectionNo: "FIN-INS-0002",
    total: 20,
    approved: 18,
    rejected: 2,
    result: "Conditional",
    date: "01 Jan 2026",
    remarks: "description",
    approvedBy: "QC Head",
    approvalDate: "30",
  },
];

export default function FinalQualityCheck() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = finalQualityData.filter((item) =>
    item.inspectionNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CommonCard
      title="Final Quality Check List"
      addText="Add Final Check"
      onAdd={() => router.push("/final-inspection/create-final-inspection")}
      searchPlaceholder="Search Inspection No..."
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
    >
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: "#f3f4f6" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 400 }}>Sr. No.</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Final Inspection No</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Total Checked</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Approved</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Rejected</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Result</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Checking Date</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Remarks</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Approved By</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Approval Date</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((row, i) => (
              <TableRow key={row.id} hover>
                <TableCell>{i + 1}</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1172ba" }}>
                  {row.inspectionNo}
                </TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>{row.approved}</TableCell>
                <TableCell>{row.rejected}</TableCell>
                <TableCell>
                  <Chip
                    label={row.result}
                    color={
                      row.result === "Pass"
                        ? "success"
                        : row.result === "Fail"
                          ? "error"
                          : "warning"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.remarks}</TableCell>
                <TableCell>{row.approvedBy}</TableCell>
                <TableCell>{row.approvalDate}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => router.push(`/final-inspection/${row.id}`)}
                  >
                    <Visibility fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </CommonCard>
  );
}
