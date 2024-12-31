import React from "react";

type Props = {
  title: string;
  body: string;
};

const RedBorderedBoxes = ({ title, body }: Props) => {
  return (
    <div className="p-4 bg-transparent border border-[#A41B1B] rounded-md w-fit text-center">
      <p className="text-xl mb-[21px]">{title}</p>
      <span className="inline-block text-4xl text-[#F33F3F]">
        {body}
      </span>
    </div>
  );
};

export default RedBorderedBoxes;
