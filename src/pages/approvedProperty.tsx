import { useEffect, useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import PropertyCard from "../components/propertyCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchApprovedProperties,
  savePropertyThunk,
} from "../store/propertySlice";

export default function ApprovedProperty() {
  const dispatch = useAppDispatch();
  const property = useAppSelector((state) => state.property);
  const approvedItems = property.approvedItems;
  const loading = property.loading;
  const error = property.error;
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchApprovedProperties());
  }, [dispatch]);

  const handlesave = async (id: string) => {
    try {
      await dispatch(savePropertyThunk(id)).unwrap();
      alert("Added to favourites");
    } catch {
      alert("Unable to add to favourites");
    }
  };

  const text = search.trim().toLowerCase();
  const filteredproperties = approvedItems.filter(
    (property) =>
      property.title.toLowerCase().includes(text) ||
      property.address.toLowerCase().includes(text),
  );

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
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Properties
        </Typography>
        <TextField
          label="Search by title or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
      </Box>

      {filteredproperties.length === 0 && (
        <Typography>No properties found</Typography>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 3,
        }}
      >
        {filteredproperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            phone={property.phone}
          >
            <Button onClick={() => handlesave(property.id!)}>Add to Fav</Button>
          </PropertyCard>
        ))}
      </Box>
    </Box>
  );
}
