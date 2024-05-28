import { useNavigate } from "react-router-dom";

export default function StartScreen() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/loginSignup");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center">
        <div className="">
        <img src="/images/mainLogo.png" alt="Logo" className="w-64 h-64" />
        </div>
        <button onClick={handleOnClick} className="w-64 shadow-md bg-loginSignupBt text-white py-2 px-4 rounded-full">시작하기</button>
      </div>
    </div>
  );
}




