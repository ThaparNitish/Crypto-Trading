import { useState, useEffect, useCallback } from "react";
import { getTopMovers } from "@/services/market.api";
import TopMovers from "@/components/Dashboard/TopMovers.jsx";

function Home() {
  const [topMovers, setTopMovers] = useState([]);
  const [loadingTopMovers, setLoadingTopMovers] = useState(true);
  const [topMoversError, setTopMoversError] = useState(null);

    const loadTopMovers = useCallback(async () => {
        setLoadingTopMovers(true);
        setTopMoversError("");

        try {
            const response = await getTopMovers();
            setTopMovers(response);
        } catch (error) {
            setTopMoversError(
                error.response?.data.message || error.message || "Something went wrong."
        );
        } finally {
            setLoadingTopMovers(false);
        }
        }, []);

    useEffect(() => {
        loadTopMovers();
    }, [loadTopMovers]);

  return (
    <div className="flex w-full flex-col gap-4 px-4 md:flex-row md:px-10">
        <div className="min-w-0 flex-1">
            {/* Main Chart: 60% */}
        </div>

        <div className="w-full md:w-80 md:shrink-0">
            <TopMovers topMovers={topMovers} loadingTopMovers={loadingTopMovers} topMoversError={topMoversError} loadTopMovers={loadTopMovers}/>
        </div>
    </div>
  );
}

export default Home;