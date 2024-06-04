import React from 'react';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
    const navigate = useNavigate();

    const handleMatchingOnClick = () => {
        navigate("/matchMate");
    }

    const handleMenuOnClick = () => {
        navigate("/menu");
    }

    const handleProfileOnClick = () => {
        navigate("/profile");
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="mb-10">
      <img src="/images/mainLogo.png" alt="Logo" className="w-64 h-64" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <button onClick={handleMatchingOnClick} className="w-64 shadow-md bg-loginSignupBt text-white py-2 px-4 rounded-md mb-4">
          매칭 시작하기
        </button>
        <button onClick={handleMenuOnClick} className="w-64 shadow-md bg-loginSignupBt text-white py-2 px-4 rounded-md mb-4">
          오늘의 메뉴
        </button>
        <button onClick={handleProfileOnClick} className="w-64 shadow-md bg-loginSignupBt text-white py-2 px-4 rounded-md font-semibold">
          내 정보
        </button>
      </div>
    </div>
  );
}

export default App;
