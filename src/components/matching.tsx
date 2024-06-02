import React from 'react';

interface MatchingProps {
  handleCancel: () => void;
}

const Matching: React.FC<MatchingProps> = ({ handleCancel }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-4">학식 메이트를 매칭중이에요!</p>
      <div className="loader mb-4"></div>
      <button
        className="w-full bg-orange-400 text-white py-2 rounded"
        onClick={handleCancel}
      >
        취소하기
      </button>
    </div>
  );
};

export default Matching;
