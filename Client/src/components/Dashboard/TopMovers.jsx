import { useNavigate } from "react-router-dom";

function TopMovers({topMovers, topMoversError, loadingTopMovers, loadTopMovers}){
    const navigate = useNavigate();

    return (
        <div className="rounded-lg border border-neutral-700 p-3">
            <div className="flex justify-between item-center">
                <h2 className="mb-2 text-xl font-semibold text-gray-100">
                    Top Movers
                </h2>
                <p className="text-sm text-gray-400 pr-2">Last 24 hrs</p>
            </div>

            {loadingTopMovers ? (
                <div className="min-h-40 flex justify-center items-center">
                    <p>Loading top movers...</p>
                </div>
            ) : topMoversError ? (
                <div className="min-h-40 flex flex-col gap-2 justify-center items-center">
                    <p className="text-red-400">{topMoversError}</p>
                     <button
                        onClick={loadTopMovers}
                        disabled={loadingTopMovers}
                        className="rounded-md bg-neutral-800 px-4 py-2 text-sm text-gray-200 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                        Retry
                    </button>
                </div>
            ) :
                <div>
                    {topMovers.map((coin) => (
                    <div
                        key={coin.symbol}
                        className="cursor-pointer border-b border-neutral-700 hover:bg-neutral-700 rounded-lg hover:px-1 px-2 py-2 text-lg last:border-b-0"
                        onClick={() => navigate(`/coins/${encodeURIComponent(coin.symbol)}`)}
                    >
                        {/* Symbol, Change, Current Price */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex min-w-0 items-center gap-2">
                                <span className="font-medium text-gray-200">
                                {coin.symbol}
                                </span>

                                <span
                                className={`text-xs ${
                                    coin.priceChangePercent >= 0
                                    ? "text-[#8DDDC2]"
                                    : "text-red-400"
                                }`}
                                >
                                {coin.priceChangePercent > 0 ? "+" : ""}
                                {coin.priceChangePercent}%
                                </span>
                            </div>

                            <span className="shrink-0 text-base font-medium">
                                ${coin.price}
                            </span>
                        </div>

                        {/* Low and High */}
                        <div className="mt-1 flex justify-between text-sm text-gray-400">
                            <span>Low: ${coin.lowPrice}</span>
                            <span>High: ${coin.highPrice}</span>
                        </div>
                    </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default TopMovers;