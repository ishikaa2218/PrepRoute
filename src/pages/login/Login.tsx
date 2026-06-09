import '../login/Login.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import logo from '../../assets/images/logo.png';
import illustration from '../../assets/images/testtube-login.png';

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!userId.trim()) {
      setError("User ID is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser(userId, password);
      localStorage.setItem("token", response.data.token);
      console.log("LOGIN RESPONSE", response);
      
      navigate('/dashboard');

      console.log(response.data.token)


      setUserId("")
      setPassword("")
    } catch (error: any) {
  console.log("LOGIN ERROR:", error);
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);

  setError(
    error.response?.data?.message ||
    "Invalid Credentials"
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="row g-0 h-100">
        {/* Left Illustration */}
        <div className="col-lg-6 login-left">
          <img src={illustration} alt="illustration" className="login-illustration" />
        </div>
        {/* Right Form */}
        <div className="col-lg-6 login-right">
          <div className="login-card">
            <img src={logo} alt="logo" className="login-logo" />
            <h2 className="login-title">
              Login
            </h2>
            <p className="login-subtitle">
              Use your company provided Login
              credentials
            </p>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="form-label login-label">
                  User ID
                </label>
                <input type="text" className="form-control login-input" placeholder="Enter User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label login-label">
                  Password
                </label>
                <input type="password" className="form-control login-input" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="forgot-wrapper">
                <a href="#">
                  Forgot password?
                </a>
              </div>

              {error && (
                <div className="alert alert-danger mt-3">
                  {error}
                </div>
              )}

              <button type="submit" className="btn login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;