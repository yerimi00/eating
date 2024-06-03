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
    <div className="flex flex-col items-center">
      <p className="mb-4">{`${mate.name} 님과 매칭되었어요!`}</p>
      <p className="mb-4">{`${mate.name} 님은 지금 '${locationName}' 앞에서 기다리고 있습니다.`}</p>
      <button
        className="w-full bg-orange-400 text-white py-2 rounded mb-2"
        onClick={handleCancel}
      >
        매칭 완료
      </button>
      <button
        className="w-full bg-orange-400 text-white py-2 rounded"
        onClick={handleCancel}
      >
        취소하기
      </button>
    </div>
  );
};

export default MatchComplete;
