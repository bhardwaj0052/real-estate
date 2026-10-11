import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import type { User } from "../types/user";
import { getProfile } from "../service/userServices";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch {
        setError("Unable to load profile");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Typography color="error" align="center" sx={{ mt: 10 }}>
        {error || "User not found"}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10, p: 2 }}>
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent>
          <Stack sx={{spacing:2, alignItems:"center"}}>
            <Avatar sx={{ width: 72, height: 72, fontSize: 32 }}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>

            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {user.name}
            </Typography>

            <Chip label={user.role} color="primary" size="small" />
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Stack spacing={2}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Email
              </Typography>
              <Typography>{user.email}</Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Phone
              </Typography>
              <Typography>{user.phone}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}