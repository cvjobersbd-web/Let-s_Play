import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PROVIDERS = ["সব", "PG", "BNG", "Pragmatic", "JILI", "SPRIBE", "FC", "Evolution", "MEGA"];

const GAMES = [
  { id: 1,  name: "SuperAce",              provider: "JILI",      image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: true,  multiplier: null,     hot: true  },
  { id: 2,  name: "Aviator",               provider: "SPRIBE",    image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: false, multiplier: null,     hot: true  },
  { id: 3,  name: "Wild Bounty Showdown",  provider: "PG",        image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: false, multiplier: null,     hot: false },
  { id: 4,  name: "SuperAce Deluxe",       provider: "JILI",      image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: true,  multiplier: null,     hot: false },
  { id: 5,  name: "Super Elements",        provider: "FC",        image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: false, multiplier: "2000x",  hot: true  },
  { id: 6,  name: "Fortune Gems 3",        provider: "JILI",      image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: true,  multiplier: null,     hot: false },
  { id: 7,  name: "Magic Ace Wild Lock",   provider: "BNG",       image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: false, multiplier: null,     hot: false },
  { id: 8,  name: "FlyX",                  provider: "SPRIBE",    image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: false, multiplier: null,     hot: true  },
  { id: 9,  name: "Circus Joker 4096",     provider: "BNG",       image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: true,  multiplier: null,     hot: false },
  { id: 10, name: "Boxing King",           provider: "JILI",      image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: false, multiplier: null,     hot: false },
  { id: 11, name: "Fortune Garuda 500",    provider: "PG",        image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: false, multiplier: null,     hot: false },
  { id: 12, name: "Anubis Wrath",          provider: "PG",        image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: false, multiplier: null,     hot: true  },
  { id: 13, name: "Treasures of Aztec",    provider: "PG",        image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: false, multiplier: null,     hot: false },
  { id: 14, name: "Money Coming",          provider: "JILI",      image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: false, multiplier: "10000x", hot: true  },
  { id: 15, name: "FC Chinese New Year",   provider: "FC",        image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: false, multiplier: "10000x", hot: false },
  { id: 16, name: "Golden Empire",         provider: "JILI",      image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: true,  multiplier: null,     hot: true  },
  { id: 17, name: "Mahjong Ways",          provider: "PG",        image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: false, multiplier: "5000x",  hot: true  },
  { id: 18, name: "Gates of Olympus",      provider: "Pragmatic", image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: false, multiplier: null,     hot: true  },
  { id: 19, name: "Sweet Bonanza",         provider: "Pragmatic", image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: false, multiplier: null,     hot: false },
  { id: 20, name: "Dragon Tiger",          provider: "Evolution", image: "https://i.ibb.co.com/bM6hD3SB/unnamed.webp", isNew: true,  multiplier: null,     hot: false },
];

const SOCIAL = [
  { icon: "💬", color: "#25D366", label: "WhatsApp" },
  { icon: "f",  color: "#1877F2", label: "Facebook" },
  { icon: "✈️", color: "#0088CC", label: "Telegram" },
  { icon: "🎧", color: "#E91E8C", label: "Support"  },
];

const GAMES_PER_PAGE = 10;

// ─────────────────────────────────────────────
// TICKER
// ─────────────────────────────────────────────
const TICKER_ITEMS = [
  "🎉 রহিম জিতেছেন ৳৪৫,০০০ — Fortune Gems 3",
  "🔥 করিম জিতেছেন ৳১,২০,০০০ — Gates of Olympus",
  "💰 সুমাইয়া জিতেছেন ৳৮৮,৫০০ — Sweet Bonanza",
  "🏆 আরিফ জিতেছেন ৳২,৫০,০০০ — Money Coming",
  "⚡ নাফিসা জিতেছেন ৳৬৭,০০০ — Aviator",
];

