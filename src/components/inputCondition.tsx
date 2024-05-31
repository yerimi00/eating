import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

interface MatchingProps {
  onNext: () => void; 
}

const InputCondition: React.FC<MatchingProps> = ({ onNext }) => {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [grade, setGrade] = useState<string | null>("");
  const [gender, setGender] = useState<string | null>("");
  const [location, setLocation] = useState<string | null>("");
  const [randomNoun, setRandomNoun] = useState('');
  const [randomAd, setRandomAd] = useState('');

  const handleGradeClick = (selectedGrade: string) => {
    setGrade(selectedGrade);
  };

  const handleGenderClick = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const handleLocationClick = (selectedLocation: string) => {
    setLocation(selectedLocation);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user || isLoading || name === "") return;
    try{
      setLoading(true);
      alert("Personal Info created successfully!");
      await addDoc(collection(db, "user"), {
        name,
        grade,
        gender,
        createdAt: Date.now(),
        userId: user?.uid,
        secretNone: randomNoun,
        secretAd: randomAd
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      onNext();
      console.log({ name, grade, gender });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded shadow-md w-96">
      <img src="/images/subLogo.png" alt="Logo" className="w-50 h-20" />
        <h2 className="text-2xl mb-6 text-center">학식 메이트 매칭하기</h2>
        <div className="mb-4">
        <div className="flex gap-2">
            {["여성", "남성", "랜덤"].map((genderOption) => (
              <button
                type="button"
                key={genderOption}
                onClick={() => handleGenderClick(genderOption)}
                className={`p-2 border rounded w-full ${
                  gender === genderOption ? "bg-orange-500 text-white" : "bg-white text-gray-700"
                }`}
              >
                {genderOption}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">장소</label>
          <div className="flex flex-wrap gap-2">
            {["어문관", "후생관", "기숙사 식당", "랜덤"].map((locationOption) => (
              <button
                type="button"
                key={locationOption}
                onClick={() => handleLocationClick(locationOption)}
                className={`p-2 border rounded w-full ${
                  location === locationOption ? "bg-orange-500 text-white" : "bg-white text-gray-700"
                }`}
              >
                {locationOption}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">학년</label>
          <div className="flex flex-wrap gap-2">
            {["1학년", "2학년", "3,4학년", "랜덤"].map((gradeOption) => (
              <button
                type="button"
                key={gradeOption}
                onClick={() => handleGradeClick(gradeOption)}
                className={`p-2 border rounded w-full ${
                  grade === gradeOption ? "bg-orange-500 text-white" : "bg-white text-gray-700"
                }`}
              >
                {gradeOption}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          value={isLoading? "Loading..." : "Input Personal Info"}
          className="bg-orange-500 text-white py-2 px-4 rounded w-full mt-4"
        >
          매칭하기
        </button>
      </form>
    </div>
  );
};

export default InputCondition;
