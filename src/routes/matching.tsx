import { useState } from "react";
import Home from "./home";
import InputCondition from "../components/inputCondition";

export default function Matching() {
  const [step, setStep] = useState(1);
  
  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const renderComponent = () => {
    switch(step) {
      case 1:
        return <InputCondition onNext={nextStep} />;
    //   case 2:
    //     return <VerifyEmail onNext={nextStep} />;
    //   case 3:
    //     return <PersonalInfoForm onNext={nextStep} />;
    //   case 4:
    //     return <Home />;
      default:
        return null;
    }
  };

  return (
    <div>
    {renderComponent()}
  </div>
  );  
}
