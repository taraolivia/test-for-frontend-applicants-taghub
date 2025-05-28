import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import ProjectSelector from "../components/ProjectSelector";
import ItemsExplorerTable from "../components/ItemsExplorerTable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ItemsExplorer() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen p-8 w-full bg-gradient-to-br from-[#00091a] via-[#013c9b] to-[#c9a5f3] text-text-50">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4 text-accent-200">Items Explorer</h1>
      <ProjectSelector />
      <div className="mt-6">
        <ItemsExplorerTable />
      </div>
      <Footer />
    </div>
  );
}
