// src/components/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

// 👇 Add response type
type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 👇 Add type here
      const res = await API.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border"
      />
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </form>
  );
}
