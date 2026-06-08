/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSelect, TweakToggle */

const IDST_TWEAKS = /*EDITMODE-BEGIN*/{
  "hero": "spotlight",
  "accent": "#C49B4C",
  "displayFont": "Cormorant Garamond",
  "warmth": "black",
  "cinematic": true
}/*EDITMODE-END*/;

const ACCENTS = {
  "#C49B4C": "#E3C375", // gold
  "#ECD9AE": "#F6ECCF", // champagne
  "#C42B3F": "#D2566A", // crimson
};

function brightOf(hex) { return ACCENTS[hex] || "#E3C375"; }

function TweaksApp() {
  const [t, setTweak] = useTweaks(IDST_TWEAKS);

  React.useEffect(() => {
    document.body.setAttribute("data-hero", t.hero);
  }, [t.hero]);

  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--accent", t.accent);
    r.style.setProperty("--accent-br", brightOf(t.accent));
  }, [t.accent]);

  React.useEffect(() => {
    document.documentElement.style.setProperty(
      "--display",
      `"${t.displayFont}", "Times New Roman", serif`
    );
  }, [t.displayFont]);

  React.useEffect(() => {
    document.body.setAttribute("data-warmth", t.warmth);
    const r = document.documentElement;
    if (t.warmth === "wine") {
      r.style.setProperty("--ink", "#0C0608");
      r.style.setProperty("--ink-2", "#160A0E");
      r.style.setProperty("--ink-3", "#221014");
    } else {
      r.style.setProperty("--ink", "#0A0706");
      r.style.setProperty("--ink-2", "#130D0B");
      r.style.setProperty("--ink-3", "#1C1411");
    }
  }, [t.warmth]);

  React.useEffect(() => {
    document.documentElement.classList.toggle("no-motion", !t.cinematic);
  }, [t.cinematic]);

  return (
    <TweaksPanel>
      <TweakSection label="Hero direction" />
      <TweakRadio
        label="Banner style"
        value={t.hero}
        options={["spotlight", "editorial", "kinetic"]}
        onChange={(v) => setTweak("hero", v)}
      />
      <TweakSection label="Palette" />
      <TweakColor
        label="Accent"
        value={t.accent}
        options={Object.keys(ACCENTS)}
        onChange={(v) => setTweak("accent", v)}
      />
      <TweakRadio
        label="Backdrop"
        value={t.warmth}
        options={["black", "wine"]}
        onChange={(v) => setTweak("warmth", v)}
      />
      <TweakSection label="Type & motion" />
      <TweakSelect
        label="Display font"
        value={t.displayFont}
        options={["Cormorant Garamond", "Spectral", "Playfair Display"]}
        onChange={(v) => setTweak("displayFont", v)}
      />
      <TweakToggle
        label="Cinematic motion"
        value={t.cinematic}
        onChange={(v) => setTweak("cinematic", v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<TweaksApp />);
