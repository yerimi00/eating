import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Button from "./button";
import CreateInput from "./createAccountInput";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleOnClick = () => {
    navigate("/loginSignup");
  }

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
      navigate("/home");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center justify-center mt-16">
        <img onClick={handleOnClick} src="/images/subLogo.png" alt="Logo" className="w-48 h-24" />
      </div>
      <h1 className="text-2xl mt-20 mb-6 text-gray-500 ml-6">로그인</h1>
      <form onSubmit={onSubmit} className="bg-white w-full h-screen flex flex-col pb-12 px-6">
      <CreateInput
            label="학교이메일(Email)"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            placeholder="ex)202412345@hufs.ac.kr"
          />
      <CreateInput
            label="비밀번호"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            placeholder="비밀번호"
          />
        <Button name={isLoading ? "Loading..." : "로그인하기"} />
      </form>
      {error && <span className="font-semibold text-red-500 mt-3">{error}</span>}
    </div>
  );
};

export default Login;
