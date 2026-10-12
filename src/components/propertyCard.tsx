import { useState } from "react";
import type { ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import type { Property } from "../types/property";

interface Prop {
  property: Property;
  phone?: number;
  children?: ReactNode;
}

const arrowSx = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  bgcolor: "rgba(255,255,255,0.9)",
  width: 32,
  height: 32,
  "&:hover": { bgcolor: "white" },
};

export default function PropertyCard({ property, phone, children }: Prop) {
  const [currentImage, setCurrentImage] = useState(0);

  const images = property.images ?? [];
  const amenities = property.amenities ?? [];

  const statusColor =
    property.status === "APPROVED"
      ? "success"
      : property.status === "REJECTED"
        ? "error"
        : "warning";

  const handlePrevious = () =>
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleNext = () =>
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 360,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      {/* Image */}
      <Box sx={{ position: "relative" }}>
        {images.length > 0 ? (
          <CardMedia
            component="img"
            height="200"
            image={images[currentImage]}
            alt={property.title}
            sx={{ objectFit: "cover" }}
          />
        ) : (
          <Box
            sx={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "grey.200",
            }}
          >
            <Typography color="text.secondary">No image available</Typography>
          </Box>
        )}

        {/* Status on the image */}
        <Chip
          label={property.status}
          size="small"
          color={statusColor}
          sx={{ position: "absolute", top: 10, left: 10, fontWeight: 600 }}
        />

        {images.length > 1 && (
          <>
            <IconButton
              onClick={handlePrevious}
              aria-label="Previous image"
              sx={{ ...arrowSx, left: 8 }}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
            </IconButton>

            <IconButton
              onClick={handleNext}
              aria-label="Next image"
              sx={{ ...arrowSx, right: 8 }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
            </IconButton>

            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                right: 10,
                bgcolor: "rgba(0,0,0,0.6)",
                color: "white",
                px: 1.2,
                py: 0.2,
                borderRadius: 2,
                fontSize: 12,
              }}
            >
              {currentImage + 1} / {images.length}
            </Box>
          </>
        )}
      </Box>

      {/* Details */}
      <CardContent sx={{ flexGrow: 1, display: "flex" }}>
        <Stack spacing={1.5} sx={{ flexGrow: 1, minWidth: 0 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }} noWrap>
              {property.title}
            </Typography>
            <Chip
              label={property.propertyType}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>

          <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
            ₹{property.price.toLocaleString("en-IN")}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {property.bhk} BHK • {property.sqft} sqft
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocationOnIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" noWrap>
              {property.address}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {property.description}
          </Typography>

         {amenities.length > 0 && (
  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
    {amenities.map((amenity) => (
      <Chip key={amenity} label={amenity} size="small" variant="outlined" />
    ))}
  </Box>
)}

          {(phone || children) && <Divider sx={{ mt: "auto !important" }} />}

          {phone && (
            <Stack sx ={{direction:"row", alignItems:"center", justifyContent:"space-between"}}>
              <Typography variant="body2" color="text.secondary">
                Contact owner
              </Typography>
              <Button
                size="small"
                variant="contained"
                startIcon={<PhoneIcon />}
                component="a"
                href={`tel:${phone}`}
              >
                {phone}
              </Button>
            </Stack>
          )}

          {children}
        </Stack>
      </CardContent>
    </Card>
  );
}