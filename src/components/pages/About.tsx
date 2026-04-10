import logo from "../../assets/CocoaByCarleigh.svg";

export default function About() {
    return (
        <div className="page-wrapper">
            <div className="fade-up">
                <p className="section-subheading">My Story</p>
                <h1 className="section-heading">About Me</h1>
                <hr className="divider-choc" />
            </div>

           {/*two column layout*/}
            <div className="row g-5 align-items-center fade-up fade-up-delay-1">
                {/* Logo spot */}
                <div className="col-12 col-md-5">
                    <div style={{
                        borderRadius: "14px",
                        height: "380px",
                        overflow: "hidden",
                        boxShadow: "0 4px 20px rgba(59,35,24,0.08)",
                        background: "var(--cream-dark)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "2rem"
                    }}>
                        <img
                            src={logo}
                            alt="Cocoa by Carleigh logo"
                            style={{ width: "100%", maxWidth: "280px", height: "auto" }}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="col-12 col-md-7">
                    <h2 style={{ fontFamily: "Playfair Display, serif", color: "var(--choc-dark)", marginBottom: "1rem" }}>
                        Sustainable chocolate handmade in Halifax, Nova Scotia
                    </h2>
                    <p className="details-description">
                        For those who don't know me, I am from Cape Breton, but moved to Halifax as a teen.
                        I am a law student and a part-time research assistant. This is a creative project for me.
                    </p>
                    <p className="details-description">
                        I am so grateful to you all for allowing me to share it with you! I look forward to making these
                        fun and sweet creations for you each season.
                    </p>

                    <div className="mt-4 p-4" style={{
                        background: "var(--cream-dark)",
                        borderRadius: "10px",
                        borderLeft: "4px solid var(--choc-primary)"
                    }}>
                        <p style={{ color: "var(--choc-mid)", fontStyle: "italic", margin: 0, fontSize: "1.05rem" }}>
                            With love,

                            Carleigh
                        </p>
                    </div>
                </div>
            </div>

            {/* Brand values section */}
            <div className="row g-4 mt-5 fade-up fade-up-delay-2">
                {[
                    { icon: "bi-heart-fill", title: "Made with care", body: "Thought poured into every sweet" },
                    { icon: "bi-flower1", title: "Quality", body: "Crafted with sustainable ingredients" },
                    { icon: "bi-gift-fill", title: "Perfect for Gifting", body: "At least one person you know has a sweet tooth!" },
                ].map((card) => (
                    <div key={card.title} className="col-12 col-md-4">
                        <div className="choc-card h-100 p-4 text-center">
                            <i className={`bi ${card.icon} fs-2 mb-3 d-block`} style={{ color: "var(--choc-primary)" }}></i>
                            <h4 style={{ fontFamily: "Playfair Display, serif", color: "var(--choc-dark)" }}>{card.title}</h4>
                            <p style={{ color: "var(--text-mid)", fontSize: "0.95rem" }}>{card.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}