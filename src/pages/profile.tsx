import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
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

  const details = [
    { label: "User ID", value: user.id },
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phone },
    { label: "Role", value: user.role },
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2, mt: 4 }}>
      <Card sx={{ width: "100%", maxWidth: 460, borderRadius: 3, overflow: "hidden" }}>
        {/* Header */}
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            py: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            sx={{
              width: 88,
              height: 88,
              fontSize: 40,
              bgcolor: "white",
              color: "primary.main",
              fontWeight: 700,
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </Avatar>

          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {user.name}
          </Typography>

          <Chip
            label={user.role}
            size="small"
            sx={{ bgcolor: "white", color: "primary.main", fontWeight: 600 }}
          />
        </Box>
            
        <Stack divider={<Divider />} sx={{ px: 3, py: 1 }}>
          {details.map((item) => (
            <Box
              key={item.label}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                py: 1.5,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
              <Typography
                sx={{ fontWeight: 500, wordBreak: "break-all", textAlign: "right" }}
              >
                {item.value ?? "-"}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Card>
    </Box>
  );
}