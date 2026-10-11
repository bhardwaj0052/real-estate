import { useEffect, useState } from "react";
import type { Property } from "../types/property";
import { getallProperty } from "../service/propertyServices";
import { Box, CircularProgress, Typography } from "@mui/material";
import PropertyStatus from "../components/PropertyStatus";

export default function AdminPropertyStatus() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const resp = await getallProperty();
        setProperties(resp);
        setError("");
      } catch {
        setError("Unable to load properties");
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [refresh]);

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

  if (properties.length === 0) {
    return (
      <Typography align="center" sx={{ mt: 10 }}>
        No properties found
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Property Status
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 3,
        }}
      >
        {properties.map((property) => (
          <PropertyStatus
            key={property.id}
            property={property}
            onUpdated={() => setRefresh((r) => r + 1)}
          />
        ))}
      </Box>
    </Box>
  );
}