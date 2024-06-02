import React from 'react';
import { CONDITIONGENDER, CONDITIONGRADE, CONDITIONLOCATION } from '../constants';

interface MatchConditionsProps {
  gender: number;
  setGender: (gender: number) => void;
  location: number;
  setLocation: (location: number) => void;
  grade: number;
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
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">성별</label>
        <div className="flex space-x-2">
          {CONDITIONGENDER.map((conditionGender, idx) => (
            <button
              className={`flex-1 p-2 border rounded ${gender === idx? 'bg-gray-200' : ''}`}
              onClick={() => setGender(idx)}
            >
              {conditionGender}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">장소</label>
        <div className="flex space-x-2">
          {CONDITIONLOCATION.map((conditionLocation, idx) => (
            <button
            className={`flex-1 p-2 border rounded ${location === idx? 'bg-gray-200' : ''}`}
            onClick={() => setLocation(idx)}
            >
            {conditionLocation}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">학년</label>
        <div className="flex space-x-2">
          {CONDITIONGRADE.map((conditionGrade, idx) => (
            <button
            className={`flex-1 p-2 border rounded ${grade === idx? 'bg-gray-200' : ''}`}
            onClick={() => setGrade(idx)}
            >
              {conditionGrade}
            </button>
          ))}
        </div>
      </div>
      <button
        className="w-full bg-orange-400 text-white py-2 rounded"
        onClick={handleMatch}
      >
        매칭하기
      </button>
    </>
  );
};

export default MatchConditions;
