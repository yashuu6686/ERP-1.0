import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const MaterialIssueTabs = ({ value, handleChange }) => {
    return (
        <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
                style: { display: "none" },
            }}
            sx={{
                mb: 3,
                minHeight: "45px",
                borderBottom: "1px solid #e2e8f0",
                "& .MuiTab-root": {
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "15px",
                    minHeight: "45px",
                    px: 3,
                    color: "#64748b",
                    borderRadius: "10px 10px 0 0",
                    transition: "all 0.2s",
                    "&:hover": {
                        color: "#1172ba",
                        backgroundColor: "rgba(17, 114, 186, 0.04)",
                    },
                    "&.Mui-selected": {
                        color: "#fff",
                        backgroundColor: "#1172ba",
                        boxShadow: "0 4px 12px rgba(17, 114, 186, 0.2)"
                    },
                },
            }}
        >
            <Tab label="Material Requests" />
            <Tab label="Defective Returns" />
        </Tabs>
    );
};

export default MaterialIssueTabs;
