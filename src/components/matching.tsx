import React from 'react';

interface MatchingProps {
  handleCancel: () => void;
}

const Matching: React.FC<MatchingProps> = ({ handleCancel }) => {
  return (
    <div className="flex min-h-screen bg-white p-8">
      <div className='flex flex-col items-center justify-center bg-white w-full'>
      <div className='flex items-center justify-center mt-10'>
        </div>
        <h1 className="mb-4">학식 메이트를 매칭중이에요!</h1>
        <div className="loader mb-4"></div>
        <button
          className="bg-button text-white font-semibold tracking-wider py-4 rounded w-full"
          onClick={handleCancel}
        >
          취소하기
        </button>
      </div>
    </div>
  );
};

export default Matching;
