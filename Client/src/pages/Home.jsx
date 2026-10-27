import { useState, useEffect } from "react";
import { getTopMovers } from "@/services/market.api";
import TopMovers from "@/components/Dashboard/TopMovers.jsx";

function Home() {
  const [topMovers, setTopMovers] = useState([]);
  const [loadingTopMovers, setLoadingTopMovers] = useState(true);
  const [topMoversError, setTopMoversError] = useState(null);

  useEffect(() => {
    async function loadTopMovers() {
      try {
        const response = await getTopMovers();
        setTopMovers(response.data);
      } catch (error) {
        console.error("Failed to load top movers:", error);
        setTopMoversError(
          error.response?.data.message || "Something went wrong."
        );
      } finally {
        setLoadingTopMovers(false);
      }
    }

    loadTopMovers();
  }),[];

  return (
    <div className="flex w-full flex-col gap-4 px-4 md:flex-row md:px-10">
        <div className="min-w-0 flex-1">
            {/* Main Chart: 60% */}
        </div>

        <div className="w-full md:w-80 md:shrink-0">
            <TopMovers topMovers={topMovers} loadingTopMovers={loadingTopMovers} topMoversError={topMoversError}/>
        </div>
    </div>
  );
}

export default Home;