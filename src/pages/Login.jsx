import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
  const demoEmail = "manager.demo@scrapyard.local";
  const demoPassword = "ChangeMe123!";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const res = await loginUser(email, password);

      // Single source of truth
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          token: res.token,
          username: res.username,
          email: res.email,
          businessName: res.businessName || "Your Business",
        }),
      );

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const useDemoAccount = () => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
    setInfo("Demo credentials filled.");
  };

  const copyToClipboard = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value);
      setInfo(`${label} copied.`);
    } catch {
      setInfo(`Could not copy ${label.toLowerCase()}.`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light container-fluid">
      <div
        className="card shadow-sm p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-dark" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </div>
          {error && (
            <div className="alert alert-danger mt-3 mb-0 py-2">{error}</div>
          )}
        </form>

        <div className="border rounded p-3 mt-3 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Demo Access</strong>
            <button
              type="button"
              className="btn btn-sm btn-outline-dark"
              onClick={useDemoAccount}
            >
              Use Demo Account
            </button>
          </div>
          <div className="small text-muted mb-2">
            Use these demo credentials to login:
          </div>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <code>{demoEmail}</code>
            <button
              type="button"
              className="btn btn-sm btn-link text-decoration-none p-0"
              onClick={() => copyToClipboard(demoEmail, "Email")}
            >
              Copy
            </button>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <code>{demoPassword}</code>
            <button
              type="button"
              className="btn btn-sm btn-link text-decoration-none p-0"
              onClick={() => copyToClipboard(demoPassword, "Password")}
            >
              Copy
            </button>
          </div>
          {info && <div className="small text-success mt-2">{info}</div>}
        </div>
      </div>
    </div>
  );
}
