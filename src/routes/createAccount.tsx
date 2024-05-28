import { useState } from "react";
import CreateAccountOne from "../components/createAccountOne";

export default function CreateAccount() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div>
      {currentPage == 1 ? <CreateAccountOne /> : <CreateAccountTwo/>}
    </div>
  );  
}

