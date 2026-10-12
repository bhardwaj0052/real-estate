import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { login, signup } from "../service/authServices";

const ROLES = ["OWNER", "BUYER"];

export default function Authform() {
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: isSignup
        ? Yup.string().trim().min(4, "Min 4 characters").required("Name is required")
        : Yup.string(),
     phone: isSignup
  ? Yup.string()
      .trim()
      .matches(/^[6-9]\d{9}$/, "Enter a valid 10 digit phone number")
      .required("Phone is required")
  : Yup.string(),
      role: isSignup
        ? Yup.string().oneOf(ROLES, "Select a role").required("Role is required")
        : Yup.string(),
      email: Yup.string().trim().email("Enter a valid email").required("Email is required"),
      password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (isSignup) {
            const signupbody={
            name: values.name,
            email: values.email,
            phone: Number(values.phone),
            role: values.role,
            password: values.password,
          }
          await signup(signupbody);
          alert("Signup successful. Please login.");
          setIsSignup(false);
          formik.resetForm({
            values: { name: "", email: values.email, phone: "", role: "", password: "" },
          });
        } else {
          await login({ email: values.email, password: values.password });
          navigate("/");
        }
      } catch (error) {
        throw new Error("Error:--",{cause:error})
      }
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = formik;

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    formik.resetForm();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent component="form" onSubmit={handleSubmit} noValidate sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {isSignup ? "Sign Up" : "Login"}
            </Typography>

            {isSignup && (
              <>
                <TextField
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name && (
                  <Typography component="p" color="error" variant="caption">
                    {errors.name}
                  </Typography>
                )}

                <TextField
  label="Phone"
  name="phone"
  type="tel"
  value={values.phone}
  onChange={handleChange}
  onBlur={handleBlur}
/>
                {touched.phone && errors.phone && (
                  <Typography component="p" color="error" variant="caption">
                    {errors.phone}
                  </Typography>
                )}

                <TextField
                  select
                  label="Role"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {ROLES.map((r) => (
                    <MenuItem key={r} value={r}>
                      {r}
                    </MenuItem>
                  ))}
                </TextField>
                {touched.role && errors.role && (
                  <Typography component="p" color="error" variant="caption">
                    {errors.role}
                  </Typography>
                )}
              </>
            )}

            <TextField
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <Typography component="p" color="error" variant="caption">
                {errors.email}
              </Typography>
            )}

            <TextField
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <Typography component="p" color="error" variant="caption">
                {errors.password}
              </Typography>
            )}

            <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
            </Button>

            <Typography variant="body2" align="center">
              {isSignup ? "Already have an account?" : "New user?"}{" "}
              <Link component="button" type="button" onClick={toggleMode} underline="hover">
                {isSignup ? "Login" : "Sign Up"}
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}