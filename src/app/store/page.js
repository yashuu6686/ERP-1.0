"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import StoreTabs from "./components/StoreTabs";
import GlobalTable from "../../components/GlobalTable";
import AddMaterialDialog from "./components/AddMaterialDialog";
import axiosInstance from "../../axios/axiosInstance";
import Loader from "../../components/Loader";

export default function Store() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    fetchData();
  }, [tab]);

  const fetchData = async () => {
    const endpoints = ["/store", "/it-goods", "/finish-goods", "/other-goods"];
    try {
      setLoading(true);
      const response = await axiosInstance.get(endpoints[tab]);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching store data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (e, newValue) => setTab(newValue);

  const filtered = data.filter(
    (m) =>
      (m.name || m.itemName || "").toLowerCase().includes(search.toLowerCase()) ||
      (m.code || m.id || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const endpoint = form.category || "/store";
      const payload = {
        ...form,
        available: Number(form.available) || 0,
        minimum: Number(form.minimum) || 0,
        updated: new Date().toISOString().split("T")[0]
      };

      const response = await axiosInstance.post(endpoint, payload);
      if (response.status === 201 || response.status === 200) {
        alert("Material added successfully!");
        setOpenDialog(false);
        setForm({
          name: "",
          code: "",
          category: "",
          available: "",
          minimum: "",
          unit: "",
          location: "",
        });
        fetchData();
      }
    } catch (error) {
      console.error("Error saving material:", error);
      alert("Failed to save material.");
    }
  };

  const columns = [
    {
      label: "Sr.No.",
      align: "center",
      render: (row, index) => (
        <span style={{ fontWeight: 600 }}>{index + 1}</span>
      ),
    },
    {
      label: "Material Code",
      align: "center",
      render: (row) => (
        <span style={{ fontWeight: 600, color: "#1172ba" }}>
          {row.code || row.id || "-"}
        </span>
      ),
    },
    {
      label: "Material Name",
      align: "center",
      render: (row) => row.name || row.itemName || "-",
    },
    {
      label: "Category",
      align: "center",
      render: (row) => row.category || "-",
    },
    {
      label: "Available Qty",
      align: "center",
      render: (row) => {
        const qty = row.available ?? row.stock ?? 0;
        const min = row.minimum ?? 0;
        return (
          <Chip
            label={qty}
            color={qty <= min ? "error" : "success"}
            size="small"
          />
        );
      },
    },
    {
      label: "Minimum Qty",
      align: "center",
      render: (row) => row.minimum ?? "-",
    },
    {
      label: "Unit",
      align: "center",
      render: (row) => row.unit || "Pcs",
    },
    {
      label: "Location",
      align: "center",
      render: (row) => row.location || "-",
    },
    {
      label: "Last Updated",
      align: "center",
      render: (row) => row.updated || "-",
    },
    {
      label: "Actions",
      align: "center",
      render: (row) => (
        <IconButton
          size="small"
          onClick={() => router.push(`/store/${row.code || row.id}`)}
          sx={{
            color: "rgb(17, 114, 186)",
            bgcolor: "#f1f5f9",
            "&:hover": { bgcolor: "#e2e8f0" },
          }}
        >
          <Visibility fontSize="small" />
        </IconButton>
      ),
    },
  ];

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

        {loading ? (
          <Loader message="Loading store data..." />
        ) : (
          <GlobalTable columns={columns} data={filtered} />
        )}

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
