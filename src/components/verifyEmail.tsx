import React, { useState } from 'react';
import { sendEmailVerification } from "firebase/auth";
import { auth } from '../firebase';

interface CreateAccountProps {
  onNext: () => void; 
}

const VerifyEmail: React.FC<CreateAccountProps> = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userVerified, setUserVerified] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "") return;

    setIsLoading(true);
    setMessage("");
    try {
      const user = auth.currentUser;
      if (user && user.email === email) {
        await sendEmailVerification(user);
        setMessage("Verification email sent. Please check your inbox.");
      } else {
        setMessage("No user found with this email address.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onClick = async() => {
    const user = auth.currentUser;
    if (!user) {
      setMessage("No user signed in.");
      return;
    }

    await user.reload();
    setUserVerified(user.emailVerified); 
    
    if (userVerified) {
      onNext(); 
    } else {
      setMessage("Please verify your email before proceeding."); 
    }
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-6 text-center">이메일 인증</h2>
        <div className="mb-4">
          <label className="block text-gray-700">이메일</label>
          <input
            type="email"
            value={email}
            onChange={onChange}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            placeholder="이메일을 입력하세요"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          {isLoading ? "Loading..." : "인증 이메일 보내기"}
        </button>
        {message && (
          <p className="mt-4 text-center text-gray-700">{message}</p>
        )}
      </form>
      <button onClick={onClick} className='bg-blue-500 text-white mt-4 py-2 px-4 rounded w-full'>
        다음
      </button>
    </div>
  );
};

export default VerifyEmail;


