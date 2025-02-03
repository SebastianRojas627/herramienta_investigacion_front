import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react"

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <Menu
        onClick={toggleSidebar}
        className="sm:hidden transform scale-150 fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-md"
      >
        {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </Menu>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main
        className={`transition-all duration-300 p-4 flex-1 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`} // Adjust margin-left based on the sidebar's width
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
