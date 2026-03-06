import { useState, useEffect, useRef } from "react";

const SCHEMES = [
  { name: "Qantas Frequent Flyer", logo: "✈️", points: 124850, value: "$2,497", trend: "+12%", color: "#E8002D", category: "airline" },
  { name: "Velocity Frequent Flyer", logo: "🟠", points: 43200, value: "$648", trend: "+5%", color: "#FF6900", category: "airline" },
  { name: "Flybuys", logo: "🛒", points: 8940, value: "$44", trend: "-2%", color: "#E31837", category: "retail" },
  { name: "Everyday Rewards", logo: "🟢", points: 15600, value: "$78", trend: "+18%", color: "#007A3D", category: "retail" },
  { name: "CommBank Awards", logo: "💳", points: 67300, value: "$336", trend: "+7%", color: "#FFCC00", category: "banking" },
];

const OPPORTUNITIES = [
  {
    type: "SWITCH",
    urgency: "HOT",
    title: "ANZ Rewards Black → Qantas",
    desc: "Earn 150,000 bonus Qantas Points on sign-up — worth $3,000 in flights. Your spending profile means you'd hit the $6k spend hurdle in 3 months.",
    value: "$3,000",
    expires: "14 days",
    match: 97,
    tag: "Card Switch",
  },
  {
    type: "EARN",
    urgency: "NEW",
    title: "Everyday Rewards Triple Points",
    desc: "Woolworths is running triple points on all purchases this weekend — based on your average weekly spend of $340, you'd net ~1,020 bonus points.",
    value: "$5.10",
    expires: "3 days",
    match: 91,
    tag: "Supermarket",
  },
  {
    type: "SWITCH",
    urgency: "EXPIRING",
    title: "Optus → Telstra (via Qantas)",
    desc: "Telstra is offering 100,000 Qantas Points for new mobile plan sign-ups (24-month). Your current Optus contract ends in 6 weeks — perfect timing.",
    value: "$2,000",
    expires: "28 days",
    match: 88,
    tag: "Telco Switch",
  },
  {
    type: "EARN",
    urgency: "NEW",
    title: "Velocity + Priceline Partner Boost",
    desc: "Velocity has launched a 5x earn rate at Priceline Pharmacy this month. You've shopped there 3x in the last 90 days — high probability of benefit.",
    value: "$31",
    expires: "18 days",
    match: 84,
    tag: "Pharmacy",
  },
];

const TIERS = [
  {
    name: "Reader",
    price: "Free",
    features: [
      "Track up to 3 schemes",
      "Weekly digest email",
      "Book chapter summaries",
      "Basic point calculator",
    ],
    cta: "Start Free",
    accent: "#8B9E77",
  },
  {
    name: "Optimiser",
    price: "$9.90/mo",
    features: [
      "Unlimited scheme tracking",
      "AI opportunity matching",
      "Personalised alerts",
      "Switching value calculator",
      "Priority email offers",
      "Partner discounts",
    ],
    cta: "Most Popular",
    accent: "#C9A84C",
    highlight: true,
  },
  {
    name: "Edge",
    price: "$24.90/mo",
    features: [
      "Everything in Optimiser",
      "1:1 strategy session/quarter",
      "Advance deal access (48hr)",
      "Churning calendar & tracker",
      "Tax & valuation guidance",
      "White-glove onboarding",
    ],
    cta: "Go Premium",
    accent: "#4A7FA5",
  },
];

const NAV_ITEMS = ["Dashboard", "Opportunities", "My Schemes", "Insights", "Community"];

function AnimatedCounter({ target, duration = 1500, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

function SchemeCard({ scheme, index }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hover ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 12,
        padding: "18px 20px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        cursor: "pointer",
        transition: "all 0.25s ease",
      }}
    >
      <div style={{ fontSize: 26, width: 36, textAlign: "center" }}>{scheme.logo}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 14, color: "#E8E4D9", fontWeight: 600 }}>
          {scheme.name}
        </div>
        <div style={{ fontSize: 11, color: "#8B8070", marginTop: 2, fontFamily: "monospace", letterSpacing: "0.03em" }}>
          {scheme.points.toLocaleString()} pts
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 17, color: "#C9A84C", fontWeight: 700 }}>
          {scheme.value}
        </div>
        <div style={{ fontSize: 10, color: scheme.trend.startsWith("+") ? "#8B9E77" : "#C07070", fontFamily: "monospace" }}>
          {scheme.trend} this month
        </div>
      </div>
    </div>
  );
}

