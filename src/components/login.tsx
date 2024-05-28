import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen w-full max-w-md mx-auto p-12">
      <h1 className="text-4xl mb-12">Log into 𝕏</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 w-full">
        <input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
          className="p-3 rounded-full border-none w-full text-lg"
        />
        <input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
          className="p-3 rounded-full border-none w-full text-lg"
        />
        <input
          type="submit"
          value={isLoading ? "Loading..." : "Log in"}
          className="p-3 rounded-full border-none w-full text-lg cursor-pointer bg-blue-500 text-white hover:opacity-80"
        />
      </form>
      {error && <span className="font-semibold text-red-500 mt-3">{error}</span>}
    </div>
  );
};

export default Login;
