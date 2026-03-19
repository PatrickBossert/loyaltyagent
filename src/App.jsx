import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const navy  = "#1A3A5F";
const black = "#111111";
const cream = "#F2EDE3";
const red   = "#E62912";
const amber = red; // alias — all amber references now use brand red

// ── TAIL FIN MOTIF ────────────────────────────────────────────────────────────
// The red diagonal on the book cover is an aircraft tail fin — the brand's
// core visual. Used full-bleed on the author hero, ghosted on Done screen,
// and as a mini accent mark beside the wordmark.

function TailFin({ width = 120, opacity = 1, color = red, style = {} }) {
  // Matches tail_motif.png exactly:
  // - Near-vertical left edge from bottom-left rising up
  // - Wide gentle convex arc across the top (peak at ~25% from left)
  // - Straight diagonal trailing edge from top-right down to bottom-right
  return (
    <svg width={width} height={width * 0.85} viewBox="0 0 120 100" fill="none"
      xmlns="http://www.w3.org/2000/svg" style={{ display: "block", ...style }}>
      <path
        d="M 8 100 C 6 78, 5 52, 8 28 C 10 12, 14 2, 24 2 C 44 2, 68 14, 88 38 C 98 52, 106 68, 112 85 L 112 100 Z"
        fill={color} opacity={opacity}
      />
    </svg>
  );
}

// ── WORDMARK ───────────────────────────────────────────────────────────────────
function Wordmark({ size = 23, dark = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, lineHeight: 1 }}>
      <TailFin width={size * 0.65} style={{ marginTop: -1 }} />
      <span style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 900, fontSize: size, letterSpacing: "0.01em",
      }}>
        <span style={{ color: dark ? cream : black }}>POINTS</span><span style={{ color: red }}>Master</span>
      </span>
    </div>
  );
}


