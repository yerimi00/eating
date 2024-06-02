import React from 'react';

interface MatchConditionsProps {
  gender: string;
  setGender: (gender: string) => void;
  location: string;
  setLocation: (location: string) => void;
  grade: string;
  setGrade: (grade: string) => void;
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
          <button
            className={`flex-1 p-2 border rounded ${gender === '여성' ? 'bg-gray-200' : ''}`}
            onClick={() => setGender('여성')}
          >
            여성
          </button>
          <button
            className={`flex-1 p-2 border rounded ${gender === '남성' ? 'bg-gray-200' : ''}`}
            onClick={() => setGender('남성')}
          >
            남성
          </button>
          <button
            className={`flex-1 p-2 border rounded ${gender === '랜덤' ? 'bg-gray-200' : ''}`}
            onClick={() => setGender('랜덤')}
          >
            랜덤
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">장소</label>
        <div className="flex space-x-2">
          <button
            className={`flex-1 p-2 border rounded ${location === '어문관' ? 'bg-gray-200' : ''}`}
            onClick={() => setLocation('어문관')}
          >
            어문관
          </button>
          <button
            className={`flex-1 p-2 border rounded ${location === '후생관' ? 'bg-gray-200' : ''}`}
            onClick={() => setLocation('후생관')}
          >
            후생관
          </button>
          <button
            className={`flex-1 p-2 border rounded ${location === '기숙사 식당' ? 'bg-gray-200' : ''}`}
            onClick={() => setLocation('기숙사 식당')}
          >
            기숙사 식당
          </button>
          <button
            className={`flex-1 p-2 border rounded ${location === '랜덤' ? 'bg-gray-200' : ''}`}
            onClick={() => setLocation('랜덤')}
          >
            랜덤
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">학년</label>
        <div className="flex space-x-2">
          <button
            className={`flex-1 p-2 border rounded ${grade === '1학년' ? 'bg-gray-200' : ''}`}
            onClick={() => setGrade('1학년')}
          >
            1학년
          </button>
          <button
            className={`flex-1 p-2 border rounded ${grade === '2학년' ? 'bg-gray-200' : ''}`}
            onClick={() => setGrade('2학년')}
          >
            2학년
          </button>
          <button
            className={`flex-1 p-2 border rounded ${grade === '3,4학년' ? 'bg-gray-200' : ''}`}
            onClick={() => setGrade('3,4학년')}
          >
            3,4학년
          </button>
          <button
            className={`flex-1 p-2 border rounded ${grade === '랜덤' ? 'bg-gray-200' : ''}`}
            onClick={() => setGrade('랜덤')}
          >
            랜덤
          </button>
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
