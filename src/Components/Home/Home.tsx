// src/components/Home.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

// 👇 Define expected response shape
type UserResponse = {
  message: string;
  userId: string;
};

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get<UserResponse>("/user")
      .then((res) => setUserId(res.data.userId))
      .catch(() => setUserId(null));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserId(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Welcome to Auth App</h1>
      {userId ? (
        <>
          <p className="text-green-600">Logged in as ID: {userId}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}
