import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Authform from "./components/authForm";
import Profile from "./pages/profile";
import Navbar from "./components/navbar";
import PropertyForm from "./components/propertyForm";
import PropertyPage from "./pages/propertiespage";
import ApprovedProperty from "./pages/approvedProperty";
import FavProperty from "./pages/favproperty";
import AdminPropertyStatus from "./pages/adminPropertyStatus";

function App() {
  const{pathname} = useLocation()
  const roles = localStorage.getItem("role");
  const show = pathname ==='/auth';
  return (
    <>
    {!show && <Navbar roles={roles}/>}
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/auth" element={<Authform />} />
        <Route path="/admin/properties" element={roles === 'ADMIN'?<AdminPropertyStatus />:<Navigate to='/' replace/>} />
        <Route path="/owner-property" element={roles === 'OWNER'?<PropertyPage />: <Navigate to="/" replace/>} />
        <Route path="/owner-property/add" element={roles === 'OWNER'?<PropertyForm />: <Navigate to="/" replace/>} />
        <Route path="/property" element={roles === 'BUYER'?<ApprovedProperty />: <Navigate to="/" replace/>} />
        <Route path="/property/fav" element={roles === 'BUYER'?<FavProperty />: <Navigate to="/" replace/>} />
      </Routes>
    </>
  );
}

export default App;