const CATS = [
  {
    id: "airline", label: "Airlines & Flying", emoji: "✈️",
    q: "How many bonus frequent flyer points would convince you to switch your main airline loyalty program?",
    range: [0, 350000], step: 5000,
    schemes: [
      { id: "qff",      name: "Qantas Frequent Flyer",    abbr: "QFF",   bg: "#E31837", icon: "✈" },
      { id: "vff",      name: "Velocity Frequent Flyer",  abbr: "VFF",   bg: "#E55A00", icon: "✈" },
      { id: "kf",       name: "Singapore KrisFlyer",      abbr: "KF",    bg: "#003087", icon: "✈" },
      { id: "cathay",   name: "Cathay (Asia Miles)",      abbr: "CX",    bg: "#006564", icon: "✈" },
      { id: "skywards", name: "Emirates Skywards",        abbr: "EK",    bg: "#B71C1C", icon: "✈" },
      { id: "airpoints",name: "Air NZ Airpoints",         abbr: "NZ",    bg: "#24185E", icon: "✈" },
      { id: "enrich",   name: "Malaysia Enrich",          abbr: "MH",    bg: "#CC0000", icon: "✈" },
      { id: "rop",      name: "Thai Royal Orchid Plus",   abbr: "TG",    bg: "#522D80", icon: "✈" },
      { id: "ana",      name: "ANA Mileage Club",         abbr: "ANA",   bg: "#0F4BA0", icon: "✈" },
      { id: "jal",      name: "JAL Mileage Bank",         abbr: "JAL",   bg: "#C8002A", icon: "✈" },
      { id: "qatar",    name: "Qatar Privilege Club",     abbr: "QR",    bg: "#5C0632", icon: "✈" },
      { id: "etihad",   name: "Etihad Guest",             abbr: "EY",    bg: "#8B6914", icon: "✈" },
    ],
  },
  {
    id: "super", label: "Supermarkets & Food", emoji: "🛒",
    q: "How many bonus points would convince you to switch your main supermarket or food rewards program?",
    range: [0, 50000], step: 500,
    schemes: [
      { id: "flybuys",   name: "Flybuys (Coles)",          abbr: "FB",   bg: "#003087", icon: "🛒" },
      { id: "edr",       name: "Everyday Rewards",         abbr: "EDR",  bg: "#E55A00", icon: "🛒" },
      { id: "mydans",    name: "My Dan's",                 abbr: "DM",   bg: "#C8900A", icon: "🍾" },
      { id: "mymaccas",  name: "MyMacca's Rewards",        abbr: "MCD",  bg: "#DA291C", icon: "🍟" },
      { id: "subway",    name: "Subway MyWay",             abbr: "SUB",  bg: "#007337", icon: "🥖" },
      { id: "coffeeclub",name: "The Coffee Club VIP",      abbr: "TCC",  bg: "#5C3317", icon: "☕" },
      { id: "boost",     name: "Boost Juice Vibe Club",    abbr: "BST",  bg: "#E03A3C", icon: "🥤" },
      { id: "grilld",    name: "Grill'd Relish",           abbr: "GRD",  bg: "#3D6B47", icon: "🍔" },
      { id: "deliveroo", name: "Deliveroo Plus",           abbr: "DEL",  bg: "#00CCBC", fgDark: true, icon: "🛵" },
      { id: "menulog",   name: "Menulog Rewards",          abbr: "ML",   bg: "#EF6B25", icon: "🛵" },
      { id: "dominos",   name: "Domino's",                 abbr: "DOM",  bg: "#006491", icon: "🍕" },
      { id: "nandos",    name: "Nando's Rewards",          abbr: "NAN",  bg: "#CC2021", icon: "🍗" },
    ],
  },
  {
    id: "banking", label: "Credit Cards & Banking", emoji: "💳",
    q: "How many bonus points would convince you to switch your main credit card rewards program?",
    range: [0, 200000], step: 5000,
    schemes: [
      { id: "amexmr",   name: "Amex Membership Rewards",  abbr: "AMEX", bg: "#2E77BC", icon: "💳" },
      { id: "cba",      name: "CommBank Awards",          abbr: "CBA",  bg: "#F4A11D", fgDark: true, icon: "💳" },
      { id: "anz",      name: "ANZ Rewards",              abbr: "ANZ",  bg: "#007CC3", icon: "💳" },
      { id: "nab",      name: "NAB Rewards",              abbr: "NAB",  bg: "#CC0000", icon: "💳" },
      { id: "westpac",  name: "Westpac Altitude",         abbr: "WBC",  bg: "#D5002B", icon: "💳" },
      { id: "stgeorge", name: "St.George Amplify",        abbr: "STG",  bg: "#009B77", icon: "💳" },
      { id: "citi",     name: "Citi Rewards",             abbr: "CITI", bg: "#056DAE", icon: "💳" },
      { id: "latitude", name: "Latitude Rewards",         abbr: "LAT",  bg: "#00A8A8", icon: "💳" },
      { id: "hsbc",     name: "HSBC Rewards Plus",        abbr: "HSBC", bg: "#DB0011", icon: "💳" },
      { id: "macquarie",name: "Macquarie Rewards",        abbr: "MQG",  bg: "#1B3A6B", icon: "💳" },
      { id: "bom",      name: "Bank of Melbourne",        abbr: "BOM",  bg: "#5B2A86", icon: "💳" },
      { id: "virgin",   name: "Virgin Money Rewards",     abbr: "VM",   bg: "#CC1133", icon: "💳" },
    ],
  },
  {
    id: "hotel", label: "Hotels & Accommodation", emoji: "🏨",
    q: "How many bonus hotel points would convince you to switch your main hotel loyalty program?",
    range: [0, 150000], step: 5000,
    schemes: [
      { id: "bonvoy",   name: "Marriott Bonvoy",           abbr: "MBV", bg: "#800020", icon: "🏨" },
      { id: "hilton",   name: "Hilton Honors",             abbr: "HH",  bg: "#003082", icon: "🏨" },
      { id: "ihg",      name: "IHG One Rewards",           abbr: "IHG", bg: "#004B8D", icon: "🏨" },
      { id: "accor",    name: "Accor Live Limitless",      abbr: "ALL", bg: "#8B0046", icon: "🏨" },
      { id: "hyatt",    name: "World of Hyatt",            abbr: "WOH", bg: "#2D2D2D", icon: "🏨" },
      { id: "radisson", name: "Radisson Rewards",          abbr: "RAD", bg: "#9B1B30", icon: "🏨" },
      { id: "gha",      name: "GHA Discovery",             abbr: "GHA", bg: "#1B4D3E", icon: "🏨" },
      { id: "pge",      name: "Priority Guest (QT/Rydges)",abbr: "PGR", bg: "#2D2D2D", icon: "🏨" },
      { id: "wyndham",  name: "Wyndham Rewards",           abbr: "WYN", bg: "#003F87", icon: "🏨" },
      { id: "bestwest", name: "Best Western Rewards",      abbr: "BWR", bg: "#003E8A", icon: "🏨" },
      { id: "shangri",  name: "Shangri-La Circle",         abbr: "SLC", bg: "#7B5E22", icon: "🏨" },
      { id: "luxesc",   name: "Luxury Escapes",            abbr: "LXE", bg: "#1A3A5F", icon: "🏖" },
    ],
  },
  {
    id: "fuel", label: "Fuel, Transport & Telco", emoji: "⛽",
    q: "How many bonus points would convince you to switch your fuel or telco rewards program?",
    range: [0, 20000], step: 250,
    schemes: [
      { id: "bp",      name: "BP Rewards",              abbr: "BP",   bg: "#007A33", icon: "⛽" },
      { id: "ampol",   name: "Ampol Everyday",          abbr: "AMP",  bg: "#CC0000", icon: "⛽" },
      { id: "shell",   name: "Shell Coles Express",     abbr: "SHL",  bg: "#DD1D21", icon: "⛽" },
      { id: "sev",     name: "7-Eleven Velocity",       abbr: "7EL",  bg: "#F07800", icon: "⛽" },
      { id: "caltex",  name: "Caltex Rewards",          abbr: "CTX",  bg: "#8B1A1A", icon: "⛽" },
      { id: "nrma",    name: "NRMA Member Benefits",    abbr: "NRMA", bg: "#002D62", icon: "🚗" },
      { id: "racv",    name: "RACV Member Benefits",    abbr: "RACV", bg: "#003DA5", icon: "🚗" },
      { id: "telstra", name: "Telstra Plus",            abbr: "TEL",  bg: "#5C068C", icon: "📱" },
      { id: "optus",   name: "Optus Perks",             abbr: "OPT",  bg: "#E60078", icon: "📱" },
      { id: "racq",    name: "RACQ Member Benefits",    abbr: "RACQ", bg: "#C8102E", icon: "🚗" },
    ],
  },
  {
    id: "retail", label: "Retail, Beauty & Lifestyle", emoji: "🏪",
    q: "How many bonus points would convince you to switch your main retail loyalty program?",
    range: [0, 50000], step: 500,
    schemes: [
      { id: "myer",     name: "Myer One",                abbr: "M1",   bg: "#9F1239", icon: "🛍" },
      { id: "dj",       name: "David Jones",             abbr: "DJ",   bg: "#111827", icon: "🛍" },
      { id: "priceline",name: "Priceline Sister Club",   abbr: "PSC",  bg: "#BE185D", icon: "💊" },
      { id: "mecca",    name: "MECCA Beauty Loop",       abbr: "MCA",  bg: "#1B4D3E", icon: "💄" },
      { id: "jbhifi",   name: "JB Hi-Fi Perks",          abbr: "JBH",  bg: "#FFCC00", fgDark: true, icon: "🎵" },
      { id: "amazon",   name: "Amazon Prime",            abbr: "AMZN", bg: "#FF9900", fgDark: true, icon: "📦" },
      { id: "ebay",     name: "eBay Plus",               abbr: "EBAY", bg: "#003087", icon: "🛍" },
      { id: "bunnings", name: "Bunnings PowerPass",      abbr: "BUN",  bg: "#00612C", icon: "🔧" },
      { id: "chemist",  name: "Chemist Warehouse",       abbr: "CWH",  bg: "#CC1F1F", icon: "💊" },
      { id: "adore",    name: "Adore Beauty",            abbr: "ADR",  bg: "#C71585", icon: "💄" },
      { id: "iconic",   name: "THE ICONIC",              abbr: "TIC",  bg: "#1A1A1A", icon: "👗" },
      { id: "cotton",   name: "Cotton On",               abbr: "COT",  bg: "#8B1A1A", icon: "👕" },
      { id: "lornajane",name: "Lorna Jane Active Living",abbr: "LJA",  bg: "#6D2C91", icon: "🏃" },
      { id: "rebel",    name: "Rebel Sport",             abbr: "RBL",  bg: "#CC1133", icon: "⚽" },
      { id: "onepass",  name: "OnePass (Wesfarmers)",    abbr: "1PS",  bg: "#003A5C", icon: "🔑" },
      { id: "medibank", name: "Medibank Live Better",    abbr: "MBK",  bg: "#00527F", icon: "❤️" },
      { id: "nib",      name: "nib Rewards",             abbr: "NIB",  bg: "#E31837", icon: "❤️" },
      { id: "shopback", name: "ShopBack",                abbr: "SHB",  bg: "#EE4D2D", icon: "💰" },
    ],
  },
];

