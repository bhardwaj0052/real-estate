import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import type { Property } from "../types/property";
import type { ReactNode } from "react";

interface Prop {
  property: Property;
  phone?: number;
  children?: ReactNode;
}

export default function PropertyCard({
  property,
  phone,
  children,
}: Prop) {
  const [currentImage, setCurrentImage] = useState(0);

  const images = property.images ?? [];

  const handlePrevious = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Card key={property.id} sx={{ width: "100%", maxWidth: 360 }}>
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
            <Typography color="text.secondary">
              No image available
            </Typography>
          </Box>
        )}

        {images.length > 1 && (
          <>
            <IconButton
              onClick={handlePrevious}
              aria-label="Previous image"
              sx={{
                position: "absolute",
                top: "50%",
                left: 8,
                transform: "translateY(-50%)",
                bgcolor: "white",
                "&:hover": { bgcolor: "grey.200" },
              }}
            >
              <ArrowBackIos fontSize="small" />
            </IconButton>

            <IconButton
              onClick={handleNext}
              aria-label="Next image"
              sx={{
                position: "absolute",
                top: "50%",
                right: 8,
                transform: "translateY(-50%)",
                bgcolor: "white",
                "&:hover": { bgcolor: "grey.200" },
              }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>

            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                left: "50%",
                transform: "translateX(-50%)",
                bgcolor: "rgba(0,0,0,0.6)",
                color: "white",
                px: 1.5,
                py: 0.3,
                borderRadius: 2,
                fontSize: 12,
              }}
            >
              {currentImage + 1} / {images.length}
            </Box>
          </>
        )}
      </Box>
      <CardContent>
        <Stack spacing={1.5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700 }}
              noWrap
            >
              {property.title}
            </Typography>

            <Chip
              label={property.status}
              size="small"
              color="success"
            />
          </Box>

          <Chip
            label={property.propertyType}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ alignSelf: "flex-start" }}
          />

          <Typography variant="h6" color="primary">
            ₹{property.price}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {property.bhk} BHK • {property.sqft} sqft
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
          >
            {property.address}
          </Typography>

          <Typography variant="body2">
            {property.description}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {property.amenities.map((amenity) => (
              <Chip
                key={amenity}
                label={amenity}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>

          {phone && (
            <Box>
              <Typography>Contact owner</Typography>
              <Button
                variant="contained"
                startIcon={<PhoneIcon />}
              >
                {phone}
              </Button>
            </Box>
          )}
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
}