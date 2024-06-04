import React from 'react';

interface MatchingProps {
  handleCancel: () => void;
}

const Matching: React.FC<MatchingProps> = ({ handleCancel }) => {
  return (
    <div className="bg-white">
      <div className='flex flex-col items-center justify-center bg-white w-full'>
        <h1 className="text-xl font-bold text-gray-700 mt-24 mb-5">학식 메이트를 매칭중이에요!</h1>
        <div className="loader mt-5 mb-5"></div>
        <button
          className="bg-button text-white font-semibold tracking-wider mt-72 py-4 rounded w-full"
          onClick={handleCancel}
        >
          취소하기
        </button>
      </div>
    </div>
  );
};

export default Matching;