const ALL_SCHEMES = CATS.flatMap(c => c.schemes.map(s => ({ ...s, catId: c.id })));
const fmtPts = v => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : `${v}`;

// ── GLOBAL CSS ────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Outfit', sans-serif; }
  body { background: #F8F7F4; }
  .ps-in { animation: psIn 0.28s cubic-bezier(0.22,1,0.36,1) both; }
  @keyframes psIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  .ps-input {
    width: 100%; padding: 13px 15px;
    border: 1.5px solid #E5E7EB; border-radius: 10px;
    font-size: 16px; color: #111827; background: white; outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    font-family: 'Outfit', sans-serif;
  }
  .ps-input:focus { border-color: ${navy}; box-shadow: 0 0 0 3px rgba(26,58,95,0.1); }
  .ps-input.err { border-color: #EF4444; }
  .ps-slider {
    -webkit-appearance: none; appearance: none;
    width: 100%; height: 7px; border-radius: 4px;
    outline: none; cursor: pointer; display: block;
    background: linear-gradient(to right, ${navy} 0%, ${amber} var(--p,25%), #E5E7EB var(--p,25%), #E5E7EB 100%);
  }
  .ps-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 30px; height: 30px; border-radius: 50%;
    background: ${navy}; border: 3px solid white;
    box-shadow: 0 3px 12px rgba(26,58,95,0.35); cursor: pointer;
    transition: transform 0.1s;
  }
  .ps-slider:active::-webkit-slider-thumb { transform: scale(1.2); }
  .ps-slider::-moz-range-thumb {
    width: 30px; height: 30px; border-radius: 50%;
    background: ${navy}; border: 3px solid white; cursor: pointer;
  }
  .ps-pri { transition: filter 0.15s, transform 0.1s; }
  .ps-pri:hover { filter: brightness(1.08); }
  .ps-pri:active { transform: scale(0.98); }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 2px; }
`;

// ── STATIC SUB-COMPONENTS (defined outside App to avoid re-mounting) ──────────

function SchemeTile({ s, on, toggle }) {
  const tc = s.fgDark ? "#1a1a1a" : "#fff";
  const r = parseInt(s.bg.slice(1,3),16);
  const g = parseInt(s.bg.slice(3,5),16);
  const b = parseInt(s.bg.slice(5,7),16);
  return (
    <button onClick={() => toggle(s.id)} style={{
      position: "relative", width: "100%", minHeight: 82,
      background: on ? s.bg : "#F3F4F6",
      border: `2px solid ${on ? s.bg : "#E5E7EB"}`,
      borderRadius: 12, padding: "8px 5px", cursor: "pointer",
      transition: "all 0.15s ease", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 4,
      boxShadow: on
        ? `0 4px 14px rgba(${r},${g},${b},0.55)`
        : `0 2px 10px rgba(${r},${g},${b},0.28), inset 0 0 0 1px rgba(${r},${g},${b},0.15)`,
      transform: on ? "scale(1.04)" : "scale(1)",
    }}>
      {on && (
        <div style={{
          position: "absolute", top: 3, right: 3, width: 15, height: 15,
          borderRadius: "50%", background: s.fgDark ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="8" height="6" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke={on ? (s.fgDark ? "#fff" : s.bg) : "#999"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
      <span style={{ fontSize: 18, lineHeight: 1 }}>{s.icon}</span>
      <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 12.5, color: on ? tc : "#374151", letterSpacing: "0.04em", lineHeight: 1.1 }}>{s.abbr}</span>
      <span style={{ fontSize: 9.5, color: on ? (s.fgDark ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.85)") : "#6B7280", textAlign: "center", lineHeight: 1.25, paddingLeft: 2, paddingRight: 2 }}>{s.name}</span>
    </button>
  );
}

function RankTile({ s, rank, toggle, locked }) {
  const ranked = rank !== null;
  const tc = s.fgDark ? "#1a1a1a" : "#fff";
  return (
    <button onClick={() => (!locked || ranked) && toggle(s.id)} style={{
      position: "relative", width: "100%", minHeight: 88,
      background: ranked ? s.bg : locked ? "#FAFAFA" : "#F3F4F6",
      border: `2px solid ${ranked ? s.bg : locked ? "#F3F4F6" : "#E5E7EB"}`,
      borderRadius: 14, padding: "12px 8px",
      cursor: locked && !ranked ? "not-allowed" : "pointer",
      opacity: locked && !ranked ? 0.4 : 1, transition: "all 0.15s ease",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 4,
      boxShadow: ranked ? `0 4px 16px ${s.bg}55` : "none",
      transform: ranked ? "scale(1.02)" : "scale(1)",
    }}>
      {ranked && (
        <div style={{
          position: "absolute", top: -10, right: -10, width: 25, height: 25,
          borderRadius: "50%", background: amber, border: "2px solid white",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 11, color: navy,
          boxShadow: "0 2px 8px rgba(245,158,11,0.4)",
        }}>#{rank}</div>
      )}
      <span style={{ fontSize: 18, lineHeight: 1 }}>{s.icon}</span>
      <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 12, color: ranked ? tc : "#374151", letterSpacing: "0.04em" }}>{s.abbr}</span>
      <span style={{ fontSize: 9.5, color: ranked ? (s.fgDark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.8)") : "#6B7280", textAlign: "center", lineHeight: 1.3 }}>{s.name}</span>
    </button>
  );
}

function Shell({ step, done, children, footer }) {
  const navigate = useNavigate();
  const stepLabels = ["Your details", "Your schemes", "Your top 5", "Switching thresholds"];
  return (
    <div style={{ background: cream, display: "flex", justifyContent: "center", minHeight: "100vh" }}>
      <div style={{ width: "100%", maxWidth: 440, background: "white", display: "flex", flexDirection: "column", boxShadow: "0 0 60px rgba(0,0,0,0.09)", minHeight: "100vh", borderTop: `3px solid ${red}` }}>
        {/* Header */}
        <div style={{ padding: "16px 20px 13px", borderBottom: "1px solid #F3F4F6", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
            <Wordmark size={21} />
            {/* David Moloney photo — links to author page */}
            <button onClick={() => navigate("/davidmoloney")} style={{
              background: "none", border: "2px solid #E5E7EB", borderRadius: "50%",
              padding: 0, cursor: "pointer", width: 36, height: 36, overflow: "hidden",
              flexShrink: 0, transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = red}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#E5E7EB"}
              title="About the Author — David Moloney"
            >
              <img src="/david-moloney-small.png" alt="David Moloney"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
            </button>
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 8.5, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: !done ? 12 : 0 }}>
            <span style={{ color: black }}>learn</span><span style={{ color: "#9CA3AF" }}> · </span>
            <span style={{ color: black }}>earn</span><span style={{ color: "#9CA3AF" }}> · </span>
            <span style={{ color: red }}>burn</span>
          </div>
          {!done && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 10.5, color: "#9CA3AF", fontWeight: 600 }}>Step {step} of 4</span>
                <span style={{ fontSize: 10.5, color: "#6B7280", fontWeight: 600 }}>{stepLabels[step - 1]}</span>
              </div>
              <div style={{ height: 4, background: "#F3F4F6", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 2, background: `linear-gradient(90deg, ${black}, ${red})`, width: `${(step / 4) * 100}%`, transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)" }} />
              </div>
            </>
          )}
        </div>
        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 18px 8px" }}>
          {children}
        </div>
        {/* Sticky footer */}
        {footer ? (
          <div style={{ padding: "10px 18px 26px", borderTop: "1px solid #F3F4F6", background: "white", flexShrink: 0 }}>
            {footer}
            <div style={{ textAlign: "center", marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <span style={{ fontSize: 10, color: "#9CA3AF" }}>POINTSMaster is powered by</span>
              <div style={{ background: "#3B5A8A", borderRadius: 4, height: 18, padding: "0 6px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontWeight: 800, fontSize: 10, letterSpacing: "0.06em" }}>ICG</span>
              </div>
            </div>
          </div>
        ) : done ? (
          <div style={{ padding: "10px 18px 20px", borderTop: "1px solid #F3F4F6", background: "white", flexShrink: 0, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <span style={{ fontSize: 10, color: "#9CA3AF" }}>POINTSMaster is powered by</span>
            <div style={{ background: "#3B5A8A", borderRadius: 4, height: 18, padding: "0 6px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontWeight: 800, fontSize: 10, letterSpacing: "0.06em" }}>ICG</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function PBtn({ label, onClick, disabled, grad }) {
  return (
    <button onClick={onClick} disabled={disabled} className="ps-pri" style={{
      width: "100%", padding: "14px",
      background: grad ? `linear-gradient(135deg, ${red}, #B01E0B)` : disabled ? "#E5E7EB" : black,
      color: disabled ? "#9CA3AF" : "white", border: "none", borderRadius: 12,
      fontSize: 14, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em",
      fontSize: 15,
      boxShadow: grad ? `0 4px 18px rgba(230,41,18,0.35)` : "none",
    }}>{label}</button>
  );
}

