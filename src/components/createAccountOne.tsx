import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

interface CreateAccountProps {
  onNext: () => void; 
}

const CreateAccount: React.FC<CreateAccountProps> = ({ onNext }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { 
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) return;
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      console.log(credentials.user);
    } catch (error) {
      // alert((error as any).message);
    } finally {
      setIsLoading(false);
      onNext();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-6 text-center">계정 생성</h2>
        <div className="mb-4">
          <label className="block text-gray-700">학교이메일(Email)</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            placeholder="ex) 202412345@hufs.ac.kr"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">비밀번호</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          value={isLoading? "Loading..." : "Create Account"}
          className="bg-orange-500 text-white py-2 px-4 rounded w-full"
        >
          다음
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;