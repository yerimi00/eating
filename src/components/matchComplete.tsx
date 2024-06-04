import React from 'react';
import { CONDITIONLOCATION } from '../constants';

interface MatchCompleteProps {
  mate: { name: string; location: number };
  handleCancel: () => void;
}

const getLocationName = (idx: number) => {
  if(idx === 3) {
    const randomIndex = Math.floor(Math.random() * 3);
    return CONDITIONLOCATION[randomIndex];
  }
  return CONDITIONLOCATION[idx];
}

const MatchComplete: React.FC<MatchCompleteProps> = ({ mate, handleCancel }) => {
  const locationName = getLocationName(mate.location);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className='flex flex-col items-center justify-center p-6 border border-button rounded-lg shadow-md mb-6 mt-24'>
        <p className="text-xl font-bold text-gray-700 mb-4">{`${mate.name} 님과 매칭되었어요!`}</p>
        <p className="text-lg font-bold text-gray-700 mb-2">{`${mate.name} 님은`}</p>
        <p className="text-lg font-bold text-button mb-2">{`'${locationName}'`}</p>
        <p className="text-lg font-bold text-gray-700 mb-2">{`앞에서 기다리고 있습니다.`}</p>
      </div>
      <button
        className="bg-button text-white font-semibold tracking-wider py-4 mt-32 mb-4 rounded w-full"
        onClick={handleCancel}
      >
        매칭 완료
      </button>
      <button
        className="bg-button text-white font-semibold tracking-wider py-4  rounded w-full"
        onClick={handleCancel}
      >
        취소하기
      </button>
    </div>
  );
};

export default MatchComplete;
