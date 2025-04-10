"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useAxiosAuth from "./lib/hooks/useAxiosAuth";
import { getSupabaseFrontendClient } from "./lib/supabase/client";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const supabase = getSupabaseFrontendClient();
  const axiosAuth = useAxiosAuth();
  const searchRef = useRef<HTMLInputElement>(null);

  const getProtectedData = async () => {
    try {
      const response = await axiosAuth.get("/protected");
      console.log("Protected data:", response.data);
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
  };

  const [movies, setMovies] = useState<any[]>([]);

  const fetchMovies = async () => {
    try {
      const response = await axiosAuth.get("/movies");
      console.log("Movies:", response.data);
      setMovies(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des films:", error);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("Session:", data);

      if (!data.session) {
        router.push("/login");
      } else {
        setUser(data.session.user);
        getProtectedData();
        fetchMovies();
      }
    };
    checkSession();
  }, []);

  const handleSearch = () => {
    const searchValue = searchRef.current?.value;
    console.log("Search value:", searchValue);
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchValue?.toLowerCase() || "")
    );
    if (filteredMovies) setMovies(filteredMovies);
    else if (searchValue?.length === 0) setMovies(movies);
    else setMovies([]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full overflow-y-auto">
      <h1 className="text-2xl font-bold">Movie Booker</h1>
      <p className="text-sm text-gray-500">
        Bienvenue sur movie booker, votre site de réservation de cinéma.
      </p>
      <div className="w-full h-1 bg-gray-200 my-4"></div>
      <div className="flex flex-col gap-2">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded-md border border-gray-300"
          onChange={handleSearch}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Films</h2>
        <div className="grid grid-cols-4 gap-4">
          {movies.length > 0 ? (
            <>
              {movies.map((movie) => (
                <div key={movie.id} className="w-40 h-60 bg-gray-200">
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt={movie.title}
                  />
                </div>
                // pagination
              ))}
              <div className="flex justify-between w-full gap-2">
                <button className="bg-blue-500 text-white p-2 rounded-md">
                  Précédent
                </button>
                <button className="bg-blue-500 text-white p-2 rounded-md">
                  Suivant
                </button>
              </div>
            </>
          ) : (
            <div>No films available</div>
          )}
        </div>
      </div>
    </div>
  );
}
