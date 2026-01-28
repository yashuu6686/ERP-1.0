import React from "react";
import CommonCard from "../../src/components/CommonCard";
import { Typography } from "@mui/material";

function Dashboard() {
  return (
    <CommonCard title="Dashboard">
      <Typography variant="h6" color="textSecondary">
        Welcome to your Dashboard
      </Typography>
    </CommonCard>
  );
}

export default Dashboard;