import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Roleprop {
  roles: string|null;
}
export default function Navbar({ roles }: Roleprop) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    navigate("/auth");
  };

  return (
    <>
      <AppBar sx={{position:"fixed", backgroundColor:"black"}}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Real-Estate
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button color="inherit" onClick={() => navigate("/")}>
              Profile
            </Button>

            {roles === "ADMIN" && (
              <Button
                color="inherit"
                onClick={() => navigate("/admin/properties")}
              >
                Property Status
              </Button>
            )}

            {roles === "OWNER" && (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate("/owner-property")}
                >
                  My Property
                </Button>
              </>
            )}

            {roles === "BUYER" && (
              <>
                <Button color="inherit" onClick={() => navigate("/property")}>
                  Property
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate("/property/fav")}
                >
                  Favourite
                </Button>
              </>
            )}

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar />
    </>
  );
}
