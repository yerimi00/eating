import React from 'react';
import { Navigate } from 'react-router-dom';

const Menu: React.FC = () => {
  const handleLogoOnClick = () => {
    Navigate("/home");
}
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-col">
        <div className="items-center justify-center">
          <img onClick= {handleLogoOnClick} src="/images/subLogo.png" alt="Logo" className="w-40 h-20" />
        </div>  
        <div className="">학식 메뉴 확인</div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-40 h-64 border-2 border-loginSignupBt shadow-md bg-white text-black py-2 px-4 rounded-md mb-4">까르보네</div>
          <div className="w-40 h-64 border-2 border-loginSignupBt shadow-md bg-white text-black py-2 px-4 rounded-md">학생 식당</div>
        </div>
      </div>
    </div>
  );
};

export default Menu;