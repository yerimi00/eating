import React from 'react';

const LoginSignup: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center">
        <div className="">
          <img src="/images/mainLogo.png" alt="Logo" className="w-64 h-64" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <button className="w-64 shadow-md bg-loginSignupBt text-white py-2 px-4 rounded-md mb-4">로그인</button>
          <button className="w-64 shadow-md bg-loginSignupBt text-white py-2 px-4 rounded-md">회원가입</button>
        </div>
        <div className="flex justify-between mt-5 w-64 text-gray-500">
          <a href="#" className="hover:underline ml-4">아이디찾기</a>
          <span>|</span>
          <a href="#" className="hover:underline mr-4">비밀번호 찾기</a>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
