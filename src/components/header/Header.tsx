"use client";

import { getSupabaseFrontendClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const supabase = getSupabaseFrontendClient();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Movie Booker</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
