import React, { useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import creativeNouns from "./noneArrayList";
import creativeAds from "./adArrayList";
import { GENDER, GRADE } from "../constants";
import CreateHeader from "./createAccountHeader";
import CreateInput from "./createAccountInput";
import Button from "./button";

interface CreateAccountProps {
  onNext: () => void;
}

const PersonalInfoForm: React.FC<CreateAccountProps> = ({ onNext }) => {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [grade, setGrade] = useState<number | null>(null);
  const [gender, setGender] = useState<number | null>(null);
  const [randomNoun, setRandomNoun] = useState("");
  const [randomAd, setRandomAd] = useState("");

  const getRandomNoun = () => {
    const randomIndex = Math.floor(Math.random() * creativeNouns.length);
    setRandomNoun(creativeNouns[randomIndex]);
  };

  const getRandomAd = () => {
    const randomIndex = Math.floor(Math.random() * creativeAds.length);
    setRandomAd(creativeAds[randomIndex]);
  };

  const handleGradeClick = (selectedGrade: number) => {
    setGrade(selectedGrade);
  };

  const handleGenderClick = (selectedGender: number) => {
    setGender(selectedGender);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    getRandomNoun();
    getRandomAd();
    const user = auth.currentUser;
    if (name === "name") {
      setName(value);
    }
    console.log(user);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user || isLoading || name === "") return;
    try {
      setLoading(true);
      alert("Personal Info created successfully!");
      const docRef = doc(db, "user", user?.uid);
      const data = {
        name,
        grade,
        gender,
        createdAt: Date.now(),
        secretNone: randomNoun,
        secretAd: randomAd,
      };
      await setDoc(docRef, data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      onNext();
      console.log({ name, grade, gender });
    }
  };

  return (
    <div className="flex  min-h-screen bg-white">
      <form
        onSubmit={onSubmit}
        className="bg-white w-full h-screen flex flex-col justify-between pt-32 pb-12 px-6 "
      >
        <div>
          <CreateHeader sequence={3} title="개인정보입력" />
          <CreateInput
            label="이름"
            name="name"
            type="text"
            value={name}
            onChange={onChange}
            placeholder="이름"
          />
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 tracking-wide mb-2">
              학년
            </label>
            <div className="grid grid-cols-2 gap-3">
              {GRADE.map((gradeOption, idx) => (
                <button
                  type="button"
                  key={gradeOption}
                  onClick={() => handleGradeClick(idx)}
                  className={`p-3.5 border  rounded text-sm  ${
                    idx === 2 ? "col-span-2" : ""
                  } ${
                    grade === idx
                      ? "border-loginSignupBt bg-loginSignupBt text-white"
                      : " border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {gradeOption}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 tracking-wide mb-2">
              성별
            </label>
            <div className="grid grid-cols-2 gap-3">
              {GENDER.map((genderOption, idx) => (
                <button
                  type="button"
                  key={genderOption}
                  onClick={() => handleGenderClick(idx)}
                  className={`p-3.5 border  rounded text-sm ${
                    gender === idx
                      ? "border-loginSignupBt bg-loginSignupBt text-white"
                      : " border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {genderOption}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button name={isLoading ? "Loading..." : "가입하기"} />
      </form>
    </div>
  );
};

export default PersonalInfoForm;
