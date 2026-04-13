import React from "react";

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        width: "52px",
        height: "28px",
        borderRadius: "9999px",
        border: "none",
        cursor: "pointer",
        padding: "3px",
        transition: "background-color 0.35s ease, box-shadow 0.35s ease",
        backgroundColor: isDark ? "#f59e0b" : "rgba(245,158,11,0.15)",
        boxShadow: isDark
          ? "0 0 10px rgba(245,158,11,0.4)"
          : "inset 0 0 0 1.5px rgba(245,158,11,0.35)",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "6px",
          fontSize: "11px",
          transition: "opacity 0.25s ease",
          opacity: isDark ? 1 : 0,
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        ☀️
      </span>

      <span
        style={{
          position: "absolute",
          right: "6px",
          fontSize: "11px",
          transition: "opacity 0.25s ease",
          opacity: isDark ? 0 : 1,
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        🌙
      </span>

      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          backgroundColor: isDark ? "#0f172a" : "#ffffff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
          transform: isDark ? "translateX(24px)" : "translateX(0px)",
          transition:
            "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background-color 0.3s ease",
        }}
      />
    </button>
  );
}

export default ThemeToggle;
