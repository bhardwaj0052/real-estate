import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface AuthProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: AuthProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChecking(true);
    const token = localStorage.getItem("access_token");
    const isLogin = pathname === "/auth" ;

    if (!token && !isLogin) {
      navigate("/auth", { replace: true });
    } else if (token && isLogin) {
      navigate("/", { replace: true });
    } else {
      setChecking(false);
    }
  }, [pathname, navigate]);

  if (checking) return <Link to="/auth" replace />;

  return <>{children}</>;
}
