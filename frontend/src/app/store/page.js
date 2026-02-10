"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/ui/CommonCard";
import StoreTabs from "./components/StoreTabs";
import GlobalTable from "../../components/ui/GlobalTable";
import AddMaterialDialog from "./components/AddMaterialDialog";
import axiosInstance from "../../axios/axiosInstance";
import Loader from "../../components/ui/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";

const tabEndpoints = ["/store", "/it-goods", "/finish-goods", "/other-goods"];

export default function Store() {
  const { checkPermission } = useAuth();
  const { showNotification } = useNotification();
  const [tab, setTab] = useState(0);
  const tabLabels = ["Raw Materials", "IT Items", "Finished Products", "Other Items"];

  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const canCreate = checkPermission('store', 'create');
  const canView = checkPermission('store', 'view');

  const validationSchema = Yup.object({
    name: Yup.string().required("Material Name is required"),
    code: Yup.string().required("Material Code is required"),
    category: Yup.string().required("Category is required"),
    available: Yup.number().typeError("Must be a number").min(0, "Cannot be negative").required("Available Quantity is required"),
    minimum: Yup.number().typeError("Must be a number").min(0, "Cannot be negative").required("Minimum Stock Level is required"),
    unit: Yup.string().required("Unit is required"),
    location: Yup.string().required("Storage Location is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      category: "",
      available: "",
      minimum: "",
      unit: "",
      location: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const endpoint = values.category || "/store";
        const payload = {
          ...values,
          available: Number(values.available) || 0,
          minimum: Number(values.minimum) || 0,
          updated: new Date().toISOString().split("T")[0]
        };

        const response = await axiosInstance.post(endpoint, payload);
        if (response.status === 201 || response.status === 200) {
          showNotification("Material added successfully!", "success");
          setOpenDialog(false);
          resetForm();
          fetchData();
        }
      } catch (error) {
        console.error("Error saving material:", error);
        showNotification("Failed to save material.", "error");
      }
    },
  });

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(tabEndpoints[tab]);

      setData(response.data);
    } catch (error) {
      console.error("Error fetching store data:", error);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTabChange = (e, newValue) => setTab(newValue);

  const filtered = data.filter(
    (m) =>
      (m.name || m.itemName || "").toLowerCase().includes(search.toLowerCase()) ||
      (m.code || m.id || "").toLowerCase().includes(search.toLowerCase())
  );

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
        <>
          {canView && (
            <IconButton
              size="small"
              onClick={() => router.push(`/store/${encodeURIComponent(row.id || row.code)}`)}
              sx={{
                color: "rgb(17, 114, 186)",
                bgcolor: "#f1f5f9",
                "&:hover": { bgcolor: "#e2e8f0" },
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  return (
    <Box>
      <CommonCard
        title={tabLabels[tab]}
        addText={canCreate ? `Add ${tabLabels[tab].replace(/s$/, "")}` : null}
        onAdd={canCreate ? () => {
          formik.setFieldValue("category", tabEndpoints[tab]);
          setOpenDialog(true);
        } : null}
        searchPlaceholder={`Search ${tabLabels[tab]}`}
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
          handleClose={() => {
            setOpenDialog(false);
            formik.resetForm();
          }}
          formik={formik}
        />
      </CommonCard>
    </Box>
  );
}
