import {  useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelectedProjectStore } from "../stores/useSelectedProjectStore";
import ItemEvents from "../components/ItemEvents";
import { useSelectedItemStore } from "../stores/useSelectedItemStore";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../stores/useAuthStore";

export default function ItemDetailsPage() {
  const { epc } = useParams();
  const setEpcString = useSelectedItemStore((state) => state.setEpcString);
  const projectId = useSelectedProjectStore((state) => state.projectId);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (epc) {
      setEpcString(epc);
    }
  }, [epc, setEpcString]);

  if (!projectId || !epc) {
    return <p className="p-4 text-sm text-text-50">Missing project or EPC.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <ItemEvents />
      </div>
    </div>
  );
}