function SBtn({ label, onClick }) {
  return (
    <button onClick={onClick} style={{ width: "100%", padding: "9px", background: "transparent", color: "#6B7280", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
      {label}
    </button>
  );
}

function Badge({ children, bg = "#EFF6FF", color = "#1D4ED8" }) {
  return (
    <div style={{ background: bg, borderRadius: 8, padding: "7px 12px", fontSize: 12.5, fontWeight: 600, color, marginBottom: 11 }}>
      {children}
    </div>
  );
}

function H({ t, sub }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h1 style={{ fontSize: 19, fontWeight: 800, color: "#111827", lineHeight: 1.2, marginBottom: 4 }}>{t}</h1>
      {sub && <p style={{ fontSize: 12.5, color: "#6B7280", lineHeight: 1.6 }}>{sub}</p>}
    </div>
  );
}

// ── AUTHOR PAGE ───────────────────────────────────────────────────────────────

function AuthorPage() {
  const navigate = useNavigate();
  const onBack = () => navigate("/");

  const quotes = [
    { text: "A masterclass in understanding Australia's most lucrative hidden economy.", source: "Financial Review" },
    { text: "Required reading for anyone who earns frequent flyer points.", source: "The Australian" },
    { text: "David Moloney demystifies a world most Australians leave money on the table in.", source: "Smart Traveller" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#FAFAF8", minHeight: "100vh" }}>
      {/* ── Sticky header ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(17,17,17,0.97)", backdropFilter: "blur(8px)",
        padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
      }}>
        <Wordmark size={20} dark />
        <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="#book" style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 600, textDecoration: "none", fontFamily: "sans-serif" }}>The Book</a>
          <a href="#about" style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 600, textDecoration: "none", fontFamily: "sans-serif" }}>About David</a>
          <button onClick={onBack} style={{
            background: red, color: "white", border: "none", borderRadius: 8,
            padding: "8px 16px", fontSize: 12.5, fontWeight: 800, cursor: "pointer",
            fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em",
          }}>JOIN POINTSMaster →</button>
        </nav>
      </div>

      {/* ── Hero ── */}
      <div style={{
        background: `linear-gradient(150deg, #111111 0%, #1a1a1a 60%, #222 100%)`,
        padding: "72px 24px 0",
        overflow: "visible",
        position: "relative",
      }}>

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 32, flexWrap: "wrap" }}>
            {/* Left: text */}
            <div style={{ flex: "1 1 340px", paddingBottom: 60 }}>
              <div style={{
                display: "inline-block", background: red, color: "white",
                fontSize: 10, fontWeight: 800, letterSpacing: "0.18em",
                textTransform: "uppercase", padding: "5px 12px", borderRadius: 4,
                marginBottom: 24, fontFamily: "'Barlow Condensed', sans-serif",
              }}>Author · Speaker · Consultant</div>

              <h1 style={{
                fontSize: "clamp(38px, 6vw, 58px)", fontWeight: 900, color: "white",
                lineHeight: 1.08, marginBottom: 20, letterSpacing: "-0.025em",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}>
                David<br />Moloney
              </h1>
              <p style={{
                fontSize: 17, color: "rgba(255,255,255,0.8)", lineHeight: 1.65,
                marginBottom: 32, maxWidth: 380,
              }}>
                Australia's leading authority on loyalty programs, points strategy, and the hidden economy of frequent flyer rewards.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button onClick={onBack} style={{
                  background: red, color: "white", border: "none", borderRadius: 10,
                  padding: "13px 24px", fontSize: 15, fontWeight: 800, cursor: "pointer",
                  fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em",
                  boxShadow: `0 4px 20px rgba(230,41,18,0.4)`,
                }}>JOIN POINTSMaster →</button>
                <a href="#video" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(255,255,255,0.12)", color: "white",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 10, padding: "13px 24px", fontSize: 14, fontWeight: 600,
                  cursor: "pointer", fontFamily: "sans-serif", textDecoration: "none",
                }}>▶ Watch intro</a>
              </div>
            </div>

            {/* Right: tail motif behind David, book overlapping right */}
            <div id="book" style={{ flex: "0 0 auto", alignSelf: "flex-end", display: "flex", alignItems: "flex-end" }}>
              {/* Fixed box — tail motif fills it, David at 67% height (1.5x ratio) */}
              <div style={{ position: "relative", width: 320, height: 420, flexShrink: 0 }}>
                <img
                  src="/tail motif alpha.png"
                  alt=""
                  style={{
                    position: "absolute", bottom: 0, left: "50%",
                    transform: "translateX(-50%)",
                    height: "100%", width: "auto",
                    display: "block", zIndex: 0,
                  }}
                />
                <img
                  src="/DavidM.png"
                  alt="David Moloney"
                  style={{
                    position: "absolute", bottom: -15, left: "50%",
                    transform: "translateX(calc(-50% - 20px))",
                    height: "67%", width: "auto",
                    display: "block", zIndex: 1,
                  }}
                />
              </div>
              {/* Book cover — slightly overlapping David */}
              <img
                src="/book-cover.jpg"
                alt="Points — Mastering the Game of Frequent Flyers by David Moloney"
                style={{
                  width: 150, height: "auto",
                  borderRadius: "6px 6px 0 0",
                  boxShadow: "-8px 8px 30px rgba(0,0,0,0.6)",
                  display: "block",
                  position: "relative", zIndex: 2,
                  marginLeft: -82, flexShrink: 0,
                  alignSelf: "flex-end",
                }}
              />
          </div>
          </div>
        </div>
      </div>

      {/* ── Social proof strip ── */}
      <div style={{ background: "#111827", padding: "18px 24px", overflowX: "auto" }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          display: "flex", gap: 40, alignItems: "center", justifyContent: "center", flexWrap: "wrap",
        }}>
          {quotes.map((q, i) => (
            <div key={i} style={{ textAlign: "center", minWidth: 200 }}>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 12.5, fontStyle: "italic", lineHeight: 1.5, marginBottom: 4 }}>"{q.text}"</p>
              <span style={{ color: red, fontSize: 11, fontWeight: 700, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em" }}>— {q.source}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Video ── */}
      <div id="video" style={{ background: cream, padding: "72px 24px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ color: red, fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Barlow Condensed', sans-serif" }}>Meet David</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 900, color: black, lineHeight: 1.2, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}>
              Why Australians are leaving<br />billions in points unclaimed
            </h2>
          </div>

          {/* Video embed */}
          <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", background: "#000" }}>
            <video
              ref={el => {
                if (!el) return;
                const obs = new IntersectionObserver(
                  ([entry]) => {
                    if (entry.isIntersecting) { el.currentTime = 0; el.play(); }
                    else { el.pause(); }
                  },
                  { threshold: 0.5 }
                );
                obs.observe(el);
              }}
              poster="/david-intro-poster.jpg"
              controls
              muted
              playsInline
              style={{ width: "100%", display: "block", maxHeight: 500 }}
            >
              <source src="/david-intro.mp4" type="video/mp4" />
            </video>
          </div>

          <p style={{ textAlign: "center", color: "#6B7280", fontSize: 13, marginTop: 16, fontFamily: "sans-serif" }}>
            David Moloney · <a href="mailto:hello@pointsstore.app" style={{ color: red }}>Contact David</a>
          </p>
        </div>
      </div>

      {/* ── About David ── */}
      <div id="about" style={{ background: "white", padding: "72px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 64, flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* Photo placeholder */}
          <div style={{ flex: "0 0 auto" }}>
            <div style={{
              width: 240, height: 320,
              background: `linear-gradient(160deg, #111 0%, #222 100%)`,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
              position: "relative",
            }}>
              <TailFin width={220} color={red} opacity={0.95}
                style={{ position: "absolute", bottom: -10, right: -10, zIndex: 0 }} />
              <img
                src="/david-moloney.png"
                alt="David Moloney"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  height: "100%",
                  width: "auto",
                  display: "block",
                  zIndex: 1,
                }}
              />
            </div>
            {/* Book cover small */}
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <img src="/book-cover.jpg" alt="Points book" style={{ width: 110, borderRadius: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }} />
              <p style={{ fontSize: 12, color: "#6B7280", fontFamily: "sans-serif", marginTop: 8 }}>Available now</p>
              <a href="#" style={{
                display: "inline-block", marginTop: 8,
                background: black, color: "white", borderRadius: 8,
                padding: "8px 18px", fontSize: 12.5, fontWeight: 700,
                textDecoration: "none", fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: "0.06em",
              }}>BUY THE BOOK</a>
            </div>
          </div>

          {/* Bio */}
          <div style={{ flex: "1 1 340px" }}>
            <div style={{ color: red, fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Barlow Condensed', sans-serif" }}>About the Author</div>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: black, marginBottom: 20, lineHeight: 1.1, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.01em" }}>David Moloney</h2>

            <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 18 }}>
              David Moloney has spent two decades at the intersection of consumer behaviour, financial services, and loyalty economics. As a senior consultant and strategist, he has advised some of Australia's largest banks, airlines, and retailers on how they design — and profit from — their points programs.
            </p>
            <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 18 }}>
              In <em>Points: Mastering the Game of Frequent Flyers</em>, David turns the tables — giving everyday Australians the same insider knowledge that program designers use to keep billions of points locked away unspent.
            </p>
            <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 32 }}>
              David is a sought-after speaker on loyalty strategy, consumer advocacy, and the economics of rewards. He is a partner at ICG, recognised by Forbes as one of the World's Best Management Consulting Firms in 2024 and 2025.
            </p>

            {/* ICG badges */}
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 32, flexWrap: "wrap" }}>
              <img src="/og-image.png" alt="ICG Forbes World's Best Management Consulting Firms 2024 & 2025" style={{ height: 80, borderRadius: 8 }} />
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[
                { n: "20+", label: "Years in loyalty strategy" },
                { n: "80+", label: "Programs analysed" },
                { n: "$2B+", label: "Points value modelled" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: red, lineHeight: 1, fontFamily: "'Barlow Condensed', sans-serif" }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: "#6B7280", fontFamily: "sans-serif", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: black, padding: "72px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, opacity: 0.08, pointerEvents: "none" }}>
          <TailFin width={300} color={red} />
        </div>
        <div style={{ maxWidth: 560, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ color: red, fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Barlow Condensed', sans-serif" }}>Ready to play the game?</div>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 20, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.01em" }}>
            Start earning smarter<br />with POINTSMaster
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.65, marginBottom: 36 }}>
            Join thousands of Australians who are finally getting full value from their loyalty programs.
          </p>
          <button onClick={onBack} style={{
            background: red, color: "white", border: "none", borderRadius: 12,
            padding: "16px 40px", fontSize: 16, fontWeight: 800, cursor: "pointer",
            fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em",
            boxShadow: `0 8px 32px rgba(230,41,18,0.4)`,
          }}>GET STARTED — IT'S FREE →</button>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ background: "#0A0A0A", padding: "24px", textAlign: "center" }}>
        <div style={{ marginBottom: 6, display: "flex", justifyContent: "center" }}>
          <Wordmark size={18} dark />
        </div>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "sans-serif" }}>
          © 2025 POINTSMaster · A platform by ICG · <a href="mailto:hello@pointsstore.app" style={{ color: "rgba(255,255,255,0.35)" }}>hello@pointsstore.app</a>
        </p>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────

