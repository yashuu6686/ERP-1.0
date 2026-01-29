"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import StoreTabs from "./components/StoreTabs";
import MaterialsTable from "./components/MaterialsTable";
import AddMaterialDialog from "./components/AddMaterialDialog";

const materialsData = [
  {
    code: "SIPL.ASY.PBT.001",
    name: "Upper Case",
    category: "Raw Material",
    available: 600,
    minimum: 100,
    updated: "-",
  },
  {
    code: "SIPL.ASY.PBT.002",
    name: "Screws",
    category: "Raw Material",
    available: 300,
    minimum: 100,
    updated: "-",
  },
  {
    code: "SIPL.ASY.PC.A.001",
    name: "Mainboard With Components",
    category: "Raw Material",
    available: 600,
    minimum: 100,
    updated: "-",
  },
  {
    code: "SIPL.ASY.MC.002",
    name: "Silicon T-shaped tube",
    category: "Raw Material",
    available: 300,
    minimum: 100,
    updated: "-",
  },
];

export default function Store() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({
    name: "",
    code: "",
    category: "",
    available: "",
    minimum: "",
    unit: "",
    location: "",
  });

  const router = useRouter();

  const handleTabChange = (e, newValue) => setTab(newValue);

  const filtered = materialsData.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Material Saved:", form);
    setOpenDialog(false);
  };

  return (
    <Box>
      <CommonCard
        title="Store"
        addText="Add Material"
        onAdd={() => setOpenDialog(true)}
        searchPlaceholder="Search Materials"
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <StoreTabs value={tab} handleChange={handleTabChange} />

        <MaterialsTable
          data={filtered}
          onView={(code) => router.push(`/store/${code}`)}
        />

        <AddMaterialDialog
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          form={form}
          handleChange={handleChange}
          handleSave={handleSave}
        />
      </CommonCard>
    </Box>
  );
}
