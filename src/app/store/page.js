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
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

export default function Store() {
  const [materialsData, setMaterialsData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/store");
      console.log(response.data);
      const inspections = response.data || [];

      // Logic to aggregate stock by Material Name
      const inventoryMap = {};

      inspections.forEach((item) => {
        // Handle both aggregated inspection format and flat store format
        const name = item.materialData?.materialName || item.materialName || item.name || "Unknown Material";
        const code = item.materialData?.grnNumber || item.grnNumber || item.code || item.materialCode || "N/A";
        const acceptedQty = Number(item.summaryData?.acceptedQuantity || item.acceptedQuantity || item.available || item.quantity || 0);
        const inspectionDate = item.materialData?.inspectionDate || item.inspectionDate || item.updatedAt || item.date || "-";

        // Category detection
        let category = item.category || "Other Items";
        const lowerName = name.toLowerCase();

        // If category is not standard, try to guess it
        const standardCategories = ["Raw Materials", "IT Items", "Finished Products"];
        if (!standardCategories.includes(category)) {
          if (lowerName.includes("case") || lowerName.includes("screw") || lowerName.includes("battery") || lowerName.includes("wire")) {
            category = "Raw Materials";
          } else if (lowerName.includes("laptop") || lowerName.includes("monitor") || lowerName.includes("it") || lowerName.includes("pc")) {
            category = "IT Items";
          } else if (lowerName.includes("watch") || lowerName.includes("smart") || lowerName.includes("buds") || lowerName.includes("device")) {
            category = "Finished Products";
          } else {
            category = "Other Items";
          }
        }

        if (inventoryMap[name]) {
          inventoryMap[name].available += acceptedQty;
        } else {
          inventoryMap[name] = {
            code: code,
            name: name,
            category: category,
            available: acceptedQty,
            minimum: item.minimum || item.minStock || 100,
            updated: inspectionDate,
          };
        }
      });

      setMaterialsData(Object.values(inventoryMap));
    } catch (error) {
      console.error("Error fetching store data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (e, newValue) => setTab(newValue);

  const categories = ["Raw Materials", "IT Items", "Finished Products", "Other Items"];

  const filtered = materialsData.filter((m) => {
    const mainCategories = ["Raw Materials", "IT Items", "Finished Products"];
    const isOtherTab = categories[tab] === "Other Items";

    // An item matches the tab if:
    // 1. Its category exactly matches the current tab category
    // 2. OR its category is not in the main list and we are on the 'Other' tab
    const matchesTab =
      m.category === categories[tab] ||
      (isOtherTab && !mainCategories.includes(m.category));

    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.code.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Material Saved:", form);
    setOpenDialog(false);
  };

  const columns = [
    {
      label: "Sr. No.",
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
          <Loader message="Synchronizing Store Inventory..." />
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