function OpportunityCard({ opp }) {
  const [hover, setHover] = useState(false);
  const urgencyColors = { HOT: "#E85D3A", NEW: "#4A9E7F", EXPIRING: "#C9A84C" };
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "rgba(201,168,76,0.06)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hover ? "rgba(201,168,76,0.35)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 14,
        padding: "22px 24px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: urgencyColors[opp.urgency] || "#C9A84C", opacity: 0.7 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{
            fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em", fontWeight: 700,
            color: urgencyColors[opp.urgency], border: `1px solid ${urgencyColors[opp.urgency]}`,
            padding: "2px 7px", borderRadius: 4,
          }}>{opp.urgency}</span>
          <span style={{
            fontSize: 10, fontFamily: "monospace", letterSpacing: "0.08em",
            color: "#8B8070", border: "1px solid rgba(139,128,112,0.3)",
            padding: "2px 7px", borderRadius: 4,
          }}>{opp.tag}</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 20, color: "#C9A84C", fontWeight: 700 }}>{opp.value}</div>
          <div style={{ fontSize: 10, color: "#8B8070", fontFamily: "monospace" }}>est. value</div>
        </div>
      </div>
      <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 17, color: "#E8E4D9", fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>{opp.title}</div>
      <div style={{ fontSize: 13, color: "#9B9080", lineHeight: 1.6, marginBottom: 14 }}>{opp.desc}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 11, color: "#8B8070", fontFamily: "monospace" }}>⏱ Expires in {opp.expires}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ fontSize: 11, color: "#8B8070" }}>Match</div>
          <div style={{
            background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: 20, padding: "2px 10px",
            fontFamily: "monospace", fontSize: 12, color: "#C9A84C", fontWeight: 700,
          }}>{opp.match}%</div>
        </div>
      </div>
    </div>
  );
}

