import React from "react";
import { Grid, Typography, Paper, Stack, Box, Chip } from "@mui/material";
import { Person, Phone, Email } from "@mui/icons-material";

const AddressCard = ({ title, company, address, chips = [], contact, phone, email }) => (
    <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2" sx={{ color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", mb: 2.5 }}>
            {title}
        </Typography>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '2px solid #f1f5f9', height: '100%' }}>
            <Stack spacing={3}>
                <Box>
                    <Typography variant="h6" fontWeight={800} color="#1e293b" sx={{ mb: 1 }}>{company}</Typography>
                    <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.6 }}>{address}</Typography>
                </Box>

                {chips.length > 0 && (
                    <Stack direction="row" spacing={1}>
                        {chips.map((chip, idx) => chip.value && (
                            <Chip
                                key={idx}
                                label={`${chip.label}: ${chip.value}`}
                                size="small"
                                sx={{ fontWeight: 700, bgcolor: "#fff", border: '1px solid #e2e8f0', color: chip.color || '#475569' }}
                            />
                        ))}
                    </Stack>
                )}

                <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Person sx={{ color: "#94a3b8", fontSize: 18 }} />
                        <Typography variant="body2" fontWeight={600}>{contact}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Phone sx={{ color: "#94a3b8", fontSize: 18 }} />
                        <Typography variant="body2" fontWeight={600}>{phone}</Typography>
                    </Stack>
                    {email && (
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Email sx={{ color: "#94a3b8", fontSize: 18 }} />
                            <Typography variant="body2" fontWeight={600}>{email}</Typography>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </Paper>
    </Grid>
);

const EntityInformation = ({ supplier, delivery }) => {
    return (
        <Grid container spacing={4} sx={{ mb: 6 }}>
            <AddressCard
                title="Vendor / Supplier"
                company={supplier.companyName}
                address={supplier.address}
                contact={supplier.contactPerson}
                phone={supplier.phone}
                email={supplier.email}
                chips={[
                    { label: "GSTIN", value: supplier.gstin, color: "#1172ba" },
                    { label: "PAN", value: supplier.pan }
                ]}
            />

            <AddressCard
                title="Ship To / Delivery"
                company={delivery.invoiceTo}
                address={delivery.deliveryAddress}
                contact={delivery.contactPerson}
                phone={delivery.phone}
                email={delivery.email}
                chips={[
                    { label: "Deliver To", value: delivery.deliverTo, color: "#1172ba" }
                ]}
            />
        </Grid>
    );
};

export default EntityInformation;
