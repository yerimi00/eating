import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Button from "./button";
import CreateHeader from "./createAccountHeader";
import CreateInput from "./createAccountInput";

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
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "" || confirmPassword === "") return;
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // alert("Account created successfully!");
      console.log(credentials.user);
    } catch (error) {
      // alert((error as any).message);
    } finally {
      setIsLoading(false);
      onNext();
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <form
        onSubmit={onSubmit}
        className="bg-white w-full h-screen flex flex-col justify-between pt-32 pb-12 px-6 "
      >
        <div>
          <CreateHeader sequence={1} title="계정 생성" />
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
          <CreateInput
            label="비밀번호 확인"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            placeholder="비밀번호 확인"
          />
        </div>
        <Button name={isLoading ? "Loading..." : "다음"} />
      </form>
    </div>
  );
};

export default CreateAccount;
