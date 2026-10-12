import { useEffect, useState } from "react";
import type { Property } from "../types/property";
import { Box,Button,Typography } from "@mui/material";
import PropertyCard from "../components/propertyCard";
import { getsavedProperty, removeSavedProperty } from "../service/propertyServices";
import { useNavigate } from "react-router-dom";

export default function FavProperty(){
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    const loadProperty = async () => {
      try {
        const resp = await getsavedProperty();
        setProperties(resp);
      } catch {
        setError("Unable to load properties");
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, []);

  const removesave = async(id:string)=>{
    try {
      await removeSavedProperty(id)
      navigate("/property")
    } catch (error) {
      throw new Error("Error:--",{cause: error})
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
          Favourite
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
          <PropertyCard key={property.id} property={property} phone={property.phone} >
            <Button onClick={()=>removesave(property.id)}>Remove</Button>
          </PropertyCard>
        ))}
      </Box>
    </Box>
  );
}