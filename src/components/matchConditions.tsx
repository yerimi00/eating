import React from 'react';
import { CONDITIONGENDER, CONDITIONGRADE, CONDITIONLOCATION } from '../constants';

interface MatchConditionsProps {
  gender: number | null;
  setGender: (gender: number) => void;
  location: number | null;
  setLocation: (location: number) => void;
  grade: number | null;
  setGrade: (grade: number) => void;
  handleMatch: () => void;
}

const MatchConditions: React.FC<MatchConditionsProps> = ({
  gender,
  setGender,
  location,
  setLocation,
  grade,
  setGrade,
  handleMatch
}) => {
  return (
    <>
      <div className="mb-5 mt-6">
        <label className="block text-sm font-semibold text-gray-600 tracking-wide">성별</label>
        <div className="grid grid-cols-2 gap-3">
          {CONDITIONGENDER.map((conditionGender, idx) => (
            <button
              type="button"
              key={conditionGender}
              onClick={() => setGender(idx)}
              className={`p-3.5 border  rounded text-sm  ${
                idx === 2 ? "col-span-2" : ""
              } ${
                gender === idx
                  ? "border-loginSignupBt bg-loginSignupBt text-white"
                  : " border-gray-300 bg-white text-gray-400"
              }`}
            >
              {conditionGender}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <label className="block text-gray-700 mb-2">장소</label>
        <div className="grid grid-cols-2 gap-4">
          {CONDITIONLOCATION.map((conditionLocation, idx) => (
            <button
            type="button"
            key={conditionLocation}
            onClick={() => setLocation(idx)}
            className={`p-3.5 border  rounded text-sm 
            ${location === idx
                ? "border-loginSignupBt bg-loginSignupBt text-white"
                : " border-gray-300 bg-white text-gray-400"
            }`}
            >
            {conditionLocation}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <label className="block text-gray-700 mb-2">학년</label>
        <div className="grid grid-cols-2 gap-4">
          {CONDITIONGRADE.map((conditionGrade, idx) => (
            <button
            type="button"
            key={conditionGrade}
            onClick={() => setGrade(idx)}
            className={`p-3.5 border  rounded text-sm 
            ${grade === idx
                ? "border-loginSignupBt bg-loginSignupBt text-white"
                : " border-gray-300 bg-white text-gray-400"
            }`}
            >
              {conditionGrade}
            </button>
          ))}
        </div>
      </div>
      <button
        className="bg-button text-white font-semibold tracking-wider py-4  rounded w-full"
        onClick={handleMatch}
      >
        매칭하기
      </button>
    </>
  );
};

export default MatchConditions;
