import { useState } from "react";
import CreateAccountOne from "../components/createAccountOne";
import VerifyEmail from "../components/verifyEmail";
import PersonalInfoForm from "../components/personalInfoForm";
import Home from "./home";

export default function CreateAccountStep() {
  const [step, setStep] = useState(1);
  
  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const renderComponent = () => {
    switch(step) {
      case 1:
        return <CreateAccountOne onNext={nextStep} />;
      case 2:
        return <VerifyEmail onNext={nextStep} />;
      case 3:
        return <PersonalInfoForm onNext={nextStep} />;
      case 4:
        return <Home />;
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

