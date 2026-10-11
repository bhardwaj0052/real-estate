import { useEffect, useState } from "react";
import type { Property } from "../types/property";
import { Box, Typography, Button } from "@mui/material";
import PropertyCard from "../components/propertyCard";
import { getapprovedProperty, saveProperty } from "../service/propertyServices";

export default function ApprovedProperty() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const resp = await getapprovedProperty();
        setProperties(resp);
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Properties
        </Typography>
      </Box>

      {loading && <Typography>Loading...</Typography>}

      {error && (
        <Typography component="p" color="error">
          {error}
        </Typography>
      )}

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
        {properties.map((property) => (
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
