import { useEffect, useState } from "react";
import { Box, CircularProgress, MenuItem, TextField, Typography } from "@mui/material";
import PropertyStatus from "../components/PropertyStatus";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProperties } from "../store/propertySlice";

export default function AdminPropertyStatus() {
  const dispatch = useAppDispatch();
  const property = useAppSelector((state) => state.property);
  const properties = property.items;
  const loading = property.loading;
  const error = property.error;
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const filteredProperties = statusFilter
    ? properties.filter((p) => p.status === statusFilter)
    : properties;

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 10 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Property Status
        </Typography>

        <TextField
          select
          size="small"
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="PENDING">Pending</MenuItem>
          <MenuItem value="APPROVED">Approved</MenuItem>
          <MenuItem value="REJECTED">Rejected</MenuItem>
        </TextField>
      </Box>

      {filteredProperties.length === 0 && <Typography>No properties found</Typography>}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 3,
        }}
      >
        {filteredProperties.map((item) => (
          <PropertyStatus key={item.id} property={item} />
        ))}
      </Box>
    </Box>
  );
}