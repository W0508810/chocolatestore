import { Link } from "react-router";
import type { Chocolate} from "../../types/Chocolate.tsx";
import {useShop} from "./ShopContext.tsx";

export default function Home() {
    //pull chocolate data and filter state from ShopContext
    const { chocolates, activeFilter, clearFilter } = useShop();

    //filter the list based on what's active
    //if no filter is set, then all items are displayed
    const filtered: Chocolate[] =
        activeFilter.kind === "type"
            ? chocolates.filter((c) => c.chocolateType === activeFilter.value)
            : activeFilter.kind === "season"
                ? chocolates.filter((c) => c.season === activeFilter.value)
                : chocolates;

    //changes the heading (larger text) based on what treat is being filtered
    const headingLabel =
        activeFilter.value
            ? activeFilter.kind === "type"
                ? activeFilter.value
                : `${activeFilter.value} Collection`
            : "Handcrafted Chocolates";

    //subheading changes depending on what they are looking at specifically
    const subLabel =
        activeFilter.value
            ? activeFilter.kind === "type"
                ? "Specific treat"
                : "Season"
            : "My Collection";

    return (
        <div className="page-wrapper">
            <div className="fade-up d-flex align-items-start justify-content-between flex-wrap gap-2">
                <div>
                    <p className="section-subheading">{subLabel}</p>
                    <h1 className="section-heading">{headingLabel}</h1>
                    <hr className="divider-choc" />
                </div>
                {activeFilter.value && (
                    <button className="btn-choc-outline mt-2" onClick={clearFilter}>
                        <i className="bi bi-x me-1"></i> Clear Filter
                    </button>
                )}
            </div>

            {chocolates.length === 0 ? (
                <div className="text-center py-5" style={{ color: "var(--choc-light)" }}>
                    <i className="bi bi-hourglass-split fs-2 mb-3 d-block"></i>
                    <p>Loading my collection...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-5" style={{ color: "var(--choc-light)" }}>
                    <i className="bi bi-search fs-2 mb-3 d-block"></i>
                    <p>No chocolates found for this filter.</p>
                    <button className="btn-choc mt-3" onClick={clearFilter}>View All</button>
                </div>
            ) : (
                <div className="row g-4">
                    {filtered.map((chocolate, i) => (
                        <div
                            key={chocolate.chocolateId}
                            className={`col-12 col-sm-6 col-lg-4 fade-up fade-up-delay-${Math.min(i + 1, 4)}`}
                        >
                            <Link to={`/details/${chocolate.chocolateId}`} className="choc-card-link">
                                <div className="choc-card h-100">
                                    <div className="choc-card-img">
                                        {chocolate.imgFileName ? (
                                            <img
                                                src={chocolate.imgFileName}
                                                alt={chocolate.chocolateName}
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                        ) : (
                                            <span>🍫</span>
                                        )}
                                    </div>
                                    <div className="choc-card-body">
                                        <p className="choc-card-meta">
                                            {chocolate.chocolateType} &bull; {chocolate.season}
                                        </p>
                                        <h2 className="choc-card-title">{chocolate.chocolateName}</h2>
                                        <p className="choc-card-price">
                                            ${chocolate.price?.toFixed(2)} CAD
                                        </p>
                                        <span className="btn-choc-outline mt-1">View Details</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}