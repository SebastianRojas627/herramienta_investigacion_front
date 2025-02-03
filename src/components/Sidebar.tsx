import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, Users, LogOut, Search, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-blue-600 text-white transition-all duration-300 ease-in-out shadow-lg",
        isOpen ? "w-64" : "w-16"
      )}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="hidden p-4 sm:block sm:pt-4 text-xl font-bold">
        <Link to="/searcho" className="text-white block">
          {isOpen ? "Sistema Policial" : "SP"}
        </Link>
      </div>
      <div className="space-y-2 pt-14 sm:pt-4">
        <Link
          to="/user"
          className="flex items-center gap-2 px-4 py-2 hover:bg-blue-500 transition-colors rounded-md"
        >
          <Home className="w-6 h-6" />
          {isOpen && <span>Información Usuario</span>}
        </Link>

        {user?.role === "admin" && (
          <Link
            to="/users"
            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-500 transition-colors rounded-md"
          >
            <Users className="w-6 h-6" />
            {isOpen && <span>Usuarios</span>}
          </Link>
        )}

        {user?.role !== "user" && (
          <Link
            to="/logs"
            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-500 transition-colors rounded-md"
          >
            <ClipboardList className="w-6 h-6" />
            {isOpen && <span>Logs</span>}
          </Link>
        )}

        <Link
          to="/search"
          className="flex items-center gap-2 px-4 py-2 hover:bg-blue-500 transition-colors rounded-md"
        >
          <Search className="w-6 h-6" />
          {isOpen && <span>Búsqueda</span>}
        </Link>

        <Link
          to="/searcho"
          className="flex items-center gap-2 px-4 py-2 hover:bg-blue-500 transition-colors rounded-md"
        >
          <Search className="w-6 h-6" />
          {isOpen && <span>Otra Búsqueda</span>}
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-red-500 transition-colors rounded-md"
        >
          <LogOut className="w-6 h-6" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
