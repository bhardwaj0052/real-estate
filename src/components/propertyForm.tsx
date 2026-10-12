import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createProperty } from "../service/propertyServices";

const propertyTypes = [
  "Apartment",
  "Villa",
  "Independent House",
  "Plot",
  "Commercial",
];

const validationSchema = Yup.object({
  title: Yup.string().trim().min(6).required("Title is required"),
  description: Yup.string().trim().min(6).required("Description is required"),
  propertyType: Yup.string()
    .oneOf(propertyTypes)
    .required("Property type is required"),
  bhk: Yup.number()
    .typeError("BHK must be a number")
    .integer()
    .min(0)
    .required("BHK is required"),
  sqft: Yup.number()
    .typeError("Sqft must be a number")
    .positive()
    .required("Sqft is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive()
    .required("Price is required"),
  fullAddress: Yup.string().trim().min(6).required("Full address is required"),
  latitude: Yup.number()
    .typeError("Latitude must be a number")
    .min(-90)
    .max(90)
    .required("Latitude is required"),
  longitude: Yup.number()
    .typeError("Longitude must be a number")
    .min(-180)
    .max(180)
    .required("Longitude is required"),
  amenities: Yup.string().trim().required("Add at least one amenity"),
  images: Yup.string()
    .trim()
    .required("Image URL is required")
    .test("valid-urls", "Enter valid image URLs separated by commas", (value) =>
      (value || "")
        .split(",")
        .map((u) => u.trim())
        .filter(Boolean)
        .every((u) => Yup.string().url().isValidSync(u)),
    ),
});

export default function PropertyForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      propertyType: "Apartment",
      bhk: "",
      sqft: "",
      price: "",
      fullAddress: "",
      latitude: "",
      longitude: "",
      amenities: "",
      images: "",
    },
    validationSchema,
    onSubmit: async (values, { setStatus }) => {
      setStatus("");
      try {
        await createProperty({
          title: values.title,
          description: values.description,
          address: values.fullAddress,
          lat: Number(values.latitude),
          lng: Number(values.longitude),
          propertyType: values.propertyType,
          bhk: Number(values.bhk),
          sqft: Number(values.sqft),
          price: Number(values.price),
          amenities: values.amenities
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean),
          images: values.images
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean),
        });
        navigate("/owner-property");
      } catch {
        setStatus("Unable to create property. Please try again.");
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (
    <Box sx={{ mt: 5, marginLeft: 50, pb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Create Property
      </Typography>

      <Card sx={{ maxWidth: 720 }}>
        <CardContent component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.title && errors.title && (
              <Typography component="p" color="error" variant="caption">
                {errors.title}
              </Typography>
            )}

            <TextField
              label="Description"
              name="description"
              multiline
              minRows={3}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.description && errors.description && (
              <Typography component="p" color="error" variant="caption">
                {errors.description}
              </Typography>
            )}

            <TextField
              select
              label="Property Type"
              name="propertyType"
              value={values.propertyType}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {propertyTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            {touched.propertyType && errors.propertyType && (
              <Typography component="p" color="error" variant="caption">
                {errors.propertyType}
              </Typography>
            )}

            <TextField
              label="BHK"
              name="bhk"
              type="number"
              value={values.bhk}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.bhk && errors.bhk && (
              <Typography component="p" color="error" variant="caption">
                {errors.bhk}
              </Typography>
            )}

            <TextField
              label="Sqft"
              name="sqft"
              type="number"
              value={values.sqft}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.sqft && errors.sqft && (
              <Typography component="p" color="error" variant="caption">
                {errors.sqft}
              </Typography>
            )}

            <TextField
              label="Price"
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.price && errors.price && (
              <Typography component="p" color="error" variant="caption">
                {errors.price}
              </Typography>
            )}

            <TextField
              label="Full Address"
              name="fullAddress"
              multiline
              minRows={2}
              value={values.fullAddress}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.fullAddress && errors.fullAddress && (
              <Typography component="p" color="error" variant="caption">
                {errors.fullAddress}
              </Typography>
            )}

            <TextField
              label="Latitude"
              name="latitude"
              type="number"
              value={values.latitude}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.latitude && errors.latitude && (
              <Typography component="p" color="error" variant="caption">
                {errors.latitude}
              </Typography>
            )}

            <TextField
              label="Longitude"
              name="longitude"
              type="number"
              value={values.longitude}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.longitude && errors.longitude && (
              <Typography component="p" color="error" variant="caption">
                {errors.longitude}
              </Typography>
            )}

            <TextField
              label="Amenities (comma separated)"
              name="amenities"
              placeholder="Parking, Lift, Gym"
              value={values.amenities}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.amenities && errors.amenities && (
              <Typography component="p" color="error" variant="caption">
                {errors.amenities}
              </Typography>
            )}

            <TextField
              label="Image URLs (comma separated)"
              name="images"
              placeholder="https://a.com/1.jpg, https://a.com/2.jpg"
              value={values.images}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.images && errors.images && (
              <Typography component="p" color="error" variant="caption">
                {errors.images}
              </Typography>
            )}

            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Property"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
