import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import NotFoundPage from "../pages/NotFoundPage";

export default function AdminLayout() {
  const { user } = useAuthContext();
  
  return user?.is_admin ? <Outlet /> : <NotFoundPage />
  
}
