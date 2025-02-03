import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserAdmin from "./components/UserAdmin";
import UserUpdate from "./components/UserUpdate";
import Search from "./components/Search";
import Logs from "./components/Logs";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Searcho from "./components/Searcho";
import EntityExplorer from "./components/EntityExplorer";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* General user routes */}
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/searcho"
          element={
            <ProtectedRoute>
              <Searcho />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserUpdate />
            </ProtectedRoute>
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserAdmin />
            </ProtectedRoute>
          }
        />

        {/* Investigators and Admins can access logs */}
        <Route
          path="/logs"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Logs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/explore/:id"
          element={
            <ProtectedRoute>
              <EntityExplorer />
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