function RegistrationApp() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [selected, setSelected] = useState(new Set());
  const [topFive, setTopFive] = useState([]);
  const [thresholds, setThresholds] = useState({});
  const [done, setDone] = useState(false);

  const selectedArr = Array.from(selected);
  const selectedObjs = selectedArr.map(id => ALL_SCHEMES.find(s => s.id === id)).filter(Boolean);
  const selectedCats = CATS.filter(c => c.schemes.some(s => selected.has(s.id)));
  const need5 = Math.min(5, selectedArr.length);

  const toggleScheme = id => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); setTopFive(t => t.filter(x => x !== id)); }
      else next.add(id);
      return next;
    });
  };

  const toggleTop5 = id => setTopFive(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) :
    prev.length >= 5 ? prev : [...prev, id]
  );

  const initThresholds = () => {
    const init = {};
    selectedCats.forEach(c => {
      if (thresholds[c.id] === undefined)
        init[c.id] = Math.round(c.range[1] * 0.25 / c.step) * c.step;
    });
    setThresholds(p => ({ ...init, ...p }));
  };

  const validate1 = () => {
    const e = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim()) e.email = "Please enter your email address";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Please enter a valid email address";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const step2Next = () => {
    if (!selected.size) return;
    if (selectedArr.length <= 5) { setTopFive(selectedArr); initThresholds(); setStep(4); }
    else setStep(3);
  };

  // ── DONE ──────────────────────────────────────────────────────────────────

  if (done) return (
    <>
      <style>{CSS}</style>
      <Shell step={4} done={true}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 15, position: "relative" }}>
          {/* Ghost tail fin watermark */}
          <div style={{ position: "absolute", top: -18, right: -18, pointerEvents: "none", zIndex: 0 }}>
            <TailFin width={160} opacity={0.06} color={red} />
          </div>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${red}22, ${red}44)`, border: `2px solid ${red}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, position: "relative", zIndex: 1 }}>🎉</div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h1 style={{ fontSize: 23, fontWeight: 900, color: black, marginBottom: 7, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.02em" }}>You're on the list!</h1>
            <p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.65, maxWidth: 290, margin: "0 auto" }}>
              Thanks {name.split(" ")[0] || "there"}! We've saved your loyalty profile.
            </p>
          </div>
          <div style={{ background: `${red}0D`, border: `1px solid ${red}33`, borderRadius: 12, padding: "13px 15px", width: "100%", position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: 12.5, fontWeight: 700, color: red, marginBottom: 3 }}>What happens next</p>
            <p style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.6 }}>Watch <strong>{email || "your inbox"}</strong> for your welcome email and first matched opportunities.</p>
          </div>
          <div style={{ background: cream, borderRadius: 12, padding: "13px 15px", width: "100%", textAlign: "left", position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 7 }}>Your profile</p>
            <p style={{ fontSize: 12.5, color: "#6B7280", marginBottom: 7 }}>
              <strong style={{ color: "#111827" }}>{selectedArr.length} schemes</strong> tracked ·{" "}
              <strong style={{ color: "#111827" }}>{topFive.length}</strong> favourites ranked
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {topFive.map((id, i) => {
                const s = ALL_SCHEMES.find(x => x.id === id);
                return s ? <span key={id} style={{ background: s.bg, color: s.fgDark ? "#1a1a1a" : "#fff", fontSize: 10.5, fontWeight: 700, fontFamily: "monospace", padding: "3px 8px", borderRadius: 5 }}>#{i+1} {s.abbr}</span> : null;
              })}
            </div>
          </div>
        </div>
      </Shell>
    </>
  );

  // ── STEP 1 ────────────────────────────────────────────────────────────────

  if (step === 1) return (
    <>
      <style>{CSS}</style>
      <Shell step={1} done={false} footer={<PBtn label="Continue →" onClick={() => { if (validate1()) setStep(2); }} />}>
        <H t="Welcome to POINTSMaster" sub="Australia's definitive guide to loyalty points. Build your personal profile in about 2 minutes." />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Your name</label>
            <input
              className={`ps-input${errors.name ? " err" : ""}`}
              type="text"
              value={name}
              placeholder="First and last name"
              onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: "" })); }}
            />
            {errors.name && <p style={{ fontSize: 11.5, color: "#EF4444", marginTop: 3 }}>{errors.name}</p>}
          </div>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Email address</label>
            <input
              className={`ps-input${errors.email ? " err" : ""}`}
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
            />
            {errors.email && <p style={{ fontSize: 11.5, color: "#EF4444", marginTop: 3 }}>{errors.email}</p>}
          </div>
        </div>
        <div style={{ marginTop: 15, padding: "10px 13px", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10 }}>
          <p style={{ fontSize: 11.5, color: "#92400E", lineHeight: 1.55 }}>🔒 Stored securely. We only use your details to send matched loyalty opportunities — we never sell your data.</p>
        </div>
      </Shell>
    </>
  );

  // ── STEP 2 ────────────────────────────────────────────────────────────────

  if (step === 2) return (
    <>
      <style>{CSS}</style>
      <Shell step={2} done={false} footer={
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PBtn
            label={selected.size ? `Continue with ${selected.size} scheme${selected.size !== 1 ? "s" : ""} →` : "Select at least one scheme"}
            onClick={step2Next}
            disabled={!selected.size}
          />
          <SBtn label="← Back" onClick={() => setStep(1)} />
        </div>
      }>
        <H t="Which schemes are you in?" sub="Tap every loyalty program you belong to. Include ones you rarely use — we'll show you how to get more from all of them." />
        {selected.size > 0 && (
          <Badge>✓ {selected.size} scheme{selected.size !== 1 ? "s" : ""} selected across {selectedCats.length} categories</Badge>
        )}
        {CATS.map(cat => {
          const catSelected = cat.schemes.filter(s => selected.has(s.id)).length;
          return (
            <div key={cat.id}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 700, color: "#374151", marginTop: 17, marginBottom: 8, paddingBottom: 6, borderBottom: "1px solid #F3F4F6" }}>
                <span style={{ fontSize: 15 }}>{cat.emoji}</span>
                <span style={{ flex: 1 }}>{cat.label}</span>
                {catSelected > 0 && <span style={{ fontSize: 10, color: amber, fontWeight: 700 }}>✓ {catSelected}</span>}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 7 }}>
                {cat.schemes.map(s => (
                  <SchemeTile key={s.id} s={s} on={selected.has(s.id)} toggle={toggleScheme} />
                ))}
              </div>
            </div>
          );
        })}
        <div style={{ height: 8 }} />
      </Shell>
    </>
  );

  // ── STEP 3 ────────────────────────────────────────────────────────────────

  if (step === 3) return (
    <>
      <style>{CSS}</style>
      <Shell step={3} done={false} footer={
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PBtn
            label={topFive.length >= need5 ? "Continue →" : `Select ${need5 - topFive.length} more`}
            onClick={() => { initThresholds(); setStep(4); }}
            disabled={topFive.length < need5}
          />
          <SBtn label="← Back" onClick={() => setStep(2)} />
        </div>
      }>
        <H t="Pick your top 5" sub="Tap your most important schemes in order of priority. These get the most focus in your personalised recommendations." />
        {topFive.length === 5
          ? <Badge bg="#FEF9EC" color="#92400E">★ Top 5 complete — tap any to reorder</Badge>
          : <Badge>{topFive.length} of 5 selected — {5 - topFive.length} to go</Badge>
        }
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 11 }}>
          {selectedObjs.map(s => {
            const rank = topFive.indexOf(s.id);
            return (
              <RankTile
                key={s.id} s={s}
                rank={rank >= 0 ? rank + 1 : null}
                toggle={toggleTop5}
                locked={topFive.length >= 5 && rank < 0}
              />
            );
          })}
        </div>
        <div style={{ height: 8 }} />
      </Shell>
    </>
  );

  // ── STEP 4 ────────────────────────────────────────────────────────────────

  if (step === 4) return (
    <>
      <style>{CSS}</style>
      <Shell step={4} done={false} footer={
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <PBtn label="I'm in — finish! 🎉" onClick={() => setDone(true)} grad />
          <SBtn label="← Back" onClick={() => setStep(selectedArr.length > 5 ? 3 : 2)} />
        </div>
      }>
        <H t="What would make you switch?" sub="For each category, drag to show how many bonus points would convince you to switch to a competing provider." />
        {selectedCats.map(cat => {
          const val = thresholds[cat.id] ?? Math.round(cat.range[1] * 0.25 / cat.step) * cat.step;
          const pct = ((val - cat.range[0]) / (cat.range[1] - cat.range[0])) * 100;
          return (
            <div key={cat.id} style={{ background: "#FAFAFA", border: "1px solid #F3F4F6", borderRadius: 13, padding: "14px", marginBottom: 11 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 17 }}>{cat.emoji}</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#111827" }}>{cat.label}</span>
              </div>
              <p style={{ fontSize: 11, color: "#6B7280", marginBottom: 11, lineHeight: 1.5 }}>{cat.q}</p>
              <div style={{ textAlign: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 30, fontWeight: 900, color: navy, lineHeight: 1 }}>{val.toLocaleString()}</span>
                <span style={{ fontSize: 12, color: "#6B7280", marginLeft: 4, fontWeight: 600 }}>pts</span>
              </div>
              <input
                type="range" className="ps-slider"
                min={cat.range[0]} max={cat.range[1]} step={cat.step} value={val}
                style={{ "--p": `${pct}%` }}
                onChange={e => setThresholds(p => ({ ...p, [cat.id]: +e.target.value }))}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ fontSize: 9.5, color: "#9CA3AF" }}>0</span>
                <span style={{ fontSize: 9.5, color: "#9CA3AF" }}>{fmtPts(cat.range[1])}</span>
              </div>
            </div>
          );
        })}
        <div style={{ height: 8 }} />
      </Shell>
    </>
  );

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationApp />} />
        <Route path="/davidmoloney" element={<AuthorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
