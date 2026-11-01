export function validateTopMoversResponse(response) {
    if (
        !response ||
        typeof response !== "object" ||
        response.success !== true ||
        !Array.isArray(response.data)
    ) {
        throw new Error("Invalid top movers response structure");
    }

    const validCoins = response.data.filter((coin) => {
        if (!coin || typeof coin !== "object") {
            return  false;
        }

        if (typeof coin.symbol !== "string" ||
            coin.symbol.trim() === "") {
                return false;
            }

        if (
            typeof coin.price !== "number" ||
            !Number.isFinite(coin.price) ||
            coin.price <= 0
            ) {
                return false;
            }

        if (
            typeof coin.priceChangePercent !== "number" ||
            !Number.isFinite(coin.priceChangePercent)
            ) {
                return false;
            }
        if (
            typeof coin.lowPrice !== "number" ||
            !Number.isFinite(coin.lowPrice) ||
            coin.lowPrice <= 0
        ) {
            return false;
        }

        if (
            typeof coin.highPrice !== "number" ||
            !Number.isFinite(coin.highPrice) ||
            coin.highPrice <= 0
        ) {
            return false;
        }

        if(coin.lowPrice > coin.highPrice){
            return false;
        }

        return true;
    });
    if (validCoins.length === 0) {
        throw new Error("No valid coin data available.");
    }

    return validCoins;
}