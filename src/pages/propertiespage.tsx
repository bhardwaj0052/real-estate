import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/propertyCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteProperty, fetchProperties } from "../store/propertySlice";

export default function PropertyPage() {
  const dispatch = useAppDispatch();
  const property = useAppSelector((state) => state.property);
  const properties = property.items;
  const loading = property.loading;
  const error = property.error;
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const handledelete = async (id: string) => {
    try {
      await dispatch(deleteProperty(id)).unwrap();
    } catch {
      alert("Unable to delete property");
    }
  };

  const filteredProperties = statusFilter
    ? properties.filter((p) => p.status === statusFilter)
    : properties;

  if (loading) return <Box sx={{ p: 3 }}>Loading...</Box>;

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
          Properties
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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

          <Button variant="contained" onClick={() => navigate("/owner-property/add")}>
            + ADD
          </Button>
        </Box>
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
  <PropertyCard key={item.id} property={item}>
    {item.rejectionReason && (
      <Typography variant="body2" color="error">
        Rejected: {item.rejectionReason}
      </Typography>
    )}
    <Button color="error" onClick={() => handledelete(item.id!)}>
      Delete
    </Button>
  </PropertyCard>
))}
      </Box>
    </Box>
  );
}