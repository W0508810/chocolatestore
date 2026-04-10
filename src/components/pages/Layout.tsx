import { useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import {ShopProvider, useShop} from "./ShopContext.tsx";
import logo from "../../assets/CocoaByCarleigh.svg";

//separate component from Layout so it can call useShop()
function NavbarInner() {
    const { types, seasons, setFilter, clearFilter } = useShop();
    const navigate = useNavigate();

    //tracks which dropdown is currently open
    const [openMenu, setOpenMenu] = useState<"shop" | "about" | "connect" | null>(null);
    //reference attached to navbar for tracking clicks outside of it
    const navRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setOpenMenu(null);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);
    //clicking the same dropdown menu button twice closes it
    const toggle = (menu: "shop" | "about" | "connect") => {
        setOpenMenu((prev) => (prev === menu ? null : menu));
    };
    // called when user clicks type or season filter and navigates to it
    const handleFilterClick = (kind: "type" | "season", value: string) => {
        setFilter(kind, value);
        setOpenMenu(null);
        navigate("/");
    };
    //when user clicks "all products" clears active filter and returns to homepage
    const handleViewAll = () => {
        clearFilter();
        setOpenMenu(null);
        navigate("/");
    };

    return (
        <nav className="navbar-cocoa" ref={navRef}>
            <div className="container navbar-inner">
                {/* Brand */}
                <Link to="/" className="navbar-brand" onClick={clearFilter}>
                    <img src={logo} alt="Cocoa by Carleigh" style={{ height: "100px", width: "100px" }} />
                    Cocoa by Carleigh
                </Link>

                {/* Nav links */}
                <div className="nav-links">

                    {/* SHOP */}
                    <div className="nav-item-wrapper">
                        <button
                            className={`nav-btn ${openMenu === "shop" ? "active" : ""}`}
                            onClick={() => toggle("shop")}
                        >
                            Shop <i className={`bi bi-chevron-down nav-chevron ${openMenu === "shop" ? "rotated" : ""}`}></i>
                        </button>

                        {openMenu === "shop" && (
                            <div className="nav-dropdown shop-dropdown">
                                <div className="dropdown-col">
                                    <p className="dropdown-label">By Type</p>
                                    <button className="dropdown-item-btn" onClick={handleViewAll}>
                                        All Products
                                    </button>
                                    {types.map((type) => (
                                        <button
                                            key={type}
                                            className="dropdown-item-btn"
                                            onClick={() => handleFilterClick("type", type)}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                                <div className="dropdown-divider-v"></div>
                                <div className="dropdown-col">
                                    <p className="dropdown-label">By Season</p>
                                    {seasons.map((season) => (
                                        <button
                                            key={season}
                                            className="dropdown-item-btn"
                                            onClick={() => handleFilterClick("season", season)}
                                        >
                                            {season}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ABOUT */}
                    <div className="nav-item-wrapper">
                        <button
                            className={`nav-btn ${openMenu === "about" ? "active" : ""}`}
                            onClick={() => toggle("about")}
                        >
                            About <i className={`bi bi-chevron-down nav-chevron ${openMenu === "about" ? "rotated" : ""}`}></i>
                        </button>

                        {openMenu === "about" && (
                            <div className="nav-dropdown about-dropdown">
                                <p className="dropdown-label">My Story</p>
                                <Link
                                    to="/about"
                                    className="dropdown-item-btn d-block"
                                    onClick={() => setOpenMenu(null)}
                                >
                                    About Me
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* CONNECT */}
                    <div className="nav-item-wrapper">
                        <button
                            className={`nav-btn ${openMenu === "connect" ? "active" : ""}`}
                            onClick={() => toggle("connect")}
                        >
                            Connect <i className={`bi bi-chevron-down nav-chevron ${openMenu === "connect" ? "rotated" : ""}`}></i>
                        </button>

                        {openMenu === "connect" && (
                            <div className="nav-dropdown connect-dropdown">
                                <p className="dropdown-label">Socials</p>
                                <a
                                    href="https://www.instagram.com/cocoabycarleigh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="dropdown-item-btn d-flex align-items-center gap-2"
                                    onClick={() => setOpenMenu(null)}
                                >
                                    <i className="bi bi-instagram"></i> Instagram
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Cart */}
                    <Link to="/Checkout" className="cart-link" title="Bag">
                        <i className="bi bi-bag"></i>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default function Layout() {
    return (
        <ShopProvider>
            <div className="d-flex flex-column min-vh-100">
                <header>
                    <NavbarInner />
                </header>

                <main className="flex-grow-1">
                    <Outlet />
                </main>

                <footer className="footer-cocoa">
                    Cocoa by Carleigh &copy; 2026
                </footer>
            </div>
        </ShopProvider>
    );
}