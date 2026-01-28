import React, { useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { Visibility, Edit, Download } from "@mui/icons-material";
import { useRouter } from "next/router";
import CommonCard from "../../src/components/CommonCard";

const bomData = [
  {
    id: 1,
    number: "BOM-001",
    date: "02-02-2025",
    approvedBy: "Name",
  },
  {
    id: 2,
    number: "BOM-002",
    date: "02-02-2025",
    approvedBy: "Name",
  },
];

export default function BOMList() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = bomData.filter((b) =>
    b.number.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CommonCard
      title="Bill of Materials (BOM)"
      addText="Create New BOM"
      onAdd={() => router.push("/bom/create-bom")}
      searchPlaceholder="Search BOM Number"
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
    >
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: "#f3f4f6" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 400 }}>Sr. No.</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>BOM Number</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Created Date</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Approved By</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((row, i) => (
              <TableRow key={row.id} hover>
                <TableCell>{i + 1}</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1172ba" }}>
                  {row.number}
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.approvedBy}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => router.push(`/bom/${row.id}`)}
                  >
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
          </TableBody>
        </Table>
      </Box>
    </CommonCard>
  );
}
