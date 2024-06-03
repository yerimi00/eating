import React, { useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";
import CreateHeader from "./createAccountHeader";

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

  const onClick = async () => {
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
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-white">
      <div className="bg-white w-full h-screen flex flex-col justify-between pt-32 pb-12 px-6 ">
        <form onSubmit={onSubmit}>
          <div>
            <CreateHeader sequence={2} title="학교인증하기" />

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-600 tracking-wide">
                학교이메일(Email)
              </label>
              <div className="flex w-full mt-3">
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={onChange}
                  className=" p-3.5 text-sm border border-gray-300 rounded w-full"
                  placeholder="ex)202412345@hufs.ac.kr"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="ml-5 bg-loginSignupBt text-sm text-white py-2  rounded w-32"
                >
                  {isLoading ? "Loading..." : "인증하기"}
                </button>
              </div>
            </div>
          </div>

          {message && (
            <p className="mt-4 text-center text-gray-700">{message}</p>
          )}
        </form>

        <button
          onClick={onClick}
          className="bg-loginSignupBt text-white font-semibold tracking-wider py-4  rounded w-full"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
