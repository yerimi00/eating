import React from "react";

interface ICreateHeaderProps {
  sequence: number;
  title: string;
}

const CreateHeader: React.FC<ICreateHeaderProps> = ({ sequence, title }) => {
  return (
    <div className="flex flex-col items-center text-gray-600 font-semibold mb-12">
      <div className="bg-loginSignupBt w-8 h-8 rounded-full flex justify-center items-center mb-3 text-sm">
        {sequence}
      </div>
      <h2 className="text-sm text-center">{title}</h2>
    </div>
  );
};

export default CreateHeader;