function TierCard({ tier }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: tier.highlight ? "rgba(201,168,76,0.08)" : hover ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${tier.highlight ? "rgba(201,168,76,0.4)" : hover ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 16,
        padding: "32px 28px",
        position: "relative",
        transform: tier.highlight ? "scale(1.03)" : "scale(1)",
        transition: "all 0.3s ease",
      }}
    >
      {tier.highlight && (
        <div style={{
          position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
          background: "#C9A84C", color: "#0D0B07", fontSize: 10, fontFamily: "monospace",
          letterSpacing: "0.12em", fontWeight: 800, padding: "4px 16px", borderRadius: 20,
          whiteSpace: "nowrap",
        }}>MOST POPULAR</div>
      )}
      <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 13, color: tier.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{tier.name}</div>
      <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 32, color: "#E8E4D9", fontWeight: 700, marginBottom: 4 }}>{tier.price}</div>
      <div style={{ width: 40, height: 1, background: tier.accent, opacity: 0.5, marginBottom: 24 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
        {tier.features.map((f, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ color: tier.accent, fontSize: 12, marginTop: 2, flexShrink: 0 }}>◆</span>
            <span style={{ fontSize: 13, color: "#A09080", lineHeight: 1.4 }}>{f}</span>
          </div>
        ))}
      </div>
      <button style={{
        width: "100%", padding: "13px 0",
        background: tier.highlight ? "#C9A84C" : "transparent",
        border: `1px solid ${tier.accent}`,
        borderRadius: 8, color: tier.highlight ? "#0D0B07" : tier.accent,
        fontFamily: "monospace", fontSize: 12, letterSpacing: "0.1em",
        fontWeight: 700, cursor: "pointer",
        transition: "all 0.2s ease",
        textTransform: "uppercase",
      }}>{tier.cta}</button>
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  const s = {
    root: {
      background: "#0D0B07",
      minHeight: "100vh",
      fontFamily: "'Crimson Pro', Georgia, serif",
      color: "#E8E4D9",
      overflowX: "hidden",
    },
    nav: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 48px",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      position: "sticky",
      top: 0,
      background: "rgba(13,11,7,0.96)",
      backdropFilter: "blur(12px)",
      zIndex: 100,
    },
    logo: {
      fontFamily: "'Crimson Pro', Georgia, serif",
      fontSize: 20,
      fontWeight: 800,
      letterSpacing: "-0.01em",
      color: "#E8E4D9",
      display: "flex",
      alignItems: "center",
      gap: 8,
    },
    section: { padding: "64px 48px", maxWidth: 1200, margin: "0 auto" },
    sectionLabel: {
      fontFamily: "monospace",
      fontSize: 10,
      letterSpacing: "0.18em",
      color: "#C9A84C",
      textTransform: "uppercase",
      marginBottom: 12,
    },
    sectionTitle: {
      fontFamily: "'Crimson Pro', Georgia, serif",
      fontSize: 36,
      fontWeight: 700,
      color: "#E8E4D9",
      marginBottom: 8,
      lineHeight: 1.15,
    },
    divider: {
      height: 1,
      background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
      margin: "0 48px",
    },
  };

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D0B07; }
        ::-webkit-scrollbar { width: 6px; background: #0D0B07; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 3px; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes agentPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(201,168,76,0); }
        }
        .fade-up { animation: fadeUp 0.65s ease both; }
        .agent-dot { animation: agentPulse 2.5s ease infinite; }
        .nav-item { transition: color 0.2s, border-color 0.2s; }
        .nav-item:hover { color: #C9A84C !important; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={s.nav}>
        <div style={s.logo}>
          {/* Agent dot */}
          <div className="agent-dot" style={{
            width: 10, height: 10, borderRadius: "50%",
            background: "#C9A84C", flexShrink: 0,
          }} />
          loyalty<span style={{ color: "#C9A84C" }}>agent</span><span style={{ color: "#6B6050", fontSize: 17, fontWeight: 400, letterSpacing: 0 }}>.ai</span>
        </div>

        <ul style={{ display: "flex", gap: 32, listStyle: "none" }}>
          {NAV_ITEMS.map(n => (
            <li
              key={n}
              className="nav-item"
              onClick={() => setActiveNav(n)}
              style={{
                fontSize: 12, fontFamily: "monospace", letterSpacing: "0.06em",
                cursor: "pointer",
                color: activeNav === n ? "#C9A84C" : "#8B8070",
                borderBottom: activeNav === n ? "1px solid #C9A84C" : "1px solid transparent",
                paddingBottom: 2,
              }}
            >{n}</li>
          ))}
        </ul>

        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ padding: "8px 18px", background: "transparent", border: "1px solid rgba(139,128,112,0.35)", borderRadius: 6, color: "#8B8070", fontFamily: "monospace", fontSize: 11, cursor: "pointer", letterSpacing: "0.08em" }}>
            LOG IN
          </button>
          <button style={{ padding: "8px 20px", background: "#C9A84C", border: "none", borderRadius: 6, color: "#0D0B07", fontFamily: "monospace", fontSize: 11, cursor: "pointer", fontWeight: 800, letterSpacing: "0.08em" }}>
            GET STARTED
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ padding: "80px 48px 60px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="fade-up" style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 28 }}>
          <div style={{ width: 32, height: 1, background: "#C9A84C" }} />
          <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.18em", color: "#C9A84C", textTransform: "uppercase" }}>
            Companion to Australia's Points Economy · AI-Powered
          </span>
        </div>

        <h1 className="fade-up" style={{ animationDelay: "0.1s", fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 64, fontWeight: 800, lineHeight: 1.04, color: "#E8E4D9", maxWidth: 660, marginBottom: 22 }}>
          Your points are worth more than you
          <span style={{ color: "#C9A84C", fontStyle: "italic" }}> think.</span>
        </h1>

        <p className="fade-up" style={{ animationDelay: "0.2s", fontSize: 18, color: "#9B9080", maxWidth: 520, lineHeight: 1.7, marginBottom: 36 }}>
          The intelligent platform for loyalty optimisation — powered by agents that research, match and alert you to opportunities while you sleep.
        </p>

        <div className="fade-up" style={{ animationDelay: "0.3s", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <button style={{ padding: "14px 32px", background: "#C9A84C", border: "none", borderRadius: 8, color: "#0D0B07", fontFamily: "monospace", fontSize: 12, cursor: "pointer", fontWeight: 800, letterSpacing: "0.1em" }}>
            CONNECT YOUR SCHEMES →
          </button>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6B6050", letterSpacing: "0.06em" }}>
            Free to start · No credit card required
          </span>
        </div>

        {/* Stats bar */}
        <div className="fade-up" style={{
          animationDelay: "0.5s",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          marginTop: 64, border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 14, overflow: "hidden", background: "rgba(255,255,255,0.02)",
        }}>
          {[
            { label: "Members", val: 47200, suffix: "+" },
            { label: "Points Tracked", val: 2400000000, suffix: "+" },
            { label: "Avg. Annual Saving", val: 890, prefix: "$" },
            { label: "Opportunities Matched", val: 180000, suffix: "+" },
          ].map((stat, i) => (
            <div key={i} style={{ padding: "24px 28px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 28, fontWeight: 700, color: "#C9A84C" }}>
                <AnimatedCounter target={stat.val} prefix={stat.prefix || ""} suffix={stat.suffix || ""} />
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#6B6050", letterSpacing: "0.1em", marginTop: 4, textTransform: "uppercase" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={s.divider} />

      {/* ── DASHBOARD PREVIEW ── */}
      <div style={s.section}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, alignItems: "start" }}>

          {/* Left — Scheme portfolio */}
          <div>
            <div style={s.sectionLabel}>Your Portfolio</div>
            <h2 style={{ ...s.sectionTitle, fontSize: 28 }}>All your schemes,<br />one command centre.</h2>
            <p style={{ fontSize: 15, color: "#7B7060", lineHeight: 1.65, marginBottom: 28 }}>
              Connect your loyalty accounts once. LoyaltyAgent tracks balances, expiry dates, and scheme health automatically — no manual updates.
            </p>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontFamily: "monospace", fontSize: 10, color: "#6B6050", letterSpacing: "0.1em" }}>TOTAL PORTFOLIO VALUE</span>
                <span style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 28, fontWeight: 700, color: "#C9A84C" }}>$3,603</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {SCHEMES.map((sc, i) => <SchemeCard key={i} scheme={sc} index={i} />)}
              </div>
              <button style={{ width: "100%", marginTop: 14, padding: "11px 0", background: "transparent", border: "1px dashed rgba(201,168,76,0.3)", borderRadius: 8, color: "#C9A84C", fontFamily: "monospace", fontSize: 11, cursor: "pointer", letterSpacing: "0.1em" }}>
                + ADD SCHEME
              </button>
            </div>
          </div>

          {/* Right — AI opportunities */}
          <div>
            <div style={s.sectionLabel}>Agent Matches — Today</div>
            <h2 style={{ ...s.sectionTitle, fontSize: 28 }}>Personalised opportunities,<br />researched overnight.</h2>
            <p style={{ fontSize: 15, color: "#7B7060", lineHeight: 1.65, marginBottom: 28 }}>
              Background agents scan for new offers, switch bonuses, and earn accelerators — then score them against your profile before you wake up.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {OPPORTUNITIES.map((o, i) => <OpportunityCard key={i} opp={o} />)}
            </div>
          </div>
        </div>
      </div>

      <div style={s.divider} />

      {/* ── HOW IT WORKS ── */}
      <div style={s.section}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={s.sectionLabel}>How the Agent Works</div>
          <h2 style={{ ...s.sectionTitle, textAlign: "center" }}>Researching while you sleep.</h2>
          <p style={{ fontSize: 16, color: "#7B7060", maxWidth: 500, margin: "12px auto 0", lineHeight: 1.65 }}>
            As interchange legislation tightens, the richest points are shifting from everyday spend to switching events. LoyaltyAgent is built for exactly this world.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { step: "01", icon: "🔗", title: "Connect", desc: "Link your existing schemes securely. We ingest balances, earn rates, expiry dates and tier status." },
            { step: "02", icon: "🧬", title: "Profile", desc: "Your spending patterns, scheme mix, and switching appetite shape a personal opportunity score." },
            { step: "03", icon: "🔍", title: "Discover", desc: "Agents scan banks, telcos, retailers and airlines daily for new bonuses, switch deals, and earn boosts." },
            { step: "04", icon: "⚡", title: "Act", desc: "Matched offers arrive with a clear value case — click, compare, and capture while the window is open." },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "28px 22px" }}>
              <div style={{ fontSize: 28, marginBottom: 16 }}>{item.icon}</div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#C9A84C", letterSpacing: "0.15em", marginBottom: 8 }}>STEP {item.step}</div>
              <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 20, fontWeight: 700, color: "#E8E4D9", marginBottom: 10 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: "#7B7060", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={s.divider} />

      {/* ── THE BOOK ── */}
      <div style={{ ...s.section, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <div style={s.sectionLabel}>The Book</div>
          <h2 style={{ ...s.sectionTitle, fontSize: 40 }}>From wooden tokens<br />to AI-driven rewards.</h2>
          <p style={{ fontSize: 16, color: "#7B7060", lineHeight: 1.7, marginBottom: 18 }}>
            From Ancient Egypt's beer-and-bread tokens to AAdvantage's 115 million members — this is the definitive guide to how loyalty programs work, who wins, and how you can too.
          </p>
          <p style={{ fontSize: 16, color: "#7B7060", lineHeight: 1.7, marginBottom: 32 }}>
            LoyaltyAgent readers get exclusive chapter summaries, accompanying data tools, and early access to opportunities surfaced in the book's research.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button style={{ padding: "13px 28px", background: "#C9A84C", border: "none", borderRadius: 8, color: "#0D0B07", fontFamily: "monospace", fontSize: 12, cursor: "pointer", fontWeight: 800, letterSpacing: "0.1em" }}>
              BUY THE BOOK
            </button>
            <button style={{ padding: "13px 28px", background: "transparent", border: "1px solid rgba(201,168,76,0.35)", borderRadius: 8, color: "#C9A84C", fontFamily: "monospace", fontSize: 12, cursor: "pointer", letterSpacing: "0.08em" }}>
              READ CHAPTER 1 FREE
            </button>
          </div>
        </div>

        <div style={{
          background: "linear-gradient(135deg, #1A1610 0%, #0D0B07 100%)",
          border: "1px solid rgba(201,168,76,0.22)",
          borderRadius: 16, padding: "40px 36px",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,168,76,0.12)",
        }}>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: "#C9A84C", letterSpacing: "0.2em", marginBottom: 36, textTransform: "uppercase" }}>
            Available now · Major Street Publishing
          </div>
          <div style={{ borderLeft: "3px solid #C9A84C", paddingLeft: 20, marginBottom: 32 }}>
            <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 14, color: "#8B8070", fontStyle: "italic", lineHeight: 1.65 }}>
              "From wooden tokens to AI-driven, randomised experiential systems, loyalty programs are evolving fast — and the rules keep changing."
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {["Loyal from the Start", "The Points Economy", "Master the Switch", "The AI Era"].map((ch, i) => (
              <div key={i} style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: "#C9A84C", letterSpacing: "0.1em", marginBottom: 4 }}>
                  CH.{String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontSize: 12, color: "#9B9080", lineHeight: 1.4 }}>{ch}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, color: "#C9A84C" }}>⭐⭐⭐⭐⭐</span>
            <span style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 13, color: "#6B6050" }}>David Moloney</span>
          </div>
        </div>
      </div>

      <div style={s.divider} />

      {/* ── REGULATORY CALLOUT ── */}
      <div style={{ ...s.section, display: "flex", justifyContent: "center" }}>
        <div style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.18)", borderRadius: 20, padding: "48px 52px", maxWidth: 780, width: "100%", textAlign: "center" }}>
          <div style={s.sectionLabel}>The Regulatory Shift · 2025–2027</div>
          <h2 style={{ ...s.sectionTitle, textAlign: "center", fontSize: 30, marginBottom: 16 }}>
            As interchange fees fall,<br />switching bonuses become the new frontier.
          </h2>
          <p style={{ fontSize: 15, color: "#7B7060", lineHeight: 1.72, maxWidth: 580, margin: "0 auto 32px" }}>
            New RBA legislation caps what banks can charge retailers per transaction. The era of generous everyday earn rates is fading. In its place: massive bonuses for switching credit cards, telcos, and energy providers. LoyaltyAgent tracks this world continuously.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {[
              { label: "Credit Card Switches", desc: "50,000–200,000 pts for new card sign-ups" },
              { label: "Telco Switches", desc: "Up to 100,000 pts for new mobile or NBN plans" },
              { label: "Insurance & Energy", desc: "Emerging category — agents watch daily" },
            ].map((c, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.025)", borderRadius: 10, padding: "20px 16px" }}>
                <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 14, fontWeight: 700, color: "#C9A84C", marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontSize: 12, color: "#6B6050", lineHeight: 1.5 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={s.divider} />

      {/* ── PRICING ── */}
      <div style={s.section}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={s.sectionLabel}>Membership</div>
          <h2 style={{ ...s.sectionTitle, textAlign: "center" }}>Choose your edge.</h2>
          <p style={{ fontSize: 16, color: "#7B7060", maxWidth: 420, margin: "12px auto 0", lineHeight: 1.65 }}>
            Start free, upgrade when the opportunities speak for themselves. Most Optimiser members find the tier pays for itself within the first matched deal.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 900, margin: "0 auto" }}>
          {TIERS.map((t, i) => <TierCard key={i} tier={t} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <p style={{ fontFamily: "monospace", fontSize: 11, color: "#4B4030", letterSpacing: "0.06em" }}>
            All plans include a 14-day free trial · Cancel anytime · Australian Privacy Act compliant
          </p>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "36px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ ...s.logo, fontSize: 17, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C9A84C" }} />
            loyalty<span style={{ color: "#C9A84C" }}>agent</span><span style={{ color: "#4B4030", fontSize: 15, fontWeight: 400 }}>.ai</span>
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4B4030", letterSpacing: "0.08em" }}>
            The companion to Australia's Points Economy · © 2026
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          {["Privacy Policy", "Terms of Use", "Financial Services Guide", "Contact"].map(l => (
            <span key={l} style={{ fontFamily: "monospace", fontSize: 10, color: "#4B4030", cursor: "pointer", letterSpacing: "0.06em" }}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