function Ticker() {
  return (
    <div style={{ background: "rgba(233,30,140,0.12)", borderTop: "1px solid rgba(233,30,140,0.2)", borderBottom: "1px solid rgba(233,30,140,0.2)", overflow: "hidden", padding: "8px 0" }}>
      <div style={{ display: "flex", animation: "ticker 28s linear infinite", whiteSpace: "nowrap" }}>
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} style={{ color: "#FFD700", fontSize: "13px", fontWeight: 600, marginRight: "64px", flexShrink: 0 }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function Hero() {
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const content = {
    bn: {
      badge: 'বিশেষ বোনাস অফার',
      title: 'সেরা ক্যাসিনো',
      titleHighlight: 'অ্যাফিলিয়েট প্রোগ্রাম',
      titleEnd: 'সকলের জন্য',
      desc: 'হাজারো গেম, বিশাল জ্যাকপট এবং নিরাপদ পেমেন্ট সিস্টেম নিয়ে আপনাকে স্বাগতম। আজই যোগ দিন এবং ১০০% ওয়েলকাম বোনাস পান।',
      playBtn: 'এখনই খেলুন →',
      learnBtn: 'আরও জানুন',
      trust1: '🔒 নিরাপদ',
      trust2: '⚡ তাৎক্ষণিক উইথড্রো',
      trust3: '🎁 ডেইলি বোনাস',
    },
    en: {
      badge: 'Special Bonus Offer',
      title: 'Best Casino',
      titleHighlight: 'Affiliate Program',
      titleEnd: 'For Everyone',
      desc: 'Welcome to thousands of games, huge jackpots and secure payment system. Join today and get 100% Welcome Bonus.',
      playBtn: 'Play Now →',
      learnBtn: 'Learn More',
      trust1: '🔒 Secure',
      trust2: '⚡ Instant Withdraw',
      trust3: '🎁 Daily Bonus',
    }
  };

  const t = content[language];

  return (
    <section style={{
      position: "relative", background: "#0F0626",
      minHeight: "calc(100vh - 68px)", display: "flex",
      alignItems: "center", overflow: "hidden",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      {/* Glow blobs */}
      <div style={{ position: "absolute", top: "15%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(233,30,140,0.18) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "5%", right: "15%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(155,43,255,0.2) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "30%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(233,30,140,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* Particle dots */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${8 + i * 8}%`, top: `${20 + (i % 4) * 18}%`,
          width: 3, height: 3, borderRadius: "50%",
          background: i % 3 === 0 ? "#E91E8C" : i % 3 === 1 ? "#FFD700" : "#9B2BFF",
          opacity: 0.4,
          animation: `particlePulse ${2 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
          pointerEvents: "none",
        }} />
      ))}

      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "60px 24px",
        display: "flex", alignItems: "center", gap: 48,
        width: "100%", position: "relative", zIndex: 1,
        flexWrap: "wrap",
      }}>
        {/* Left */}
        <div style={{
          flex: "1 1 420px",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(.22,1,.36,1)",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.25)",
            borderRadius: 999, padding: "6px 16px", marginBottom: 24,
          }}>
            <span style={{ fontSize: 16 }}>🎰</span>
            <span style={{ color: "#FFD700", fontSize: 12, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase" }}>{t.badge}</span>
          </div>

          <h1 style={{
            color: "#fff", fontSize: "clamp(34px,5vw,60px)", fontWeight: 900,
            lineHeight: 1.1, margin: "0 0 20px",
            textShadow: "0 0 60px rgba(233,30,140,0.2)",
          }}>
            {t.title}<br />
            <span style={{ background: "linear-gradient(90deg,#E91E8C,#9B2BFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t.titleHighlight}
            </span><br />
            {t.titleEnd}
          </h1>

          <p style={{ color: "#B0A8C8", fontSize: 16, lineHeight: 1.8, marginBottom: 32, maxWidth: 420 }}>
            {t.desc}
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
            <button style={{
              background: "linear-gradient(135deg,#E91E8C,#9B2BFF)",
              border: "none", color: "#fff", padding: "16px 36px",
              borderRadius: 12, fontSize: 15, fontWeight: 800,
              cursor: "pointer", boxShadow: "0 8px 32px rgba(233,30,140,0.35)",
              transition: "all 0.2s", letterSpacing: 0.5,
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 40px rgba(233,30,140,0.5)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 32px rgba(233,30,140,0.35)"; }}>
              {t.playBtn}
            </button>
            <button style={{
              background: "transparent", border: "1.5px solid rgba(255,255,255,0.2)",
              color: "#fff", padding: "16px 28px", borderRadius: 12,
              fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.07)"; e.target.style.borderColor = "rgba(255,255,255,0.4)"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(255,255,255,0.2)"; }}>
              {t.learnBtn}
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[t.trust1, t.trust2, t.trust3].map(b => (
              <span key={b} style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600 }}>{b}</span>
            ))}
          </div>
        </div>

        {/* Right — Hero image */}
        <div style={{
          flex: "1 1 380px", display: "flex", alignItems: "center",
          justifyContent: "center", position: "relative",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 1s cubic-bezier(.22,1,.36,1) 0.2s",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle,rgba(155,43,255,0.25) 0%,transparent 70%)",
            animation: "pulseGlow 4s ease-in-out infinite",
            borderRadius: "50%",
          }} />
          <img
            src="https://i.ibb.co.com/5gJcyMkb/casino.png"
            alt="Casino 777"
            style={{
              width: "100%", maxWidth: 520, objectFit: "contain",
              filter: "drop-shadow(0 0 60px rgba(155,43,255,0.35)) drop-shadow(0 20px 60px rgba(0,0,0,0.5))",
              animation: "floatImage 5s ease-in-out infinite",
              position: "relative", zIndex: 2,
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// STATS BAR
// ─────────────────────────────────────────────
function StatsBar() {
  const { language } = useLanguage();

  const statsData = {
    bn: [
      { label: "মোট গেম", value: "5,000+", icon: "🎮" },
      { label: "সক্রিয় খেলোয়াড়", value: "120K+", icon: "👥" },
      { label: "পেমেন্ট অপশন", value: "50+", icon: "💳" },
      { label: "জ্যাকপট পুল", value: "৳৯৯ কোটি", icon: "🏆" },
    ],
    en: [
      { label: "Total Games", value: "5,000+", icon: "🎮" },
      { label: "Active Players", value: "120K+", icon: "👥" },
      { label: "Payment Options", value: "50+", icon: "💳" },
      { label: "Jackpot Pool", value: "৳99 Crore", icon: "🏆" },
    ]
  };

  const stats = statsData[language];

  return (
    <div style={{
      background: "linear-gradient(90deg,rgba(233,30,140,0.12),rgba(155,43,255,0.12))",
      borderTop: "1px solid rgba(233,30,140,0.15)",
      borderBottom: "1px solid rgba(155,43,255,0.15)",
      padding: "20px 24px",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
        {stats.map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 26 }}>{s.icon}</div>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 900, letterSpacing: -0.5 }}>{s.value}</div>
            <div style={{ color: "#B0A8C8", fontSize: 12, fontWeight: 600, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// GAME CARD
// ─────────────────────────────────────────────
function GameCard({ game, isFav, onFavToggle, onPlay, language }) {
  const [hovered, setHovered] = useState(false);

  const t = {
    bn: { play: '▶ খেলুন', demo: 'ডেমো', new: 'নতুন' },
    en: { play: '▶ Play', demo: 'Demo', new: 'NEW' }
  }[language];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 14, overflow: "hidden", cursor: "pointer",
        border: hovered ? "1.5px solid rgba(233,30,140,0.5)" : "1.5px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.03)",
        transform: hovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
        boxShadow: hovered ? "0 12px 40px rgba(233,30,140,0.2)" : "none",
        position: "relative",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
        <img
          src={game.image} alt={game.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.4s" }}
        />

        {/* Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top,rgba(10,3,30,0.95) 0%,rgba(10,3,30,0.4) 50%,transparent 100%)",
          opacity: hovered ? 1 : 0, transition: "opacity 0.25s",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <button
            onClick={() => onPlay(game)}
            style={{
              background: "linear-gradient(135deg,#E91E8C,#9B2BFF)",
              border: "none", color: "#fff", padding: "10px 24px",
              borderRadius: 999, fontSize: 13, fontWeight: 800,
              cursor: "pointer", boxShadow: "0 4px 20px rgba(233,30,140,0.4)",
              transform: hovered ? "scale(1)" : "scale(0.8)",
              transition: "transform 0.2s 0.05s",
            }}>
            {t.play}
          </button>
          <button
            onClick={() => onPlay(game)}
            style={{
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff", padding: "7px 18px", borderRadius: 999,
              fontSize: 11, fontWeight: 700, cursor: "pointer",
            }}>
            {t.demo}
          </button>
        </div>

        {/* Badges */}
        {game.isNew && (
          <span style={{
            position: "absolute", top: 8, left: 8,
            background: "linear-gradient(135deg,#E91E8C,#9B2BFF)",
            color: "#fff", fontSize: 9, fontWeight: 800,
            padding: "3px 7px", borderRadius: 4, letterSpacing: 1,
          }}>{t.new}</span>
        )}
        {game.hot && !game.isNew && (
          <span style={{
            position: "absolute", top: 8, left: 8,
            background: "linear-gradient(135deg,#FF6B00,#FFD700)",
            color: "#fff", fontSize: 9, fontWeight: 800,
            padding: "3px 7px", borderRadius: 4, letterSpacing: 1,
          }}>🔥 HOT</span>
        )}
        {game.multiplier && (
          <span style={{
            position: "absolute", top: 8, right: 30,
            background: "rgba(255,215,0,0.92)", color: "#0a031e",
            fontSize: 9, fontWeight: 800, padding: "3px 6px", borderRadius: 4,
          }}>{game.multiplier}</span>
        )}

        {/* Fav */}
        <button
          onClick={e => { e.stopPropagation(); onFavToggle(game.id); }}
          style={{
            position: "absolute", top: 6, right: 6,
            width: 26, height: 26, borderRadius: "50%",
            background: "rgba(0,0,0,0.5)", border: "none",
            fontSize: 13, cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
            transition: "transform 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: "8px 10px 10px", background: "rgba(0,0,0,0.2)" }}>
        <p style={{ color: "#fff", fontSize: 12, fontWeight: 700, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{game.name}</p>
        <p style={{ color: "#9B2BFF", fontSize: 10, fontWeight: 600, margin: "2px 0 0" }}>{game.provider}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// GAMES SECTION
// ─────────────────────────────────────────────
function GamesSection() {
  const { language } = useLanguage();
  const [activeProvider, setActiveProvider] = useState("সব");
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [playingGame, setPlayingGame] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const sectionRef = useRef(null);

  const translations = {
    bn: {
      allGames: 'সকল গেম',
      gamesAvailable: 'গেম উপলব্ধ',
      tabs: {
        all: 'সব',
        hot: '🔥 হট',
        new: '✨ নতুন',
        fav: '❤️ পছন্দ',
      },
      noGames: 'কোনো গেম পাওয়া যায়নি',
      searchPlaceholder: 'গেম খুঁজুন...',
      play: '▶ খেলুন',
      demo: 'ডেমো',
      new: 'নতুন',
      login: 'লগইন করুন',
      close: 'বন্ধ করুন',
      gameStart: 'গেমটি শুরু করতে লগইন করুন অথবা ডেমো মোডে বিনামূল্যে খেলুন।',
      playNow: 'লগইন করুন',
    },
    en: {
      allGames: 'All Games',
      gamesAvailable: 'games available',
      tabs: {
        all: 'All',
        hot: '🔥 Hot',
        new: '✨ New',
        fav: '❤️ Fav',
      },
      noGames: 'No games found',
      searchPlaceholder: 'Search games...',
      play: '▶ Play',
      demo: 'Demo',
      new: 'NEW',
      login: 'Login',
      close: 'Close',
      gameStart: 'Login to start the game or play demo for free.',
      playNow: 'Login',
    }
  };

  const t = translations[language];

  const toggleFav = id => setFavorites(p => p.includes(id) ? p.filter(f => f !== id) : [...p, id]);

  const filtered = GAMES
    .filter(g => activeProvider === "সব" || g.provider === activeProvider)
    .filter(g => search === "" || g.name.toLowerCase().includes(search.toLowerCase()))
    .filter(g => {
      if (activeTab === "hot") return g.hot;
      if (activeTab === "new") return g.isNew;
      if (activeTab === "fav") return favorites.includes(g.id);
      return true;
    });

  const totalPages = Math.ceil(filtered.length / GAMES_PER_PAGE);
  const displayed = filtered.slice((currentPage - 1) * GAMES_PER_PAGE, currentPage * GAMES_PER_PAGE);

  const handleProviderChange = (p) => { setActiveProvider(p); setCurrentPage(1); };
  const handleTabChange = (t) => { setActiveTab(t); setCurrentPage(1); };

  return (
    <section ref={sectionRef} id="games" style={{ background: "#0A031E", padding: "40px 0 60px", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>

        {/* Section Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 900, margin: 0 }}>
              🎮 {t.allGames}
            </h2>
            <p style={{ color: "#6B5F8A", fontSize: 13, margin: "4px 0 0" }}>{GAMES.length}+ {t.gamesAvailable}</p>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4, border: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              ["all", t.tabs.all],
              ["hot", t.tabs.hot],
              ["new", t.tabs.new],
              ["fav", t.tabs.fav]
            ].map(([key, label]) => (
              <button key={key} onClick={() => handleTabChange(key)} style={{
                background: activeTab === key ? "linear-gradient(135deg,#E91E8C,#9B2BFF)" : "transparent",
                border: "none", color: activeTab === key ? "#fff" : "#6B5F8A",
                padding: "7px 14px", borderRadius: 8, fontSize: 12,
                fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
              }}>{label}</button>
            ))}
          </div>
        </div>

        {/* Provider Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
          <button style={{ flexShrink: 0, width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", cursor: "pointer", fontSize: 16 }}>‹</button>

          {PROVIDERS.map(p => (
            <button key={p} onClick={() => handleProviderChange(p)} style={{
              flexShrink: 0, padding: "7px 16px", borderRadius: 999,
              fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
              background: activeProvider === p ? "linear-gradient(135deg,#E91E8C,#9B2BFF)" : "rgba(255,255,255,0.05)",
              color: activeProvider === p ? "#fff" : "#8A80A8",
              border: activeProvider === p ? "none" : "1px solid rgba(255,255,255,0.08)",
              boxShadow: activeProvider === p ? "0 4px 16px rgba(233,30,140,0.3)" : "none",
            }}>{p}</button>
          ))}

          <button style={{ flexShrink: 0, width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", cursor: "pointer", fontSize: 16 }}>›</button>

          {/* Search */}
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
            {showSearch && (
              <input
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                style={{
                  background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 8, padding: "7px 14px", color: "#fff",
                  fontSize: 13, outline: "none", width: 180,
                }}
              />
            )}
            <button onClick={() => { setShowSearch(s => !s); if (showSearch) setSearch(""); }} style={{
              width: 36, height: 36, borderRadius: "50%",
              background: showSearch ? "rgba(233,30,140,0.2)" : "rgba(255,255,255,0.07)",
              border: showSearch ? "1px solid rgba(233,30,140,0.4)" : "1px solid rgba(255,255,255,0.08)",
              color: "#fff", cursor: "pointer", fontSize: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>🔍</button>
          </div>
        </div>

        {/* Game Grid */}
        {displayed.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#6B5F8A" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎰</div>
            <p style={{ fontSize: 16, fontWeight: 600 }}>{t.noGames}</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 14 }}>
            {displayed.map(game => (
              <GameCard
                key={game.id} game={game}
                isFav={favorites.includes(game.id)}
                onFavToggle={toggleFav}
                onPlay={setPlayingGame}
                language={language}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 40, flexWrap: "wrap" }}>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                width: 36, height: 36, borderRadius: "50%", border: "none",
                background: "rgba(255,255,255,0.08)", color: "#fff", cursor: "pointer",
                opacity: currentPage === 1 ? 0.3 : 1, fontSize: 16,
              }}>‹</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} style={{
                width: 36, height: 36, borderRadius: "50%", border: "none",
                background: currentPage === i + 1 ? "linear-gradient(135deg,#E91E8C,#9B2BFF)" : "rgba(255,255,255,0.08)",
                color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
                boxShadow: currentPage === i + 1 ? "0 4px 14px rgba(233,30,140,0.35)" : "none",
                transition: "all 0.2s",
              }}>{i + 1}</button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                width: 36, height: 36, borderRadius: "50%", border: "none",
                background: "rgba(255,255,255,0.08)", color: "#fff", cursor: "pointer",
                opacity: currentPage === totalPages ? 0.3 : 1, fontSize: 16,
              }}>›</button>
          </div>
        )}
      </div>

      {/* Game Modal */}
      {playingGame && (
        <div
          onClick={() => setPlayingGame(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
            zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(8px)",
          }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#0F0626", border: "1px solid rgba(233,30,140,0.3)",
            borderRadius: 20, padding: 32, maxWidth: 400, width: "90%",
            textAlign: "center", fontFamily: "'Segoe UI', sans-serif",
            boxShadow: "0 0 60px rgba(233,30,140,0.2)",
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎰</div>
            <h3 style={{ color: "#fff", margin: "0 0 8px", fontSize: 22, fontWeight: 900 }}>{playingGame.name}</h3>
            <p style={{ color: "#9B2BFF", margin: "0 0 24px", fontWeight: 700 }}>{playingGame.provider}</p>
            <p style={{ color: "#B0A8C8", fontSize: 14, marginBottom: 28 }}>
              {t.gameStart}
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button style={{
                flex: 1, background: "linear-gradient(135deg,#E91E8C,#9B2BFF)",
                border: "none", color: "#fff", padding: "12px",
                borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: "pointer",
              }}>{t.playNow}</button>
              <button onClick={() => setPlayingGame(null)} style={{
                flex: 1, background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)", color: "#fff",
                padding: "12px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer",
              }}>{t.close}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────
// FLOATING SOCIAL
// ─────────────────────────────────────────────
function FloatingSocial() {
  return (
    <div style={{ position: "fixed", right: 14, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 8, zIndex: 500 }}>
      {SOCIAL.map(s => (
        <button key={s.label} title={s.label} style={{
          width: 42, height: 42, borderRadius: "50%",
          background: s.color, border: "none", color: "#fff",
          fontSize: s.icon === "f" ? 18 : 16, fontWeight: 900,
          cursor: "pointer", boxShadow: `0 4px 16px ${s.color}55`,
          transition: "transform 0.15s, box-shadow 0.15s",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.15)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}>
          {s.icon}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// MODAL (Login / Register)
// ─────────────────────────────────────────────
function Modal({ type, onClose }) {
  const { language } = useLanguage();
  const [form, setForm] = useState({ phone: "", password: "", confirm: "" });
  const isLogin = type === "login";

  const modalText = {
    bn: {
      loginTitle: 'লগইন করুন',
      loginSub: 'আপনার অ্যাকাউন্টে প্রবেশ করুন',
      registerTitle: 'রেজিস্ট্রেশন',
      registerSub: 'নতুন অ্যাকাউন্ট তৈরি করুন',
      phone: 'ফোন নম্বর',
      password: 'পাসওয়ার্ড',
      confirm: 'পাসওয়ার্ড নিশ্চিত করুন',
      loginBtn: 'লগইন',
      registerBtn: 'অ্যাকাউন্ট তৈরি করুন',
      noAccount: 'অ্যাকাউন্ট নেই?',
      hasAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
      register: 'রেজিস্ট্রেশন করুন',
    },
    en: {
      loginTitle: 'Login',
      loginSub: 'Enter your account',
      registerTitle: 'Registration',
      registerSub: 'Create new account',
      phone: 'Phone Number',
      password: 'Password',
      confirm: 'Confirm Password',
      loginBtn: 'Login',
      registerBtn: 'Create Account',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      register: 'Register',
    }
  };

  const t = modalText[language];

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(10px)", fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "linear-gradient(145deg,#0F0626,#1a0840)",
        border: "1px solid rgba(233,30,140,0.25)", borderRadius: 24,
        padding: 36, width: "90%", maxWidth: 380,
        boxShadow: "0 0 80px rgba(233,30,140,0.15)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎰</div>
          <h2 style={{ color: "#fff", margin: 0, fontSize: 24, fontWeight: 900 }}>{isLogin ? t.loginTitle : t.registerTitle}</h2>
          <p style={{ color: "#6B5F8A", fontSize: 13, margin: "6px 0 0" }}>{isLogin ? t.loginSub : t.registerSub}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            placeholder={t.phone}
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none" }}
          />
          <input
            type="password" placeholder={t.password}
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none" }}
          />
          {!isLogin && (
            <input
              type="password" placeholder={t.confirm}
              value={form.confirm}
              onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none" }}
            />
          )}
          <button style={{
            background: "linear-gradient(135deg,#E91E8C,#9B2BFF)",
            border: "none", color: "#fff", padding: "14px",
            borderRadius: 12, fontSize: 15, fontWeight: 800,
            cursor: "pointer", boxShadow: "0 6px 24px rgba(233,30,140,0.35)",
            marginTop: 4,
          }}>
            {isLogin ? t.loginBtn : t.registerBtn}
          </button>
        </div>

        <p style={{ color: "#6B5F8A", fontSize: 12, textAlign: "center", marginTop: 20 }}>
          {isLogin ? t.noAccount : t.hasAccount}
          <span style={{ color: "#E91E8C", cursor: "pointer", fontWeight: 700, marginLeft: 4 }} onClick={onClose}>
            {isLogin ? t.register : t.loginBtn}
          </span>
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────
export default function Home() {
  const [modal, setModal] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0A031E" }}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0A031E; }
        ::-webkit-scrollbar-thumb { background: #E91E8C44; border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: #E91E8C88; }

        @keyframes floatImage {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(0.8deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes particlePulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.8); }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <Ticker />
      <Hero />
      <StatsBar />
      <GamesSection />
      <FloatingSocial />

      {modal && <Modal type={modal} onClose={() => setModal(null)} />}
    </div>
  );
}