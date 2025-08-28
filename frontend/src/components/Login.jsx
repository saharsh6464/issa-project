import { useRef, useContext, useState, useEffect } from "react";
import { useDataContext } from "../store/DataContext";
import { login } from "../store/api/api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { token, login: contextLogin ,email,setEmail} = useDataContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) {
      // If token exists, navigate to the desired route
      navigate("/questions"); // Redirect to questions page after login
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        try {
            const response = await login(emailRef.current.value, passwordRef.current.value);
            const bearerToken = response.data; // Adjust based on your API response structure
            setEmail(emailRef.current.value);
            contextLogin(bearerToken);
            console.log(bearerToken);
        } catch (err) {
            console.error('Login failed:', err);
            setError('Invalid email or password. Please try again.');
        }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">
          Login to Your Account
        </h2>
        {error && (
          <div className="p-4 text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              required
              className="w-full px-3 py-2 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                ref={passwordRef}
                required
                className="w-full px-3 py-2 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
