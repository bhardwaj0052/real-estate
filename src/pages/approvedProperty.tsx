import { useEffect, useState } from "react";
import type { Property } from "../types/property";
import { Box, Typography, Button, TextField } from "@mui/material";
import PropertyCard from "../components/propertyCard";
import { getapprovedProperty, saveProperty } from "../service/propertyServices";

export default function ApprovedProperty() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredproperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const resp = await getapprovedProperty();
        setProperties(resp);
        setFilteredProperties(resp);
      } catch {
        setError("Unable to load properties");
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, []);
  const handlesave = async (id: string) => {
    try {
      await saveProperty(id);
    } catch (error) {
      throw new Error("Error:---", { cause: error });
    }
  };
  const searchprop = (value: string) => {
    const text = value.trim().toLowerCase();

    if (!text) {
      setFilteredProperties(properties);
      return;
    }

    setFilteredProperties(
      properties.filter(
        (property) =>
          property.title.toLowerCase().includes(text) ||
          property.address.toLowerCase().includes(text),
      ),
    );
  };
  if (loading) return <Box>Loading...</Box>;
  if (error || !properties) {
    return (
      <Typography color="error" align="center" sx={{ mt: 10 }}>
        {error || "property not found"}
      </Typography>
    );
  }
  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Properties
        </Typography>
        <TextField
          label="Search by title, address or description"
          onChange={(e) =>
            searchprop(e.target.value)}
          fullWidth
        />
      </Box>

      {!loading && !error && properties.length === 0 && (
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
            <Button onClick={() => handlesave(property.id)}>Add to Fav</Button>
          </PropertyCard>
        ))}
      </Box>
    </Box>
  );
}
