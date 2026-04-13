import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../UserStyles/Form.css";

/* ── Same useTheme hook as Navbar ── */
function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  return { theme, toggleTheme };
}

/* ── Same ThemeToggle component as Navbar ── */
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
      {/* Sun — visible in dark mode */}
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

      {/* Moon — visible in light mode */}
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

      {/* Sliding thumb */}
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

function Register() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const registerSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    // Name Validation
    if (!name) {
      newErrors.name = "Name is required";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email Validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    // Password Validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must contain 8 characters, uppercase, lowercase, number & special character";
    }

    // Confirm Password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Registration Successful");
    }
  };

  return (
    <div
      className="form-container"
      style={{
        backgroundColor: isDark ? "#0f172a" : "#f6f3f3",
        transition: "background-color 0.3s ease",
      }}
    >
      <div
        className="form-content"
        style={{
          backgroundColor: isDark ? "#1e293b" : "rgb(246, 243, 243)",
          boxShadow: isDark
            ? "0 8px 32px rgba(0,0,0,0.4)"
            : "0 8px 15px rgba(0,0,0,0.1)",
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {/* ── Theme Toggle Row ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "8px",
            marginBottom: "16px",
            width: "100%",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: isDark ? "#94a3b8" : "#64748b",
              transition: "color 0.3s ease",
            }}
          >
            {isDark ? "Dark Mode" : "Light Mode"}
          </span>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <form onSubmit={registerSubmit} className="form">
          <h2
            style={{
              color: "var(--primary-main)",
            }}
          >
            Create Account
          </h2>

          {/* Name */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "input-error" : ""}
              style={{
                backgroundColor: isDark ? "#0f172a" : "#ffffff",
                color: isDark ? "#f1f5f9" : "#1e293b",
                borderColor: errors.name
                  ? "#ef4444"
                  : isDark
                  ? "#334155"
                  : "#ccc",
                transition: "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
              }}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "input-error" : ""}
              style={{
                backgroundColor: isDark ? "#0f172a" : "#ffffff",
                color: isDark ? "#f1f5f9" : "#1e293b",
                borderColor: errors.email
                  ? "#ef4444"
                  : isDark
                  ? "#334155"
                  : "#ccc",
                transition: "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
              }}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "input-error" : ""}
              style={{
                backgroundColor: isDark ? "#0f172a" : "#ffffff",
                color: isDark ? "#f1f5f9" : "#1e293b",
                borderColor: errors.password
                  ? "#ef4444"
                  : isDark
                  ? "#334155"
                  : "#ccc",
                transition: "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
              }}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? "input-error" : ""}
              style={{
                backgroundColor: isDark ? "#0f172a" : "#ffffff",
                color: isDark ? "#f1f5f9" : "#1e293b",
                borderColor: errors.confirmPassword
                  ? "#ef4444"
                  : isDark
                  ? "#334155"
                  : "#ccc",
                transition: "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
              }}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>

          <button className="authBtn" type="submit">
            Sign Up
          </button>

          <p
            className="form-links"
            style={{ color: isDark ? "#94a3b8" : "#555" }}
          >
            Already have account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;