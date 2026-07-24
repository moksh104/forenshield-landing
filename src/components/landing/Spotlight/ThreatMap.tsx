import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

/* World topojson served from unpkg CDN */
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type ThreatMarker = {
  name: string;
  coords: [number, number]; // [lon, lat]
  category: "malware" | "phishing" | "breach" | "ransomware";
};

const THREAT_MARKERS: ThreatMarker[] = [
  { name: "New York",  coords: [-74.0,  40.7], category: "malware" },
  { name: "São Paulo", coords: [-46.6, -23.5], category: "phishing" },
  { name: "London",    coords: [ -0.1,  51.5], category: "breach" },
  { name: "Lagos",     coords: [  3.4,   6.5], category: "ransomware" },
  { name: "Moscow",    coords: [ 37.6,  55.7], category: "ransomware" },
  { name: "Mumbai",    coords: [ 72.8,  19.0], category: "phishing" },
  { name: "Beijing",   coords: [116.4,  39.9], category: "malware" },
  { name: "Sydney",    coords: [151.2, -33.8], category: "breach" },
];

const CATEGORY: Record<ThreatMarker["category"], { color: string; label: string }> = {
  malware:    { color: "#EF4444", label: "Malware" },
  phishing:   { color: "#F59E0B", label: "Phishing" },
  breach:     { color: "#3B82F6", label: "Data Breach" },
  ransomware: { color: "#A855F7", label: "Ransomware" },
};

export function ThreatMap() {
  // Lazy-load react-simple-maps to keep this route's initial bundle lean.
  const [Maps, setMaps] = useState<null | typeof import("react-simple-maps")>(null);
  useEffect(() => {
    let cancelled = false;
    import("react-simple-maps").then((m) => {
      if (!cancelled) setMaps(m);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative h-full rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[oklch(0.14_0.03_260)] to-[oklch(0.08_0.02_260)]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" />
          <span className="text-white font-semibold text-sm tracking-wide">
            LIVE THREAT MAP
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 border border-success/30 px-2 py-0.5 text-[10px] font-mono text-success">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-success/70 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          <span className="animate-pulse-glow">LIVE</span>
        </span>
      </div>

      <div className="relative aspect-[16/9] bg-[radial-gradient(ellipse_at_center,oklch(0.20_0.05_260/0.5),transparent_70%)]">
        {Maps ? (
          <Maps.ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 155 }}
            style={{ width: "100%", height: "100%" }}
          >
            <Maps.Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Maps.Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className="map-region focus:outline-none"
                  />
                ))
              }
            </Maps.Geographies>

            {THREAT_MARKERS.map((m, i) => {
              const c = CATEGORY[m.category].color;
              return (
                <Maps.Marker key={m.name} coordinates={m.coords}>
                  {/* outer ping ring */}
                  <circle
                    r={9}
                    fill={c}
                    fillOpacity={0.18}
                    stroke={c}
                    strokeOpacity={0.5}
                    strokeWidth={0.7}
                  >
                    <animate attributeName="r" from="4" to="14" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.9" to="0" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                  </circle>
                  {/* mid halo */}
                  <circle r={4.5} fill={c} fillOpacity={0.25} />
                  {/* core dot */}
                  <circle
                    r={2.4}
                    fill={c}
                    style={{ filter: `drop-shadow(0 0 4px ${c}) drop-shadow(0 0 8px ${c})` }}
                  >
                    <animate attributeName="opacity" values="1;0.55;1" dur="1.8s" repeatCount="indefinite" />
                    <title>{`${m.name} · ${CATEGORY[m.category].label}`}</title>
                  </circle>
                </Maps.Marker>
              );
            })}
          </Maps.ComposableMap>
        ) : (
          <div className="absolute inset-0 grid place-items-center text-[10px] font-mono text-muted-foreground">
            loading map…
          </div>
        )}

        {/* Attack counters overlay */}
        <div className="absolute top-3 right-3 flex gap-2 font-mono pointer-events-none">
          {[
            { c: "#EF4444", label: "ATK", n: "1,284" },
            { c: "#F59E0B", label: "PHS", n: "842" },
            { c: "#3B82F6", label: "BRC", n: "37" },
          ].map((s, i) => (
            <div key={i} className="rounded-md border border-white/10 bg-black/50 backdrop-blur px-2 py-1 text-[9px]">
              <div className="flex items-center gap-1 text-muted-foreground tracking-widest">
                <span className="h-1.5 w-1.5 rounded-full animate-blink" style={{ background: s.c, boxShadow: `0 0 6px ${s.c}` }} />
                {s.label}
              </div>
              <div className="text-white font-semibold text-[11px] leading-none mt-0.5">{s.n}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 border-t border-white/5 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
          {(Object.keys(CATEGORY) as ThreatMarker["category"][]).map((k) => {
            const { color, label } = CATEGORY[k];
            return (
              <span key={k} className="inline-flex items-center gap-1.5 text-muted-foreground">
                <span
                  className="h-2 w-2 rounded-full animate-pulse-glow"
                  style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                />
                {label}
              </span>
            );
          })}
        </div>
        <div className="text-[10px] text-muted-foreground font-mono tracking-wider">
          Live Threat Intelligence Visualization
        </div>
      </div>
    </div>
  );
}
