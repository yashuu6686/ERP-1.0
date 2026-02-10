import React from "react";
import { Tabs, Tab, useMediaQuery, useTheme } from "@mui/material";

const StoreTabs = ({ value, handleChange }) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

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
                    fontWeight: 400,
                    textTransform: "none",
                    fontSize: isSmall ? "0.85rem" : "0.95rem",
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
                    },
                },
            }}
        >
            <Tab label="Raw Materials" />
            <Tab label="IT Items" />
            <Tab label="Finished Products" />
            <Tab label="Other Items" />
        </Tabs>
    );
};

export default StoreTabs;
