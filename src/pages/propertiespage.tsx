import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getallProperty, removePropertyById } from "../service/propertyServices";
import type { Property } from "../types/property";
import PropertyCard from "../components/propertyCard";

export default function PropertyPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate=useNavigate()

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const resp = await getallProperty();
        setProperties(resp);
      } catch {
        setError("Unable to load properties");
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, []);
  const handledelete = async(id:string)=>{
    try {
      await removePropertyById(id);
    } catch (error) {
      throw new Error("Error:---",{cause:error})
    }
  }
  if (loading) return <Box>Loading...</Box>
  if (error || !properties) {
    return (
      <Typography color="error" align="center" sx={{ mt: 10 }}>
        {error || "property not found"}
      </Typography>
    );
  }
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Properties
        </Typography>

        <Button variant="contained" onClick={()=>navigate("/owner-property/add")}>
          + ADD
        </Button>
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
          <PropertyCard key={property.id} property={property}>
            <Button onClick={()=>handledelete(property.id)}>Delete</Button>
          </PropertyCard>
        ))}
      </Box>
    </Box>
  );
}