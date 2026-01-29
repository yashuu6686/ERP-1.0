// import React from "react";
// import { Card, Box, Typography, CardContent, Grid, TextField } from "@mui/material";
// import { AppRegistration } from "@mui/icons-material";

// const ApprovalSection = ({ data, onChange }) => {
//     return (
//         <Card
//             elevation={0}
//             sx={{
//                 marginBottom: 4,
//                 borderRadius: 2,
//                 border: "1px solid #e2e8f0",
//                 overflow: "hidden",
//             }}
//         >
//             <Box
//                 sx={{
//                     padding: 2,
//                     background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 2,
//                 }}
//             >
//                 <AppRegistration sx={{ color: "#fff", fontSize: 24 }} />
//                 <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600 }}>
//                     Approval
//                 </Typography>
//             </Box>

//             <CardContent sx={{ padding: 3 }}>
//                 <Grid container spacing={3}>
//                     <Grid item size={{ xs: 12, md: 6 }}>
//                         <Box
//                             sx={{
//                                 p: 2,
//                                 bgcolor: "#f8fafc",
//                                 borderRadius: 2,
//                                 border: "1px solid #e2e8f0",
//                             }}
//                         >
//                             <Typography
//                                 variant="subtitle2"
//                                 sx={{ mb: 2, fontWeight: 700, color: "#475569" }}
//                             >
//                                 Reviewed By
//                             </Typography>
//                             <Grid container spacing={2}>
//                                 <Grid item size={{ xs: 12, sm: 6 }}>
//                                     <TextField
//                                         fullWidth
//                                         label="Signature"
//                                         size="small"
//                                         placeholder="signature images"
//                                         value={data.reviewedBy}
//                                         onChange={(e) => onChange("reviewedBy", e.target.value)}
//                                     />
//                                 </Grid>
//                                 <Grid item size={{ xs: 12, sm: 6 }}>
//                                     <TextField
//                                         fullWidth
//                                         label="Date"
//                                         size="small"
//                                         type="date"
//                                         InputLabelProps={{ shrink: true }}
//                                         value={data.reviewedDate}
//                                         onChange={(e) => onChange("reviewedDate", e.target.value)}
//                                     />
//                                 </Grid>
//                             </Grid>
//                         </Box>
//                     </Grid>
//                     <Grid item size={{ xs: 12, md: 6 }}>
//                         <Box
//                             sx={{
//                                 p: 2,
//                                 bgcolor: "#f8fafc",
//                                 borderRadius: 2,
//                                 border: "1px solid #e2e8f0",
//                             }}
//                         >
//                             <Typography
//                                 variant="subtitle2"
//                                 sx={{ mb: 2, fontWeight: 700, color: "#475569" }}
//                             >
//                                 Approved By
//                             </Typography>
//                             <Grid container spacing={2}>
//                                 <Grid item size={{ xs: 12, sm: 6 }}>
//                                     <TextField
//                                         fullWidth
//                                         label="Signature"
//                                         size="small"
//                                         placeholder="signature images"
//                                         value={data.approvedBy}
//                                         onChange={(e) => onChange("approvedBy", e.target.value)}
//                                     />
//                                 </Grid>
//                                 <Grid item size={{ xs: 12, sm: 6 }}>
//                                     <TextField
//                                         fullWidth
//                                         label="Date"
//                                         size="small"
//                                         type="date"
//                                         InputLabelProps={{ shrink: true }}
//                                         value={data.approvedDate}
//                                         onChange={(e) => onChange("approvedDate", e.target.value)}
//                                     />
//                                 </Grid>
//                             </Grid>
//                         </Box>
//                     </Grid>
//                 </Grid>
//             </CardContent>
//         </Card>
//     );
// };

// export default ApprovalSection;
