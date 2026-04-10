import {createContext, useState, useEffect, type ReactNode, useContext} from "react";
import type { Chocolate } from "../../types/Chocolate.tsx";
interface ShopContextType {
    chocolates: Chocolate[];
    activeFilter: { kind: "type" | "season" | null; value: string | null };
    setFilter: (kind: "type" | "season" | null, value: string | null) => void;
    clearFilter: () => void;
    types: string[];
    seasons: string[];
}

export const ShopContext = createContext<ShopContextType | null>(null);

//Wraps the app and makes chocolate data and filter state available globally
//This is done to prevent duplicate API calls
export function ShopProvider({ children }: { children: ReactNode }) {
    //full list of chocolates fetched from API
    const [chocolates, setChocolates] = useState<Chocolate[]>([]);
    //tracks currently active filter
    const [activeFilter, setActiveFilter] = useState<{ kind: "type" | "season" | null; value: string | null }>({
        kind: null,
        value: null,
    });

    //fetch all chocolates from API when the app first loads
    useEffect(() => {
        fetch("http://localhost:8080/chocolates/")
            .then((res) => res.json())
            .then(setChocolates)
            .catch(console.error);
    }, []);

    //Derives sorted lists of chocolate type and season
    const types = [...new Set(chocolates.map((c) => c.chocolateType).filter(Boolean))].sort();
    const seasons = [...new Set(chocolates.map((c) => c.season).filter(Boolean))].sort();

    //sets the active filter on user click
    const setFilter = (kind: "type" | "season" | null, value: string | null) => {
        setActiveFilter({ kind, value });
    };

    //reset to show all data
    const clearFilter = () => setActiveFilter({ kind: null, value: null });

    return (
        <ShopContext.Provider value={{ chocolates, activeFilter, setFilter, clearFilter, types, seasons }}>
            {children}
        </ShopContext.Provider>
    );
}
//hook for giving components easy access to ShopContext
export function useShop() {
    const ctx = useContext(ShopContext);
    if (!ctx) throw new Error("useShop must be used within ShopProvider");
    return ctx;
}
